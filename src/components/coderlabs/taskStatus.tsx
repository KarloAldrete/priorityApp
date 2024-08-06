import React from 'react';
import { IconCircleCheck, IconCircleDashed, IconProgress, IconProgressHelp } from '@tabler/icons-react';
import { Tarea } from '@/interfaces/task.interface';

type ColumnId = 'Pendiente' | 'En Progreso' | 'En Revisión' | 'Completado';

interface TaskStatusProps {
    tasks: Tarea[];
}

const TaskStatus: React.FC<TaskStatusProps> = ({ tasks }) => {
    const allTasks = tasks.flatMap(task => task.tareas.map(subtask => ({
        ...subtask,
        etapa: task.etapa
    })));

    const columns: Record<ColumnId, { title: string; tasks: Tarea[]; icon: JSX.Element }> = {
        Pendiente: {
            title: 'Pendientes',
            tasks: allTasks.filter(task => task.estado === 'Pendiente'),
            icon: <IconCircleDashed size={20} color="#64748B" />
        },
        'En Progreso': {
            title: 'En proceso',
            tasks: allTasks.filter(task => task.estado === 'En Progreso'),
            icon: <IconProgress size={20} color="#7174FE" />
        },
        'En Revisión': {
            title: 'En revisión',
            tasks: allTasks.filter(task => task.estado === 'En Revisión'),
            icon: <IconProgressHelp size={20} color="#E76E50" />
        },
        Completado: {
            title: 'Finalizadas',
            tasks: allTasks.filter(task => task.estado === 'Completado'),
            icon: <IconCircleCheck size={20} color="#34A97F" />
        }
    };

    return (
        <div className='w-full h-auto flex flex-col gap-4'>
            {Object.entries(columns).map(([columnId, column]) => (
                <div key={columnId} className='flex justify-between items-center p-4 border rounded-lg'>
                    <div className='flex items-center gap-2'>
                        {column.icon}
                        <span className='text-base font-semibold'>{column.title}</span>
                    </div>
                    <span className='text-base font-semibold'>{column.tasks.length}</span>
                </div>
            ))}
        </div>
    );
};

const TaskChart: React.FC<TaskStatusProps> = ({ tasks }) => {
    const allTasks = tasks.flatMap(task => task.tareas);
    const completedTasks = allTasks.filter(task => task.estado === 'Completado').length;
    const totalTasks = allTasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <div className='w-full h-full flex flex-col items-center justify-center relative'>
            <span className='text-xl leading-6 font-bold text-black'>Progreso General</span>
            <svg className='w-full h-full max-w-[256px] max-h-[256px]' viewBox='0 0 36 36'>
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
                {totalTasks > 0 && (
                    <path
                        className='text-[#7174FE]'
                        strokeDasharray={`${progress}, 100`}
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
            <span className='absolute text-[24px] leading-[24px] font-bold text-[#020617]'>{progress.toFixed(0)}%</span>
            <span className='absolute bottom-32 text-[12px] leading-[12px] text-[#64748B]'>Progreso Total</span>
        </div>
    );
};

export { TaskStatus, TaskChart };