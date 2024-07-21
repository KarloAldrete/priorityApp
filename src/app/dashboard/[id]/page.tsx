import { currentUser } from '@clerk/nextjs/server';
// import { Tasks } from '@/modules/tasks';
import React from 'react';

interface Subtarea {
    descripcion: string;
    completed: boolean;
};

interface Tarea {
    nombre: string;
    descripcion: string;
    'Tiempo de desarrollo': string;
    subtareas: Subtarea[];
};

interface ProjectData {
    id: number;
    owner: string;
    title: string;
    data: {
        tareas: Tarea[];
    };
};

async function fetchProjectData(userId: string, selectedProject: string): Promise<ProjectData[]> {
    const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: selectedProject,
            owner: userId,
        }),
        cache: 'force-cache'
    });

    const result = await response.json();

    if (result.status === 200) {
        return result.data;
    } else {
        console.error(result.error);
        return [];
    }
}

export default async function Home() {
    //     const user = await currentUser();
    //     // const { selectedProject } = useProject();

    //     if (!user || !selectedProject) {
    //         return <div>Loading...</div>;
    //     }

    //     const projectData = await fetchProjectData(user.id, selectedProject);

    //     return (
    //         <div className='w-full h-full flex flex-row items-start justify-start'>
    //             <MenuTabs projectData={projectData} />
    //         </div>
    //     );
    // }
    return <div>Dashboard</div>;
}

function MenuTabs({ projectData }: { projectData: ProjectData[] }) {
    // const [activeMenuTab, setActiveMenuTab] = React.useState('General');

    return (
        <>
            <div className='w-full h-auto flex flex-row items-center justify-between border-b border-[#E8E6EF] px-5 py-3'>
                {/* <button
                    className={`px-4 py-2 ${activeMenuTab === 'General' ? 'bg-gray-200' : 'bg-white'}`}
                    onClick={() => setActiveMenuTab('General')}
                >
                    General
                </button>
                <button
                    className={`px-4 py-2 ${activeMenuTab === 'General' ? 'bg-gray-200' : 'bg-white'}`}
                    onClick={() => setActiveMenuTab('Tareas')}
                >
                    Tareas
                </button> */}
            </div>
            {/* <div className='p-4'>
                {activeMenuTab === 'General' && <GeneralTab />}
                {activeMenuTab === 'Tareas' && <Tasks projectData={projectData} setActiveMenuTab={setActiveMenuTab} />}
            </div> */}
        </>
    );
}

function GeneralTab() {
    return (
        <div>
            {/* Contenido de la pestaña General */}
        </div>
    );
}