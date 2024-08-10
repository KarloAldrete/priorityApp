import { create, StateCreator } from 'zustand';
import { createClient } from '@/utils/supabase/client';
import { devtools, createJSONStorage, persist } from 'zustand/middleware';
import { ProjectData, Tarea, Actividad } from '@/interfaces/task.interface';
type ColumnId = 'pending' | 'inProgress' | 'inReview' | 'completed';

interface ProjectStore {
    projects: ProjectData[];
    fetchProjects: (userId: string) => Promise<void>;
    setProjects: (projects: ProjectData[]) => void;
    selectedProject: ProjectData | null;
    selectedProjectTasks: Tarea[];
    getSelectedProjectTasks: () => Tarea[];
    setSelectedProjectByTitle: (title: string) => void;
    addActivityToTask: (projectId: number, taskName: string, activity: Actividad) => void;
    actividades: Actividad[];
    getAllTasksWithStage: () => Tarea[];
    setTaskState: (taskId: string, newState: string) => void;
    columns: Record<ColumnId, { title: string; tasks: Tarea[] }>;
    setColumns: (columns: Record<ColumnId, { title: string; tasks: Tarea[] }>) => void;
    updateProjectTaskState: (taskName: string, taskDescription: string, newState: string) => void;
}

const syncWithSessionStorage = (config: StateCreator<ProjectStore>) =>
    (set: any, get: any, api: any) =>
        config(
            (...args: any[]) => {
                const result = set(...args);
                sessionStorage.setItem('project-store', JSON.stringify(get()));
                return result;
            },
            get,
            api
        );

export const useProjectStore = create<ProjectStore>()(
    persist(
        syncWithSessionStorage(
            devtools(
                (set, get) => ({
                    projects: [],
                    fetchProjects: async (userId: string) => {
                        const supabase = createClient();
                        const { data, error } = await supabase.from('projects').select('*').eq('owner', userId);
                        if (error) {
                            console.error('Error fetching projects:', error);
                        } else {
                            const projects = data.map((project: ProjectData) => ({
                                id: project.id,
                                owner: project.owner,
                                title: project.title,
                                data: project.data,
                                icon: project.icon
                            }));
                            set({ projects });
                        }
                    },
                    setProjects: (projects: ProjectData[]) => {
                        console.log('🚀 - setProjects called with:', projects);
                        set({ projects });
                        console.log('✅ - Projects state updated:', get().projects);
                    },
                    selectedProject: null,
                    selectedProjectTasks: [],
                    getSelectedProjectTasks: () => get().selectedProject?.data.fases || [],
                    setSelectedProjectByTitle: (title: string) => {
                        console.log('🔍 - Título recibido:', title);
                        const projects = get().projects;
                        console.log('📂 - Proyectos actuales:', projects);
                        const formattedTitle = title.replace(/\s+/g, '-').toLowerCase();
                        console.log('🔤 - Título formateado:', formattedTitle);
                        const matchingProject = projects.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === formattedTitle);
                        console.log('🔎 - Proyecto coincidente:', matchingProject);
                        if (matchingProject) {
                            set({ selectedProject: matchingProject });
                            console.log('✅ - Proyecto seleccionado:', matchingProject);
                        } else {
                            set({ selectedProject: null });
                            console.log('❌ - Ningún proyecto seleccionado');
                        }
                    },
                    addActivityToTask: (projectId, taskName, activity) => {
                        set((state) => {
                            const projectIndex = state.projects.findIndex(p => p.id === projectId);
                            if (projectIndex === -1) return state;

                            const taskIndex = state.projects[projectIndex].data.fases.findIndex((t: any) => t.nombre === taskName);
                            if (taskIndex === -1) return state;

                            const updatedTasks = [...state.projects[projectIndex].data.fases];
                            const task = updatedTasks[taskIndex];

                            if (!task.actividades) {
                                task.actividades = [];
                            }

                            task.actividades.push(activity);

                            const updatedProjects = [...state.projects];
                            updatedProjects[projectIndex].data.fases = updatedTasks;

                            return { projects: updatedProjects };
                        });
                    },
                    actividades: [],
                    getAllTasksWithStage: () => {
                        const selectedProject = get().selectedProject;
                        if (!selectedProject) return [];
                        return selectedProject.data.fases.flatMap((fase: any) =>
                            fase.tareas.map((tarea: any) => ({
                                ...tarea,
                                etapa: fase.etapa,
                                'Tiempo de desarrollo': tarea['Tiempo de desarrollo'] || '',
                                actividades: tarea.actividades || [],
                                comentarios: tarea.comentarios || [],
                                tareas: tarea.tareas || []
                            }))
                        );
                    },
                    setTaskState: (taskId: string, newState: string) => {
                        set((state) => {
                            const updatedProjects = state.projects.map(project => {
                                const updatedFases = project.data.fases.map(fase => {
                                    const updatedTareas = fase.tareas.map(tarea => {
                                        if (tarea.id === taskId) {
                                            return { ...tarea, estado: newState };
                                        }
                                        return tarea;
                                    });
                                    return { ...fase, tareas: updatedTareas };
                                });
                                return { ...project, data: { ...project.data, fases: updatedFases } };
                            });
                            return { projects: updatedProjects };
                        });
                    },
                    columns: {
                        pending: { title: 'Pendiente', tasks: [] },
                        inProgress: { title: 'En Progreso', tasks: [] },
                        inReview: { title: 'En Revisión', tasks: [] },
                        completed: { title: 'Completado', tasks: [] }
                    },
                    setColumns: (columns) => set({ columns }),
                    updateProjectTaskState: (taskName, taskDescription, newState) => {
                        set((state) => {
                            state.projects.forEach(project => {
                                project.data.fases.forEach(fase => {
                                    fase.tareas.forEach(tarea => {
                                        if (tarea.nombre === taskName && tarea.descripcion === taskDescription) {
                                            tarea.estado = newState;
                                        }
                                    });
                                });
                            });
                            return { projects: [...state.projects] };
                        });
                    }
                }),
            ) as StateCreator<ProjectStore, [], []>,
        ),
        {
            name: 'project-store',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);