import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { IconCircleCheck, IconCircleDashed, IconPlus, IconProgress, IconProgressHelp } from '@tabler/icons-react';
import { Tarea } from '@/interfaces/task.interface';
import { useProjectStore } from '@/stores/project/project.store';
type ColumnId = 'pending' | 'inProgress' | 'inReview' | 'completed';

export const Kanban = () => {
    const tasks = useProjectStore((state) => state.getAllTasksWithStage());
    const updateProjectTaskState = useProjectStore((state) => state.updateProjectTaskState);

    const [columns, setColumns] = useState<Record<ColumnId, { title: string; tasks: Tarea[] }>>({
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
            tasks: tasks.filter(task => task.estado === 'En Revisión')
        },
        completed: {
            title: 'Completado',
            tasks: tasks.filter(task => task.estado === 'Completado')
        }
    });

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
        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }

        const sourceColumnId = source.droppableId as ColumnId;
        const destColumnId = destination.droppableId as ColumnId;

        const sourceColumn = columns[sourceColumnId];
        const destColumn = columns[destColumnId];

        const sourceTasks = Array.from(sourceColumn.tasks);
        const destTasks = Array.from(destColumn.tasks);

        const [removed] = sourceTasks.splice(source.index, 1);

        destTasks.splice(destination.index, 0, removed);

        const updatedColumns = {
            ...columns,
            [sourceColumnId]: {
                ...sourceColumn,
                tasks: sourceTasks
            },
            [destColumnId]: {
                ...destColumn,
                tasks: destTasks
            }
        };

        setColumns(updatedColumns);

        const taskName = draggableId.split('-')[0];
        const columnTitles: Record<ColumnId, string> = {
            pending: 'Pendiente',
            inProgress: 'En Progreso',
            inReview: 'En Revisión',
            completed: 'Completado'
        };

        if (columnTitles[destColumnId]) {
            updateProjectTaskState(taskName, removed.descripcion, columnTitles[destColumnId]);
        }

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
                                            <Draggable key={task.nombre} draggableId={`${task.nombre}-${task.id}-${task.descripcion}`} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className='p-2 rounded-md border border-[#E4E4E7] shadow-sm flex flex-col items-start justify-start gap-2'
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