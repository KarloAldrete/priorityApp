import { create, StateCreator } from 'zustand';
import { createClient } from '@/utils/supabase/client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { devtools, createJSONStorage, persist } from 'zustand/middleware';
import { toast } from 'sonner';

export interface Actividad {
    tipo: 'subtarea-completada' | 'comentario';
    descripcion: string;
    fecha: Date;
}

export interface Comentario {
    usuario: string;
    mensaje: string;
    fecha: Date;
}

export interface Subtarea {
    descripcion: string;
    completed: boolean;
}

export interface Tarea {
    nombre: string;
    descripcion: string;
    'Tiempo de desarrollo': string;
    estado: string;
    subtareas: Subtarea[];
    etapa: string;
    actividades: Actividad[];
    comentarios: Comentario[];
}

export interface ProjectData {
    id: number;
    owner: string;
    title: string;
    icon?: string;
    data: {
        tareas: Tarea[];
    };
}

interface SidebarStore {
    isCollapsed: boolean;
    handleCollapse: () => void;
    handleExpand: () => void;
    projects: ProjectData[];
    fetchProjects: (userId: string) => Promise<void>;
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
    selectedProject: ProjectData | null;
    selectedProjectTasks: Tarea[];
    getSelectedProjectTasks: () => Tarea[];
    setSelectedProjectFromPathname: (pathname: string) => void;
    setSelectedProjectByTitle: (title: string) => void;
    addActivityToTask: (projectId: number, taskName: string, activity: Actividad) => void;
    actividades: Actividad[];
}

const syncWithSessionStorage = (config: StateCreator<SidebarStore>) =>
    (set: any, get: any, api: any) =>
        config(
            (...args: any[]) => {
                const result = set(...args);
                sessionStorage.setItem('sidebar-store', JSON.stringify(get()));
                return result;
            },
            get,
            api
        );

export const useSidebarStore = create<SidebarStore>()(
    persist(
        syncWithSessionStorage(
            devtools(
                (set, get) => ({
                    isCollapsed: false,
                    handleCollapse: () => {
                        set((state) => ({
                            isCollapsed: !state.isCollapsed
                        }));
                    },
                    handleExpand: () => {
                        set(() => ({
                            isCollapsed: false
                        }));
                    },
                    projects: [],
                    fetchProjects: async (userId: string) => {
                        const supabase = createClient();
                        const { data, error } = await supabase.from('projects').select('*').eq('owner', userId);
                        if (error) {
                            console.error('Error fetching projects:', error);
                            toast.error('Error al obtener proyectos');
                        } else {
                            set({ projects: data });
                            toast.success('Datos obtenidos de Supabase');
                        }
                    },
                    modalOpen: false,
                    setModalOpen: (modalOpen) => set({ modalOpen }),
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
                    getSelectedProjectTasks: () => get().selectedProject?.data.tareas || [],
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

                            const taskIndex = state.projects[projectIndex].data.tareas.findIndex(t => t.nombre === taskName);
                            if (taskIndex === -1) return state;

                            const updatedTasks = [...state.projects[projectIndex].data.tareas];
                            const task = updatedTasks[taskIndex];

                            // Asegurarse de que el array actividades esté inicializado
                            if (!task.actividades) {
                                task.actividades = [];
                            }

                            task.actividades.push(activity);

                            const updatedProjects = [...state.projects];
                            updatedProjects[projectIndex].data.tareas = updatedTasks;

                            return { projects: updatedProjects };
                        });
                    },
                    actividades: [],
                })
            ) as StateCreator<SidebarStore, [], []>,
        ),
        {
            name: 'sidebar-store',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export const useUpdateSelectedProject = () => {
    const pathname = usePathname();
    const setSelectedProjectByTitle = useSidebarStore(state => state.setSelectedProjectByTitle);
    const projects = useSidebarStore(state => state.projects);

    useEffect(() => {
        const projectTitle = pathname.split('/').pop();
        if (projectTitle) {
            const matchingProject = projects.find(p => p.title.toLowerCase() === projectTitle.toLowerCase());
            if (matchingProject) {
                setSelectedProjectByTitle(matchingProject.title);
            } else if (projectTitle === 'dashboard') {
                setSelectedProjectByTitle('Dashboard');
            } else {
                setSelectedProjectByTitle('');
                toast.info('Ningún proyecto seleccionado');
            }
        }
    }, [pathname, setSelectedProjectByTitle, projects]);
};