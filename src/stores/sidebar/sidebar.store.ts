import { create, StateCreator } from 'zustand';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { devtools, createJSONStorage, persist } from 'zustand/middleware';
import { toast } from 'sonner';
import { ProjectData } from '@/interfaces/task.interface';
import { useProjectStore } from '@/stores/project/project.store';

const { fetchProjects, setSelectedProjectFromPathname, setProjects, setSelectedProjectByTitle } = useProjectStore.getState();

interface SidebarStore {
    isCollapsed: boolean;
    handleCollapse: () => void;
    handleExpand: () => void;
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
    projects: ProjectData[];
    setProjects: (projects: ProjectData[]) => void;
    fetchProjects: (userId: string) => Promise<void>;
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
                (set) => ({
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
                    modalOpen: false,
                    setModalOpen: (modalOpen) => set({ modalOpen }),
                    projects: [],
                    setProjects: (projects) => set({ projects }),
                    fetchProjects: async (userId: string) => {
                        await fetchProjects(userId);
                        set({ projects: useProjectStore.getState().projects });
                    },
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
    const projects = useProjectStore(state => state.projects);

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
    }, [pathname, projects]);
};