'use client';
import { useState } from 'react';
import { useProjectStore } from '@/store/useStore';
import Tasks from '@/modules/tasks';

const DashboardPage = () => {
    const { getSelectedProjectTasks } = useProjectStore();
    const [activeMenuTab, setActiveMenuTab] = useState('General');
    const tasks = getSelectedProjectTasks();

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
                tasks && (
                    <Tasks projectData={tasks} setActiveMenuTab={setActiveMenuTab} />
                )
            }
        </div>
    );
};

export default DashboardPage;