'use client';
import Tasks from '@/modules/tasks';
import { useSidebarStore } from '@/stores/sidebar/sidebar.store';
import { Diagrama } from '@/components/diagrama';
import { useTasksStore } from '@/stores/tasks/tasks.store';
import { IconCircuitPushbutton, IconLayoutKanban } from '@tabler/icons-react';
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

                        <div className='w-full h-auto flex flex-row items-center justify-center gap-4 border border-red-600 rounded-lg'>

                            <div className='w-auto h-auto flex flex-row items-center justify-center gap-4 border border-blue-600 rounded-lg'>
                                <span>Costo Total</span>
                                <span>
                                    {selectedProject && `$${(selectedProject.data?.fases?.reduce((acc, fase) => {
                                        const tiempo = fase['Tiempo de desarrollo'];
                                        if (!tiempo) return acc;
                                        const horas = parseInt(tiempo.split(' ')[0]);
                                        return isNaN(horas) ? acc : acc + horas;
                                    }, 0) * 25).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`}
                                </span>
                            </div>

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
                            <IconCircuitPushbutton size={20} stroke={2} />
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
                <div className='w-full h-full flex flex-col items-start justify-start gap-4 rounded-xl p-6'>

                    <div className='flex flex-row items-center gap-1 text-black'>
                        <IconLayoutKanban size={20} stroke={2} />
                        <h2 className='text-xl font-bold'>Kanban</h2>
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

                    <Kanban />
                </div>
            )}

            {activeMenuTab === 'Pagos' && (
                <div>Contenido de Pagos</div>
            )}
        </div>
    );
};

export default DashboardPage;