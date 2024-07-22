import create from 'zustand';

interface Subtarea {
    descripcion: string;
    completed: boolean;
}

interface Tarea {
    nombre: string;
    descripcion: string;
    'Tiempo de desarrollo': string;
    subtareas: Subtarea[];
}

interface ProjectData {
    id: number;
    owner: string;
    title: string;
    icon?: string;
    data: {
        tareas: Tarea[];
    };
}

interface ProjectStore {
    projects: ProjectData[];
    selectedProject: ProjectData | null;
    setProjects: (projects: ProjectData[]) => void;
    selectProject: (project: ProjectData) => void;
    getSelectedProjectTasks: () => Tarea[] | null;
    isSidebarCollapsed: boolean;
    setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
    projects: [],
    selectedProject: null,
    setProjects: (projects) => set({ projects }),
    selectProject: (project) => set({ selectedProject: project }),
    getSelectedProjectTasks: () => {
        const selectedProject = get().selectedProject;
        return selectedProject ? selectedProject.data.tareas : null;
    },
    isSidebarCollapsed: true,
    setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
}));