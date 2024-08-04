import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Tarea, useSidebarStore } from '@/stores/sidebar/sidebar.store';

type ColumnId = 'pending' | 'inProgress' | 'inReview' | 'completed';

export const Kanban = () => {
    const tasks = useSidebarStore((state) => state.getSelectedProjectTasks());
    // const updateTasks = useSidebarStore((state) => state.updateTasks);

    const columns: Record<ColumnId, { title: string; tasks: Tarea[] }> = {
        pending: {
            title: 'Pendiente',
            tasks: tasks.filter(task => task.estado === 'Pending')
        },
        inProgress: {
            title: 'En Progreso',
            tasks: tasks.filter(task => task.estado === 'In Progress')
        },
        inReview: {
            title: 'En Revisión',
            tasks: tasks.filter(task => task.estado === 'In Review')
        },
        completed: {
            title: 'Completado',
            tasks: tasks.filter(task => task.estado === 'Completed')
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
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='flex flex-row space-x-4 p-4'>
                {Object.entries(columns).map(([columnId, column]) => (
                    <Droppable key={columnId} droppableId={columnId}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className='flex flex-col p-4 bg-white rounded-lg shadow-md w-64'
                            >
                                <div className='flex justify-between items-center mb-4'>
                                    <h2 className='text-xl font-bold text-gray-700'>{column.title}</h2>
                                    <button className='text-gray-500 hover:text-gray-700'>+</button>
                                </div>
                                <div className="flex flex-col overflow-y-auto h-full max-h-[calc(100vh-200px)]">
                                    {column.tasks.map((task, index) => (
                                        <Draggable key={task.nombre} draggableId={task.nombre} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className='p-4 mb-4 bg-gray-100 rounded-lg shadow-sm'
                                                >
                                                    <div className='flex justify-between items-center flex-col gap-2 text-center'>
                                                        <div>
                                                            <span className='block text-sm font-medium text-gray-900'>{task.nombre}</span>
                                                            {/* <span className='block text-xs text-gray-500'>{task.descripcion}</span> */}
                                                        </div>
                                                        <div className='flex space-x-2'>
                                                            <span className='text-xs text-gray-500'>{task.etapa}</span>
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
    );
};

export default Kanban;