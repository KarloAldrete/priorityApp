import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useProjectStore } from '@/stores/project/project.store';
import { toast } from 'sonner';

export const useUpdateSelectedProject = () => {
    const pathname = usePathname();
    const setSelectedProjectByTitle = useProjectStore(state => state.setSelectedProjectByTitle);
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
    }, [pathname, setSelectedProjectByTitle, projects]);
};