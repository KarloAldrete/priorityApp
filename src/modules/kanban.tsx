import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Tarea, useSidebarStore } from '@/stores/sidebar/sidebar.store';
import { IconCheck, IconCircleCheck, IconCircleDashed, IconClipboardCheck, IconClock, IconEye, IconPlus, IconProgress, IconProgressHelp } from '@tabler/icons-react';

type ColumnId = 'pending' | 'inProgress' | 'inReview' | 'completed';

export const Kanban = () => {
    const tasks = useSidebarStore((state) => state.getAllTasksWithStage());

    const columns: Record<ColumnId, { title: string; tasks: Tarea[] }> = {
        pending: {
            title: 'Pendiente',
            tasks: tasks.filter(task => task.estado === 'Pendiente')
        },
        inProgress: {
            title: 'En Progreso',
            tasks: tasks.filter(task => task.estado === 'En Progreso')
        },
        inReview: {
            title: 'En Revisión',
            tasks: tasks.filter(task => task.estado === 'En revision')
        },
        completed: {
            title: 'Completado',
            tasks: tasks.filter(task => task.estado === 'Completado')
        }
    };

    const getColumnIcon = (columnId: ColumnId) => {
        switch (columnId) {
            case 'pending':
                return <IconCircleDashed size={20} color="#64748B" />;
            case 'inProgress':
                return <IconProgress size={20} color="#7174FE" />;
            case 'inReview':
                return <IconProgressHelp size={20} color="#E76E50" />;
            case 'completed':
                return <IconCircleCheck size={20} color="#34A97F" />;
            default:
                return null;
        }
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;

        const sourceColumn = columns[source.droppableId as ColumnId];
        const destColumn = columns[destination.droppableId as ColumnId];
        const sourceTasks = [...sourceColumn.tasks];
        const destTasks = [...destColumn.tasks];

        const [removed] = sourceTasks.splice(source.index, 1);
        destTasks.splice(destination.index, 0, removed);

        columns[source.droppableId as ColumnId].tasks = sourceTasks;
        columns[destination.droppableId as ColumnId].tasks = destTasks;

        const allTasks = Object.values(columns).flatMap(column =>
            column.tasks.map(task => ({ ...task, estado: column.title }))
        );
        // updateTasks(allTasks);
    };

    return (
        <div className='w-full h-full flex flex-row overflow-auto bg-[#F1F5F9] rounded-xl p-2 gap-2'>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className='flex flex-row gap-2 w-full h-full'>
                    {Object.entries(columns).map(([columnId, column]) => (
                        <Droppable key={columnId} droppableId={columnId}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className='flex flex-col bg-white rounded-lg shadow-md w-full h-full'
                                >
                                    <div className='flex justify-between items-center px-3 py-3'>
                                        <div className="flex items-center justify-center gap-1">
                                            {getColumnIcon(columnId as ColumnId)}
                                            <span className='text-base leading-5 font-semibold text-[#020617]'>{column.title}</span>
                                            <span className='text-xs leading-5 text-[#64748B]'>{column.tasks.length}</span>
                                        </div>
                                        {columnId === 'pending' && (
                                            <button className='text-gray-500 hover:text-gray-700'>
                                                <IconPlus size={20} color="#020617" />
                                            </button>
                                        )}
                                    </div>
                                    <div className="w-full h-full flex flex-col gap-2 px-3 overflow-y-auto mb-3">
                                        {column.tasks.map((task, index) => (
                                            <Draggable key={task.nombre} draggableId={task.nombre} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className='p-2 rounded border border-[#E4E4E7] shadow-sm flex flex-col items-start justify-start gap-2'
                                                    >
                                                        <div className='flex justify-between items-start flex-col gap-2 text-start'>
                                                            <div>
                                                                <span className='block text-sm font-medium text-gray-900'>{task.nombre}</span>
                                                                <span className='block text-xs text-gray-500'>{task.descripcion}</span>
                                                            </div>
                                                            <div className={`w-auto h-auto flex flex-row items-center justify-center px-1.5 py-0.5 rounded font-medium ${task.etapa === 'Planificación' ? 'bg-[#F1F5F9] text-[#64748B]' :
                                                                task.etapa === 'Diseño' ? 'bg-[#E6E6FF] text-[#7174FE]' :
                                                                    task.etapa === 'Desarrollo' ? 'bg-[#EBF9F4] text-[#34A97F]' :
                                                                        task.etapa === 'Pruebas' ? 'bg-[#FCECE9] text-[#E76E50]' :
                                                                            task.etapa === 'Despliegue' ? 'bg-[#FFF4E5] text-[#F6A609]' :
                                                                                'bg-[#F1F5F9] text-[#64748B]'
                                                                }`}>
                                                                <span className='text-xs'>{task.etapa}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default Kanban;