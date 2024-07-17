import { currentUser } from '@clerk/nextjs/server';
import { createClient } from '@/utils/supabase/client';
import { IconClock } from '@tabler/icons-react';

type ProjectData = {
    id: number;
    owner: string;
    title: string;
    data: {
        tareas: Array<{
            nombre: string;
            descripcion: string;
            tecnologias: string;
            'Tiempo de desarrollo': string;
        }>
    }
};


export default async function Home() {
    const user = await currentUser();
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('owner', user?.id)

    console.log(data);

    const projectData: ProjectData[] = data ?? [];

    return (
        <div className='w-full h-full flex flex-col items-start justify-start p-5'>

            {projectData.map(project => (
                <div key={project.id} className='w-full h-auto flex flex-col gap-4'>
                    {project.data.tareas.map((tarea, index) => (
                        <div key={index} className='w-full max-w-[567px] h-auto px-3 py-2.5 border border-[#E4E4E7] rounded-md flex flex-col gap-2 hover:bg-[#F4F4F5] cursor-pointer'>
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
            ))}

        </div>
    );
};