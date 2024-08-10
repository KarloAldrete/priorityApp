'use client';
import { inter } from "@/components/fonts/fonts";
import Sidebar from "@/components/main/fakeSidebar";
import { ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { useFakeStore } from '@/stores/main/fake.store';
import { IconBriefcase2Filled, IconCircuitPushbutton, IconClockFilled, IconCoinFilled, IconLayoutKanban } from '@tabler/icons-react';
import Kanban from '@/components/main/fakeKanban';
import Tasks from '@/components/main/fakeTasks';
import { TaskStatus, TaskChart } from '../coderlabs/taskStatus';
import { Diagrama } from '../diagrama';

export default function Dashboard() {
    const { activeMenuTab, setActiveMenuTab } = useFakeStore(state => state);
    const tasks = useFakeStore(state => state.tasks);
    const selectedProject = useFakeStore(state => state.selectedProject);
    const tabs = useFakeStore(state => state.menuTabs);

    return (
        <div className={`w-full h-full flex flex-col items-center justify-start ${inter.className} pb-8`}>

            <ResizablePanelGroup direction="horizontal" className='rounded-xl w-full h-auto max-w-[1200px]'>

                <Sidebar />

                <ResizablePanel defaultSize={85} className='w-full h-[700px] flex flex-col items-center justify-center bg-white rounded-xl ml-4 border border-[#E8E6EF]'>
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

                                    <div className='w-full h-auto flex flex-row items-center justify-center gap-4 rounded-lg'>

                                        <div className='w-full h-auto flex flex-row items-center justify-start gap-3 pl-3 pr-5 py-4  border border-[#E2E8F0] rounded-lg'>

                                            <IconCoinFilled size={32} stroke={2} color='#34A97F' />

                                            <div className='w-auto h-auto flex flex-col items-start justify-start gap-1'>

                                                <span className='text-sm font-medium text-black'>Costo Total</span>

                                                <span className='text-2xl leading-6 font-bold text-black'>
                                                    {selectedProject && `$${(selectedProject.data?.fases?.reduce((acc, fase) => {
                                                        const tiempo = fase['Tiempo de desarrollo'];
                                                        if (!tiempo) return acc;
                                                        const horas = parseInt(tiempo.split(' ')[0]);
                                                        return isNaN(horas) ? acc : acc + horas;
                                                    }, 0) * 25).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USD`}
                                                </span>

                                            </div>

                                        </div>

                                        <div className='w-full h-auto flex flex-row items-center justify-start gap-3 pl-3 pr-5 py-4  border border-[#E2E8F0] rounded-lg'>

                                            <IconBriefcase2Filled size={32} stroke={2} color='#7174FE' />

                                            <div className='w-auto h-auto flex flex-col items-start justify-start gap-1'>

                                                <span className='text-sm font-medium text-black'>Total de Horas de Trabajo</span>

                                                <span className='text-2xl leading-6 font-bold text-black'>
                                                    {selectedProject && `${selectedProject.data?.fases?.reduce((acc, fase) => {
                                                        const tiempo = fase['Tiempo de desarrollo'];
                                                        if (!tiempo) return acc;
                                                        const horas = parseInt(tiempo.split(' ')[0]);
                                                        return isNaN(horas) ? acc : acc + horas;
                                                    }, 0)} horas`}
                                                </span>

                                            </div>

                                        </div>

                                        <div className='w-full h-auto flex flex-row items-center justify-start gap-3 pl-3 pr-5 py-4  border border-[#E2E8F0] rounded-lg'>

                                            <IconClockFilled size={32} stroke={2} color='#E76E50' />

                                            <div className='w-auto h-auto flex flex-col items-start justify-start gap-1'>

                                                <span className='text-sm font-medium text-black'>Total de Días Laborales</span>

                                                <span className='text-2xl leading-6 font-bold text-black'>
                                                    {selectedProject && `${Math.ceil(selectedProject.data?.fases?.reduce((acc, fase) => {
                                                        const tiempo = fase['Tiempo de desarrollo'];
                                                        if (!tiempo) return acc;
                                                        const horas = parseInt(tiempo.split(' ')[0]);
                                                        return isNaN(horas) ? acc : acc + horas;
                                                    }, 0) / 8)} días`}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    <div className='w-full h-auto flex flex-row items-start justify-start gap-4'>

                                        <div className='border border-[#E2E8F0] rounded-lg w-full h-full flex flex-col items-start justify-start gap-4 p-5'>

                                            <div className='w-full h-auto flex flex-col items-start justify-start gap-1'>

                                                <span className='text-xl leading-6 font-bold text-black'>Estatus de las Tareas</span>

                                                <span className='text-sm text-[#64748B]'>Información general sobre las tareas del proyecto</span>

                                            </div>

                                            <div className='w-full h-auto flex flex-col items-center justify-start gap-4'>

                                                <TaskStatus tasks={tasks} />

                                            </div>

                                        </div>

                                        <div className='border border-[#E2E8F0] rounded-lg w-auto h-full flex flex-row items-start justify-start gap-4 p-5'>

                                            <TaskChart tasks={tasks} />

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
                                <div className='w-full h-full min-h-[70dvh] flex flex-col items-start justify-start gap-4 rounded-xl p-6'>

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
                </ResizablePanel>

            </ResizablePanelGroup>

        </div>
    )
}