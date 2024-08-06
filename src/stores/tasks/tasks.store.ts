import { create } from "zustand";
import { Tarea } from "@/interfaces/task.interface";

interface TasksStore {
    tasks: Tarea[];
    setTasks: (tasks: Tarea[]) => void;
    selectedTask: Tarea | null;
    setSelectedTask: (task: Tarea | null) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    activeMenuTab: string;
    setActiveMenuTab: (tab: string) => void;
    menuTabs: string[];
    setMenuTabs: (tabs: string[]) => void;
}

export const useTasksStore = create<TasksStore>((set) => ({
    tasks: [],
    setTasks: (tasks: Tarea[]) => set({ tasks }),
    selectedTask: null,
    setSelectedTask: (task: Tarea | null) => set({ selectedTask: task }),
    activeTab: 'tareas',
    setActiveTab: (tab: string) => set({ activeTab: tab }),
    activeMenuTab: 'General',
    setActiveMenuTab: (tab: string) => set({ activeMenuTab: tab }),
    menuTabs: ['General', 'Fases', 'Diagrama', 'Kanban', 'Pagos'],
    setMenuTabs: (tabs: string[]) => set({ menuTabs: tabs }),
}));