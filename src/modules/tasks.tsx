'use client';
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconCalendarExclamation, IconCheck, IconCircleDashed, IconClock, IconDotsVertical, IconFileTextAi, IconFocus, IconTag, IconTrash, IconUsers, IconUsersPlus } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { Actividad, Tarea } from '@/interfaces/task.interface';
import { useTasksStore } from '@/stores/tasks/tasks.store';
import { useProjectStore } from '@/stores/project/project.store';

const Tasks = () => {

    const [selectedTarea, setSelectedTarea] = useState<Tarea | null>(null);
    const [projectStatus, setProjectStatus] = useState('Pendiente');
    const [projectLimitDate, setProjectLimitDate] = useState('20 de Julio del 2024')

    const activeTab = useTasksStore(state => state.activeTab);
    const setActiveTab = useTasksStore(state => state.setActiveTab);
    const activeMenuTab = useTasksStore(state => state.activeMenuTab);
    const setActiveMenuTab = useTasksStore(state => state.setActiveMenuTab);
    const menuTabs = useTasksStore(state => state.menuTabs);

    const addActivityToTask = useProjectStore(state => state.addActivityToTask);

    const handleTareaClick = useCallback((tarea: Tarea) => {
        setSelectedTarea(tarea);
    }, []);

    const selectedProject = useProjectStore(state => state.selectedProject);

    const handleSubtareaToggle = (index: number) => {
        if (selectedTarea) {
            const updatedSubtareas = [...selectedTarea.tareas];
            updatedSubtareas[index].completed = !updatedSubtareas[index].completed;
            setSelectedTarea({ ...selectedTarea, tareas: updatedSubtareas });

            const activity: Actividad = {
                tipo: 'subtarea-completada',
                descripcion: `Subtarea "${updatedSubtareas[index].descripcion}" marcada como ${updatedSubtareas[index].completed ? 'completada' : 'incompleta'}`,
                fecha: new Date(),
            };

            if (selectedProject) {
                addActivityToTask(selectedProject.id, selectedTarea.nombre, activity);
            }
        }
    };

    const completedSubtareas = selectedTarea?.tareas?.filter(subtarea => subtarea.completed).length || 0;
    const totalSubtareas = selectedTarea?.tareas?.length || 0;

    useEffect(() => {
        if (selectedProject) {
            setSelectedTarea(selectedProject.data.fases[0] || null);
        }
    }, [selectedProject]);

    function nextTask() {
        const currentIndex = selectedProject?.data.fases.findIndex(tarea => tarea === selectedTarea) || 0;
        const nextIndex = (currentIndex + 1) % (selectedProject?.data.fases.length || 0) || 0;
        setSelectedTarea(selectedProject?.data.fases[nextIndex] || null);
    }

    function previousTask() {
        const currentIndex = selectedProject?.data.fases.findIndex(tarea => tarea === selectedTarea) || 0;
        const previousIndex = (currentIndex - 1 + (selectedProject?.data.fases.length || 0)) % (selectedProject?.data.fases.length || 0);
        setSelectedTarea(selectedProject?.data.fases[previousIndex] || null);
    }

    const getRelativeTime = (date: Date) => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

        if (diffInSeconds < 60) {
            return rtf.format(-diffInSeconds, 'second');
        } else if (diffInSeconds < 3600) {
            return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
        } else if (diffInSeconds < 86400) {
            return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
        } else {
            return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
        }
    };

    return (
        <>
            <div className='w-full h-full flex flex-col items-start justify-start gap-4 rounded-xl'>

                <div className='w-auto h-auto flex flex-col items-start justify-start gap-4 rounded-xl px-6 pt-6 pb-1'>

                    <div className='flex flex-row items-center gap-1 text-black'>
                        <IconFileTextAi size={20} stroke={2} />
                        <h2 className='text-xl font-bold'>Fases recomendadas</h2>
                    </div>

                    <div className='w-full h-auto flex flex-row items-center justify-between'>

                        <div className='max-h-9 bg-[#F1F5F9] p-1 rounded-lg flex items-center'>
                            {menuTabs.map((tab) => (
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

                </div>

                <div className='w-full h-full flex flex-col items-start justify-start gap-4 px-6 overflow-y-auto'>

                    {selectedProject && selectedProject.data.fases.map((tarea, index) => (
                        <div
                            key={index}
                            className={`w-full h-auto px-3 py-2.5 border border-[#C4CBD4] text-[#64748B] rounded-md flex flex-col gap-2 ${selectedTarea === tarea ? 'bg-[#F1F5F9] cursor-default' : 'cursor-pointer hover:bg-[#F1F5F9]'}`}
                            onClick={() => handleTareaClick(tarea)}
                        >
                            <div className='w-full h-auto flex flex-row items-center justify-between'>
                                <h3 className='font-medium text-sm leading-5 text-[#09090B]'>{tarea.nombre}</h3>
                                <div className='w-auto h-auto flex flex-row items-center justify-end gap-1'>
                                    <IconClock size={16} stroke={2} />
                                    <span className='text-sm leading-5 font-medium'>{tarea['Tiempo de desarrollo']}</span>
                                </div>
                            </div>
                            <p className='text-sm leading-5 font-normal'>{tarea.descripcion}</p>
                        </div>
                    ))}

                </div>

            </div>

            <div className='w-1/3 h-full flex flex-col items-start justify-start rounded-r-xl border-l border-[#C4CBD4]'>

                <div className='w-full h-auto flex flex-row items-center justify-between gap-1 border-b border-[#C4CBD4] px-4 py-3'>
                    <div className='w-auto h-auto flex flex-row items-center justify-end gap-6'>
                        <div className='w-auto h-auto p-1 flex items-center justify-center cursor-pointer hover:text-black' onClick={previousTask}>
                            <IconArrowNarrowLeft size={20} stroke={2} />
                        </div>
                        <div className='w-auto h-auto p-1 flex items-center justify-center cursor-pointer hover:text-black' onClick={nextTask}>
                            <IconArrowNarrowRight size={20} stroke={2} />
                        </div>
                    </div>
                    <div className='w-auto h-auto flex flex-row items-center justify-end gap-6'>
                        <div className='w-auto h-auto p-1 flex items-center justify-center'>
                            <IconTrash size={20} />
                        </div>
                        <div className='w-[1px] h-[28px] border-l border-[#C4CBD4]' />
                        <div className='w-auto h-auto p-1 flex items-center justify-center'>
                            <IconDotsVertical size={20} />
                        </div>
                    </div>
                </div>

                {selectedTarea && (

                    <div className='w-full h-full flex flex-col items-start justify-start cursor-default'>

                        <div className='w-full h-auto p-4 flex flex-col items-start justify-start gap-4 border-b border-[#C4CBD4]'>

                            <div className='w-auto h-auto flex flex-row items-center justify-start gap-1'>
                                <div className='w-[120px] h-auto flex flex-row items-center justify-start gap-1'>
                                    <IconFocus size={18} color='#64748B' stroke={2} />
                                    <span className='text-sm leading-5 text-[#64748B] font-medium'>Estado</span>
                                </div>
                                <div className='w-auto h-auto flex flex-row items-center justify-start gap-1'>
                                    <IconCircleDashed size={18} color='#7174FE' />
                                    <span className='text-sm leading-5 font-medium text-black'>{projectStatus}</span>
                                </div>
                            </div>

                            <div className='w-auto h-auto flex flex-row items-center justify-start gap-1'>
                                <div className='w-[120px] h-auto flex flex-row items-center justify-start gap-1'>
                                    <IconCalendarExclamation size={18} color='#64748B' stroke={2} />
                                    <span className='text-sm leading-5 text-[#64748B] font-medium'>Fecha Limite</span>
                                </div>
                                <span className='text-sm leading-5 font-medium text-black'>{projectLimitDate}</span>
                            </div>

                            <div className='w-auto h-auto flex flex-row items-center justify-start gap-1'>
                                <div className='w-[120px] h-auto flex flex-row items-center justify-start gap-1'>
                                    <IconUsers size={18} color='#64748B' stroke={2} />
                                    <span className='text-sm leading-5 text-[#64748B] font-medium'>Encargado</span>
                                </div>
                                <div className='w-auto h-auto flex flex-row items-center justify-center gap-1 rounded bg-black px-2.5 py-[2px]'>
                                    <IconUsersPlus size={12} color='#FFFFFF' stroke={3} />
                                    <span className='text-xs leading-4 text-[#FFFFFF] font-medium'>Asignar</span>
                                </div>
                            </div>

                            <div className='w-auto h-auto flex flex-row items-center justify-start gap-1'>
                                <div className='w-[120px] h-auto flex flex-row items-center justify-start gap-1'>
                                    <IconTag size={18} color='#64748B' stroke={2} />
                                    <span className='text-sm leading-5 text-[#64748B] font-medium'>Etapa</span>
                                </div>
                                <div className='w-auto h-auto flex flex-row items-center justify-center gap-1 rounded bg-black px-2.5 py-[2px]'>
                                    <span className='text-xs leading-4 text-[#FFFFFF] font-medium'>{selectedTarea.etapa}</span>
                                </div>
                            </div>

                            <div className='w-auto h-auto flex flex-row items-center justify-start gap-1'>
                                <div className='w-[120px] h-auto flex flex-row items-center justify-start gap-1'>
                                    <IconClock size={18} color='#64748B' stroke={2} />
                                    <span className='text-sm leading-5 text-[#64748B] font-medium'>Duración</span>
                                </div>
                                <div className='w-auto h-auto flex flex-row items-center justify-center gap-1 rounded bg-black px-2.5 py-[2px]'>
                                    <span className='text-xs leading-4 text-[#FFFFFF] font-medium'>{selectedTarea['Tiempo de desarrollo']}</span>
                                </div>
                            </div>

                        </div>

                        <div className='w-full h-auto p-4 flex flex-col items-start justify-start gap-2 border-b '>
                            <span className='text-lg font-semibold text-black'>{selectedTarea.nombre}</span>
                            <span className='text-sm leading-5 font-normal'>{selectedTarea.descripcion}</span>
                        </div>

                        <div className='w-full h-full p-4 flex flex-col items-start justify-start gap-5 overflow-y-auto mb-12'>

                            <div className='w-full flex flex-row items-center justify-between'>

                                <div className='flex flex-row gap-4'>
                                    <button className={`text-sm font-medium ${activeTab === 'tareas' ? 'text-black' : 'text-[#64748B]'}`} onClick={() => setActiveTab('tareas')}>Tareas</button>
                                    <button className={`text-sm font-medium ${activeTab === 'comentarios' ? 'text-black' : 'text-[#64748B]'}`} onClick={() => setActiveTab('comentarios')}>Comentarios</button>
                                    <button className={`text-sm font-medium ${activeTab === 'actividades' ? 'text-black' : 'text-[#64748B]'}`} onClick={() => setActiveTab('actividades')}>Actividades</button>
                                </div>

                                {activeTab === 'tareas' && (
                                    <div className='w-8 h-8 flex flex-col items-center justify-center relative'>
                                        <svg className='w-full h-full' viewBox='0 0 36 36'>
                                            <path
                                                className='text-[#F1F5F9]'
                                                strokeDasharray='100, 100'
                                                d='M18 2.0845
                                                a 15.9155 15.9155 0 0 1 0 31.831
                                                a 15.9155 15.9155 0 0 1 0 -31.831'
                                                stroke='currentColor'
                                                strokeWidth='4'
                                                fill='none'
                                                strokeLinecap='round'
                                            />
                                            {completedSubtareas > 0 && (
                                                <path
                                                    className='text-[#7174FE]'
                                                    strokeDasharray={`${(completedSubtareas / totalSubtareas) * 100}, 100`}
                                                    d='M18 2.0845
                                                    a 15.9155 15.9155 0 0 1 0 31.831
                                                    a 15.9155 15.9155 0 0 1 0 -31.831'
                                                    stroke='currentColor'
                                                    strokeWidth='4'
                                                    fill='none'
                                                    strokeLinecap='round'
                                                />
                                            )}
                                        </svg>
                                        <span className='absolute text-[10px] leading-[10px] font-bold text-[#020617]'>{completedSubtareas}/{totalSubtareas}</span>
                                    </div>
                                )}
                            </div>

                            {activeTab === 'tareas' && (
                                <div className='w-full h-full overflow-y-auto flex flex-col items-start justify-start gap-3 mb-3'>
                                    {selectedTarea.tareas?.length > 0 ? (
                                        selectedTarea.tareas.map((subtarea, index) => (
                                            <div key={index} className='w-full h-auto flex flex-row items-center justify-between gap-2 px-3 py-2.5 border border-[#E4E4E7] rounded-md'>
                                                <div className='flex items-center'>
                                                    <div className='relative flex items-center justify-center'>
                                                        <input
                                                            type='checkbox'
                                                            checked={subtarea.completed || false}
                                                            onChange={() => {
                                                                handleSubtareaToggle(index);
                                                                addActivityToTask(selectedProject?.id || 0, selectedTarea?.nombre || '', {
                                                                    tipo: 'subtarea-completada',
                                                                    descripcion: `Subtarea "${subtarea.descripcion}" marcada como ${subtarea.completed ? 'completada' : 'incompleta'}`,
                                                                    fecha: new Date(),
                                                                });
                                                            }}
                                                            className='appearance-none w-4 h-4 border-2 cursor-pointer border-gray-300 rounded bg-white checked:bg-[#7174FE] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-white'
                                                        />
                                                        <IconCheck
                                                            className={`absolute w-3 h-3 text-white pointer-events-none ${subtarea.completed ? 'block' : 'hidden'}`}
                                                            stroke={3}
                                                        />
                                                    </div>
                                                    <h3 className={`font-medium text-sm leading-5 ml-2 ${subtarea.completed ? 'text-gray-500 line-through' : 'text-[#09090B]'}`}>
                                                        {subtarea.descripcion}
                                                    </h3>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No hay subtareas para esto</p>
                                    )}
                                </div>
                            )}

                            {activeTab === 'comentarios' && (
                                <div className='w-full'>
                                    <p>Comentarios</p>
                                </div>
                            )}

                            {activeTab === 'actividades' && (
                                <div className='w-full'>
                                    {selectedTarea?.actividades?.length > 0 ? (
                                        selectedTarea.actividades.map((activity, index) => (
                                            <div key={index} className='w-full h-auto flex flex-row items-start justify-start gap-2'>
                                                <div className='w-auto h-auto flex flex-col items-center justify-center'>
                                                    <span className='text-xs leading-4 font-medium text-[#64748B]'>{getRelativeTime(new Date(activity.fecha))}</span>
                                                </div>
                                                <div className='w-full h-auto flex flex-col items-start justify-start'>
                                                    <span className='text-sm leading-5 font-medium text-black'>{activity.descripcion}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <span>No hay tareas</span>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default Tasks;