'use client';
import Tasks from '@/modules/tasks';
import { useSidebarStore } from '@/stores/sidebar/sidebar.store';
import { Diagrama } from '@/components/diagrama';
import { useTasksStore } from '@/stores/tasks/tasks.store';
import { IconCalendar, IconFileTextAi } from '@tabler/icons-react';
import { Kanban } from '@/modules/kanban';

const DashboardPage = () => {
    const getSelectedProjectTasks = useSidebarStore(state => state.getSelectedProjectTasks);
    const selectedProject = useSidebarStore(state => state.selectedProject);
    const { activeMenuTab, setActiveMenuTab } = useTasksStore(state => state);
    const tasks = getSelectedProjectTasks();

    const tabs = useTasksStore(state => state.menuTabs);

    return (
        <div className='w-full h-full flex flex-row items-start justify-start'>
            {activeMenuTab == 'General' &&
                <>
                    <div className='w-full h-full flex flex-col items-start justify-start gap-4 rounded-xl p-6'>

                        <div className='flex flex-row items-center gap-1 text-black'>
                            <span>{selectedProject?.icon}</span>
                            <h2 className='text-xl font-bold'>{selectedProject?.title}</h2>
                        </div>

                        <div className='max-h-9 bg-[#F1F5F9] p-1 rounded-lg flex items-center'>
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    className={`px-3 py-1 text-sm font-medium hover:text-black ${activeMenuTab === tab
                                        ? 'bg-white text-black rounded-md shadow-sm'
                                        : 'text-[#64748B]'
                                        }`}
                                    onClick={() => setActiveMenuTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                    </div>
                </>
            }

            {activeMenuTab === 'Fases' && tasks && (
                <Tasks />
            )}

            {activeMenuTab === 'Diagrama' && selectedProject && (
                <>
                    <div className='w-full h-full flex flex-col items-start justify-start gap-4 rounded-xl p-6'>

                        <div className='flex flex-row items-center gap-1 text-black'>
                            <IconCalendar size={20} stroke={2} />
                            <h2 className='text-xl font-bold'>Diagrama de Gantt</h2>
                        </div>

                        <div className='max-h-9 bg-[#F1F5F9] p-1 rounded-lg flex items-center'>
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    className={`px-3 py-1 text-sm font-medium hover:text-black ${activeMenuTab === tab
                                        ? 'bg-white text-black rounded-md shadow-sm'
                                        : 'text-[#64748B]'
                                        }`}
                                    onClick={() => setActiveMenuTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <Diagrama projectData={selectedProject} />

                    </div>
                </>
            )}

            {activeMenuTab === 'Kanban' && (
                <Kanban />
            )}

            {activeMenuTab === 'Pagos' && (
                <div>Contenido de Pagos</div>
            )}
        </div>
    );
};

export default DashboardPage;