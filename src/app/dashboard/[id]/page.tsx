'use client';
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconCalendarExclamation, IconCircleDashed, IconClock, IconDotsVertical, IconFileTextAi, IconFocus, IconTag, IconTrash, IconUsers, IconUsersPlus } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useProject } from '@/context/projectContext';
import { Tasks } from '@/modules/tasks';

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


export default function Home() {
    const { user } = useUser();
    const [projectData, setProjectData] = useState<ProjectData[]>([]);
    const { selectedProject, setSelectedProject } = useProject();
    const [activeMenuTab, setActiveMenuTab] = useState('General');

    const fetchData = useCallback(async () => {
        if (user == undefined) return;
        if (!selectedProject) return;
        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: selectedProject,
                owner: user.id,
            }),
            cache: 'force-cache'
        });

        const result = await response.json();

        if (result.status === 200) {
            setProjectData(result.data);
        } else {
            console.error(result.error);
        }
    }, [user, selectedProject]);

    useEffect(() => {
        if (user !== undefined) {
            fetchData();
        }
    }, [fetchData, user]);

    if (user == undefined) {
        console.log('sin usuario')
        return <div className='flex items-center justify-center w-full h-full'>
            <span className='text-lg font-medium'>Cargando usuario...</span>
        </div>
    };

    return (
        <div className='w-full h-full flex flex-row items-start justify-start'>

            {activeMenuTab == 'General' &&
                <>
                    <div className='w-full h-auto flex flex-row items-center justify-between border-b border-[#E8E6EF] px-5 py-3'>
                        <button
                            className={`px-4 py-2 ${activeMenuTab === 'General' ? 'bg-gray-200' : 'bg-white'}`}
                            onClick={() => setActiveMenuTab('General')}
                        >
                            General
                        </button>
                        <button
                            className={`px-4 py-2 ${activeMenuTab === 'General' ? 'bg-gray-200' : 'bg-white'}`}
                            onClick={() => setActiveMenuTab('Tareas' as 'General' | 'Tareas')}
                        >
                            Tareas
                        </button>
                    </div>
                    <div className='p-4'>
                        {/* <h2>General</h2> */}
                    </div>
                </>
            }

            {activeMenuTab == 'Tareas' &&
                <Tasks projectData={projectData} setActiveMenuTab={setActiveMenuTab} />
            }

        </div>
    );
};