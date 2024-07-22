'use client';
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconCalendarExclamation, IconCircleDashed, IconClock, IconDotsVertical, IconFileTextAi, IconFocus, IconTag, IconTrash, IconUsers, IconUsersPlus } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { useProjectStore } from '@/store/useStore';

interface Subtarea {
    descripcion: string;
    completed: boolean;
}

interface Tarea {
    nombre: string;
    descripcion: string;
    'Tiempo de desarrollo': string;
    subtareas: Subtarea[];
}

interface ProjectData {
    id: number;
    owner: string;
    title: string;
    icon?: string;
    data: {
        tareas: Tarea[];
    };
}

interface TasksProps {
    projectData: Tarea[];
    setActiveMenuTab: (tab: string) => void;
}

const Tasks: React.FC<TasksProps> = ({ projectData, setActiveMenuTab }) => {
    const { selectedProject } = useProjectStore();
    const [selectedTarea, setSelectedTarea] = useState<Tarea | null>(null);
    const [projectStatus, setProjectStatus] = useState('Pendiente');
    const [projectLimitDate, setProjectLimitDate] = useState('20 de Julio del 2024');
    const [projectPriority, setProjectPriority] = useState('Urgente');
    const [activeTab, setActiveTab] = useState('subtareas');

    const handleTareaClick = useCallback((tarea: Tarea) => {
        setSelectedTarea(tarea);
    }, []);

    const handleSubtareaToggle = (index: number) => {
        if (selectedTarea) {
            const updatedSubtareas = [...selectedTarea.subtareas];
            updatedSubtareas[index].completed = !updatedSubtareas[index].completed;
            setSelectedTarea({ ...selectedTarea, subtareas: updatedSubtareas });
        }
    };

    const handleTabChange = () => {
        setActiveMenuTab('General');
    };

    const completedSubtareas = selectedTarea?.subtareas?.filter(subtarea => subtarea.completed).length || 0;
    const totalSubtareas = selectedTarea?.subtareas?.length || 0;

    useEffect(() => {
        if (selectedProject) {
            setSelectedTarea(selectedProject.data.tareas[0] || null);
        }
    }, [selectedProject]);

    return (
        <>
            <div className='w-2/3 rounded-ss-xl h-auto flex flex-col items-start justify-start gap-5'>
                <div className='w-full h-auto flex flex-row items-center justify-between border-b border-[#E8E6EF] px-5 py-3'>
                    <div className='flex flex-row items-center gap-1'>
                        <IconFileTextAi size={20} stroke={2} />
                        <h2 className='text-xl font-semibold'>Tareas sugeridas</h2>
                    </div>
                    <button className='bg-black w-auto h-auto flex items-center justify-center px-3 py-1 rounded-md text-sm leading-5 text-white font-medium' onClick={handleTabChange}>Regresar</button>
                </div>

                <div className='w-full h-full flex flex-col items-start justify-start gap-4 px-5'>

                    {selectedProject && selectedProject.data.tareas.map((tarea, index) => (
                        <div
                            key={index}
                            className={`w-full h-auto px-3 py-2.5 border border-[#E4E4E7] rounded-md flex flex-col gap-2 ${selectedTarea === tarea ? 'bg-[#F4F4F5] cursor-default' : 'cursor-pointer hover:bg-[#F4F4F5]'}`}
                            onClick={() => handleTareaClick(tarea)}
                        >
                            <div className='w-full h-auto flex flex-row items-center justify-between'>
                                <h3 className='font-medium text-sm leading-5 text-[#09090B]'>{tarea.nombre}</h3>
                                <div className='w-auto h-auto flex flex-row items-center justify-end gap-1'>
                                    <IconClock size={16} stroke={2} color='#71717A' />
                                    <span className='text-sm text-[#71717A] leading-5 font-medium'>{tarea['Tiempo de desarrollo']}</span>
                                </div>
                            </div>
                            <p className='text-sm text-[#71717A] leading-5 font-normal'>{tarea.descripcion}</p>
                        </div>
                    ))}

                </div>
            </div>

            <div className='w-1/3 h-full flex flex-col items-start justify-start rounded-r-xl border-l border-[#E8E6EF]'>
                <div className='w-full h-auto flex flex-row items-center justify-between gap-1 border-b border-[#E8E6EF] px-4 py-3'>
                    <div className='w-auto h-auto flex flex-row items-center justify-end gap-6'>
                        <div className='w-auto h-auto p-1 flex items-center justify-center'>
                            <IconArrowNarrowLeft size={20} stroke={2} />
                        </div>
                        <div className='w-auto h-auto p-1 flex items-center justify-center'>
                            <IconArrowNarrowRight size={20} stroke={2} />
                        </div>
                    </div>
                    <div className='w-auto h-auto flex flex-row items-center justify-end gap-6'>
                        <div className='w-auto h-auto p-1 flex items-center justify-center'>
                            <IconTrash size={20} />
                        </div>
                        <div className='w-[1px] h-[28px] border-l border-[#E8E6EF]' />
                        <div className='w-auto h-auto p-1 flex items-center justify-center'>
                            <IconDotsVertical size={20} />
                        </div>
                    </div>
                </div>

                {selectedTarea && (
                    <div className='w-full h-full flex flex-col items-start justify-start'>
                        <div className='w-full h-auto p-4 flex flex-col items-start justify-start gap-4 border-b border-[#E8E6EF]'>
                            <div className='w-auto h-auto flex flex-row items-center justify-start gap-1'>
                                <div className='w-[120px] h-auto flex flex-row items-center justify-start gap-1'>
                                    <IconFocus size={18} color='#71717A' stroke={2} />
                                    <span className='text-sm leading-5 text-[#71717A] font-medium'>Estado</span>
                                </div>
                                <div className='w-auto h-auto flex flex-row items-center justify-start gap-1'>
                                    <IconCircleDashed size={18} color='#7174FE' />
                                    <span className='text-sm leading-5 font-medium text-black'>{projectStatus}</span>
                                </div>
                            </div>
                            <div className='w-auto h-auto flex flex-row items-center justify-start gap-1'>
                                <div className='w-[120px] h-auto flex flex-row items-center justify-start gap-1'>
                                    <IconCalendarExclamation size={18} color='#71717A' stroke={2} />
                                    <span className='text-sm leading-5 text-[#71717A] font-medium'>Fecha Limite</span>
                                </div>
                                <span className='text-sm leading-5 font-medium text-black'>{projectLimitDate}</span>
                            </div>
                            <div className='w-auto h-auto flex flex-row items-center justify-start gap-1'>
                                <div className='w-[120px] h-auto flex flex-row items-center justify-start gap-1'>
                                    <IconUsers size={18} color='#71717A' stroke={2} />
                                    <span className='text-sm leading-5 text-[#71717A] font-medium'>Encargado</span>
                                </div>
                                <div className='w-auto h-auto flex flex-row items-center justify-center gap-1 rounded bg-black px-2.5 py-[2px]'>
                                    <IconUsersPlus size={12} color='#FFFFFF' stroke={3} />
                                    <span className='text-xs leading-4 text-[#FFFFFF] font-medium'>Asignar</span>
                                </div>
                            </div>
                            <div className='w-auto h-auto flex flex-row items-center justify-start gap-1'>
                                <div className='w-[120px] h-auto flex flex-row items-center justify-start gap-1'>
                                    <IconTag size={18} color='#71717A' stroke={2} />
                                    <span className='text-sm leading-5 text-[#71717A] font-medium'>Prioridad</span>
                                </div>
                                <div className='w-auto h-auto flex flex-row items-center justify-center gap-1 rounded bg-black px-2.5 py-[2px]'>
                                    <span className='text-xs leading-4 text-[#FFFFFF] font-medium'>{projectPriority}</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-full p-4 flex flex-col items-start justify-start gap-2 border-b border-[#E8E6EF]'>
                            <span className='text-lg font-semibold text-black'>{selectedTarea.nombre}</span>
                            <span className='text-sm leading-5 font-normal'>{selectedTarea.descripcion}</span>
                        </div>
                        <div className='w-full h-auto p-4 flex flex-col items-start justify-start gap-5'>
                            <div className='w-full flex flex-row items-center justify-between'>
                                <div className='flex flex-row gap-4'>
                                    <button className={`text-sm font-medium ${activeTab === 'subtareas' ? 'text-black' : 'text-gray-500'}`} onClick={() => setActiveTab('subtareas')}>Subtareas</button>
                                    <button className={`text-sm font-medium ${activeTab === 'comentarios' ? 'text-black' : 'text-gray-500'}`} onClick={() => setActiveTab('comentarios')}>Comentarios</button>
                                    <button className={`text-sm font-medium ${activeTab === 'actividades' ? 'text-black' : 'text-gray-500'}`} onClick={() => setActiveTab('actividades')}>Actividades</button>
                                </div>
                                <div className='text-sm font-medium'>{completedSubtareas}/{totalSubtareas}</div>
                            </div>
                            {activeTab === 'subtareas' && (
                                <div className='w-full h-auto flex flex-col items-start justify-start gap-3'>
                                    {selectedTarea.subtareas?.length > 0 ? (
                                        selectedTarea.subtareas.map((subtarea, index) => (
                                            <div key={index} className='w-full h-auto flex flex-row items-center justify-between gap-2 px-3 py-2.5 border border-[#E4E4E7] rounded-md'>
                                                <div className='flex items-center'>
                                                    <input
                                                        type='checkbox'
                                                        checked={subtarea.completed || false} // Aseguramos que siempre tenga un valor booleano
                                                        onChange={() => handleSubtareaToggle(index)}
                                                    />
                                                    <h3 className='font-medium text-sm leading-5 text-[#09090B] ml-2'>{subtarea.descripcion}</h3>
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
                                    <p>Actividades</p>
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