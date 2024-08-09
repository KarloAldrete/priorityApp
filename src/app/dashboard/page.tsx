'use client';
import { useSidebarStore } from '@/stores/sidebar/sidebar.store';
import { Emoji } from 'emoji-picker-react';
import { useRouter } from 'next/navigation';


export default function Home() {
    const router = useRouter();
    const data = useSidebarStore(state => state.projects);

    return (
        <div className='w-full h-full flex flex-col items-start justify-start gap-5 p-8'>

            <h2 className='text-2xl font-bold text-[#020617]'>Dashboard General</h2>

            {data &&
                <div className='w-full h-auto flex flex-row items-start justify-start gap-4'>

                    {data.map((project) => (
                        <div key={project.id} className='w-full h-auto max-w-[300px] border border-[#E2E8F0] rounded-lg cursor-default'>

                            <div className='w-full h-auto flex flex-row items-center justify-between px-3 py-3 gap-5'>

                                <div className='w-auto h-auto flex flex-row items-start justify-between'>

                                    <div className='w-auto h-auto flex flex-col items-start justify-start gap-2'>

                                        <div className='w-auto h-auto flex flex-row items-center justify-start gap-2'>

                                            <div className='w-7 h-7 flex flex-row items-center justify-center p-1 bg-[#F1F5F9] rounded-full'>
                                                <Emoji unified={project.icon ?? ''} size={20} />
                                            </div>

                                            <span className='text-sm leading-5 font-medium text-[#020617]'>{project.title}</span>

                                        </div>

                                        <span className='text-2xl leading-6 font-bold text-[#020617]'>$10,800</span>

                                    </div>

                                </div>

                                <div className='w-8 h-8 flex flex-col items-center justify-center relative'>
                                    <svg className='w-full h-full' viewBox='0 0 36 36'>
                                        <path
                                            className='text-[#F4F4F5]'
                                            strokeDasharray='100, 100'
                                            d='M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831'
                                            stroke='currentColor'
                                            strokeWidth='4'
                                            fill='none'
                                            strokeLinecap='round'
                                        />
                                        <path
                                            className='text-[#7174FE]'
                                            strokeDasharray={`50, 100`}
                                            d='M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831'
                                            stroke='currentColor'
                                            strokeWidth='4'
                                            fill='none'
                                            strokeLinecap='round'
                                        />
                                    </svg>
                                    <span className='absolute text-[10px] leading-[10px] font-bold text-[#020617]'>50%</span>
                                </div>

                            </div>

                            <div className='w-full h-full border-t border-[#D4E0F1] flex flex-row items-center justify-center p-1'>

                                <span className='w-full flex items-center justify-center text-[12px] leading-5 font-medium text-[#64748B]'>
                                    <div className='w-1.5 h-1.5 bg-[#34A97F] rounded-full mr-1' />
                                    Activo
                                </span>

                                <div className='w-[1px] h-3 border border-[#D4E0F1]' />

                                <div onClick={() => router.push(`/dashboard/${project.title}`)} className='w-full cursor-pointer flex items-center justify-center text-xs leading-5 font-medium text-[#64748B] hover:text-black'>Detalles</div>

                            </div>

                        </div>
                    ))}

                </div>
            }

        </div>
    );
};