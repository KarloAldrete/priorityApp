'use client';
import { useState } from 'react';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export default function Home() {
    const [tareas, setTareas] = useState<{ tarea: string, completada: boolean }[]>([]);

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>

        </div>
    );
};