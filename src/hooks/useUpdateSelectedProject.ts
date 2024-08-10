import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useProjectStore } from '@/stores/project/project.store';

export const useUpdateSelectedProject = () => {
    const pathname = usePathname();
    const setSelectedProjectByTitle = useProjectStore(state => state.setSelectedProjectByTitle);
    const projects = useProjectStore(state => state.projects);

    useEffect(() => {
        const projectName = decodeURIComponent(pathname.split('/').pop() || '').replace(/%20/g, ' ').toLowerCase();
        console.log('🔍 - Nombre del proyecto extraído del pathname:', projectName);
        if (projectName) {
            console.log('🔎 - Proyectos disponibles:', projects);
            const matchingProject = projects.find(p => p.title.toLowerCase() === projectName);
            console.log('🔎 - Proyecto coincidente encontrado:', matchingProject);
            if (matchingProject) {
                setSelectedProjectByTitle(matchingProject.title);
                console.log('✅ - Proyecto seleccionado:', matchingProject.title);
            } else {
                setSelectedProjectByTitle('');
                console.log('❌ - Ningún proyecto seleccionado');
            }
        }
    }, [pathname, setSelectedProjectByTitle, projects]);
};