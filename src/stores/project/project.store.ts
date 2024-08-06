import { create, StateCreator } from 'zustand';
import { createClient } from '@/utils/supabase/client';
import { devtools, createJSONStorage, persist } from 'zustand/middleware';
import { toast } from 'sonner';
import { ProjectData, Tarea, Actividad } from '@/interfaces/task.interface';

interface ProjectStore {
    projects: ProjectData[];
    fetchProjects: (userId: string) => Promise<void>;
    setProjects: (projects: ProjectData[]) => void;
    selectedProject: ProjectData | null;
    selectedProjectTasks: Tarea[];
    getSelectedProjectTasks: () => Tarea[];
    setSelectedProjectFromPathname: (pathname: string) => void;
    setSelectedProjectByTitle: (title: string) => void;
    addActivityToTask: (projectId: number, taskName: string, activity: Actividad) => void;
    actividades: Actividad[];
    getAllTasksWithStage: () => Tarea[];
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
                            toast.error('Error al obtener proyectos');
                        } else {
                            const projects = data.map((project: ProjectData) => ({
                                id: project.id,
                                owner: project.owner,
                                title: project.title,
                                data: project.data,
                                icon: project.icon
                            }));
                            set({ projects });
                            toast.success('Datos obtenidos de Supabase');
                        }
                    },
                    setProjects: (projects: ProjectData[]) => {
                        console.log('🚀 - setProjects called with:', projects);
                        set({ projects });
                        console.log('✅ - Projects state updated:', get().projects);
                    },
                    selectedProject: null,
                    setSelectedProjectFromPathname: (pathname: string) => {
                        const projectName = pathname.split('/').pop();
                        const projects = get().projects;
                        const matchingProject = projects.find(p => p.title.toLowerCase() === projectName?.toLowerCase());
                        if (matchingProject) {
                            set({ selectedProject: matchingProject });
                            toast.success(`Proyecto seleccionado: ${matchingProject.title}`);
                        } else {
                            set({ selectedProject: null });
                            toast.info('Ningún proyecto seleccionado');
                        }
                    },
                    selectedProjectTasks: [],
                    getSelectedProjectTasks: () => get().selectedProject?.data.fases || [],
                    setSelectedProjectByTitle: (title: string) => {
                        const projects = get().projects;
                        const matchingProject = projects.find(p => p.title.toLowerCase() === title.toLowerCase());
                        if (matchingProject) {
                            set({ selectedProject: matchingProject });
                            toast.success(`Proyecto seleccionado: ${matchingProject.title}`, {
                                id: `project-selected-${matchingProject.id}`,
                            });
                        } else {
                            set({ selectedProject: null });
                            toast.info('Ningún proyecto seleccionado', {
                                id: 'no-project-selected',
                            });
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
                })
            ) as StateCreator<ProjectStore, [], []>,
        ),
        {
            name: 'project-store',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);