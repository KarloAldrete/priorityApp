'use client';

import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { IconLayoutDashboard, IconSparkles } from '@tabler/icons-react';
import TooltipItem from '@/components/coderlabs/tooltips';
import { cookies } from 'next/headers';

interface Project {
    title: string;
    icon: string;
};

interface ProjectContextType {
    selectedProject: string | null;
    title: string;
};

export default function AtomizedSidebar() {
    const cookieStore = cookies();
    const pathname = cookieStore.get('current-path')?.value || '/';
    const selectedProject = pathname.split('/')[2] || '/';

    if (!selectedProject) {
        return null;
    }

    return (
        <>
            <ResizablePanel collapsible={true} minSize={16} defaultSize={16} maxSize={16} className='w-auto h-auto min-w-[62px] rounded-xl font-geist'>
                <div className='rounded-xl bg-white w-full h-full flex flex-col items-start justify-between px-3 py-3 border border-[#E8E6EF]'>
                    <div className='w-full h-auto flex flex-col items-start justify-start gap-2.5'>
                        <LogoSection />
                        <TooltipItem tooltipText="Dashboard" isCollapsed={false}>
                            <div className={`w-full min-h-9 max-w-[300px] flex flex-row items-center justify-start gap-2 p-2 rounded-md text-black ${selectedProject === '/' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'} ease-in-out duration-200 cursor-pointer`} >
                                <IconLayoutDashboard size={20} stroke={1.75} className='min-w-5 min-h-5' />
                            </div>
                        </TooltipItem>
                        <TooltipItem tooltipText="Nuevo Proyecto" isCollapsed={false}>
                            <div className='w-full min-h-9 max-w-[300px] flex flex-row items-center justify-start gap-2 p-2 bg-white rounded-md text-black hover:bg-black hover:text-white ease-in-out duration-200 cursor-pointer'>
                                <IconSparkles size={20} stroke={1.75} className='min-w-5 min-h-5' />
                            </div>
                        </TooltipItem>
                        <div className='w-full h-[1px] border-b border-[#E4E4E7]' />
                    </div>
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle className='custom-handle' />
        </>
    );
}

function LogoSection() {
    return (
        <div className='w-full min-h-9 pb-3 flex flex-row items-center justify-start'>
            <picture className='w-full h-full max-w-9 max-h-9 flex items-center justify-center'>
                <img alt='logo' className='w-full h-full max-w-9 max-h-9 flex items-center justify-center' src='https://mypqirkuxpecgfrnjryk.supabase.co/storage/v1/object/public/Priority/PriorityLogo.svg' />
            </picture>
        </div>
    );
}