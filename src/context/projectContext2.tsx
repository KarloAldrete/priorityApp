'use client';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ProjectContextType {
    selectedProject: string | null;
    setSelectedProject: (project: string) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        console.log(`Selected project: ${selectedProject}`);
    }, [selectedProject]);

    useEffect(() => {
        const path = pathname.split('/')[2] || '/';
        setSelectedProject(path);
    }, [pathname])

    return (
        <ProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProject must be used within a ProjectProvider');
    }
    return context;
};