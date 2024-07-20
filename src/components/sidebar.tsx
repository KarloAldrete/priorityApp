'use client';
import { useState, useEffect } from 'react';
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { IconLayoutDashboard, IconLogout, IconSparkles } from '@tabler/icons-react';
import { TasksModal } from '@/components/generateTasksModal';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserButton, useUser, SignedIn } from '@clerk/nextjs';
import { createClient } from '@/utils/supabase/client';
import { useProject } from '@/context/projectContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Project {
    title: string;
    icon: string;
}

export default function Sidebar() {
    const { user } = useUser();
    const { selectedProject, setSelectedProject } = useProject();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            const supabase = await createClient();

            const { data, error } = await supabase
                .from('projects')
                .select('title, icon')
                .eq('owner', user.id);

            if (data) {
                const projectList = data.map((project: { title: string, icon?: string }) => ({
                    title: project.title,
                    icon: project.icon || 'default-icon'
                }));
                setProjects(projectList);
            };

            if (error) {
                console.error(error);
            };
        };

        fetchData();
    }, [user]);

    function handleCollapse() {
        setIsCollapsed(!isCollapsed);
    };

    function handleIconClick() {
        setIsModalVisible(true);
    };

    function handleProjectClick(projectTitle: string) {
        setSelectedProject(projectTitle);
    }

    useEffect(() => {
        const projectTitle = selectedProject === '/' ? 'Dashboard' : selectedProject;
        document.title = `Priority | ${projectTitle}`;
    }, [selectedProject]);

    return (
        <>
            <TooltipProvider delayDuration={50}>

                <ResizablePanel onCollapse={handleCollapse} onExpand={handleCollapse} collapsible={true} minSize={16} defaultSize={16} maxSize={16} className='w-auto h-auto min-w-[62px] rounded-xl font-geist'>

                    <div className='rounded-xl bg-white w-full h-full flex flex-col items-start justify-between px-3 py-3 border border-[#E8E6EF]'>

                        <div className='w-full h-auto flex flex-col items-start justify-start gap-2.5'>

                            <div className='w-full min-h-9 pb-3 flex flex-row items-center justify-start'>

                                <picture className='w-full h-full max-w-9 max-h-9 flex items-center justify-center'>
                                    <img alt='logo' className='w-full h-full max-w-9 max-h-9 flex items-center justify-center' src='https://mypqirkuxpecgfrnjryk.supabase.co/storage/v1/object/public/Priority/PriorityLogo.svg' />
                                </picture>

                                {!isCollapsed &&
                                    <span className='text-black text-xl leading-5 font-bold text-center'>Priority</span>
                                }

                            </div>

                            <Tooltip>

                                <TooltipTrigger asChild>

                                    <Link href={`/dashboard`} className={`w-full min-h-9 max-w-[300px] flex flex-row items-center justify-start gap-2 p-2 rounded-md text-black ${selectedProject === '/' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'} ease-in-out duration-200 cursor-pointer`} onClick={() => handleProjectClick('/')}>
                                        <IconLayoutDashboard size={20} stroke={1.75} className='min-w-5 min-h-5' />
                                        {!isCollapsed &&
                                            <span className='text-sm leading-5 font-medium'>Dashboard</span>
                                        }
                                    </Link>

                                </TooltipTrigger>

                                {isCollapsed && (
                                    <TooltipContent side='right' className='bg-black text-white font-medium border border-[#09090B] p-2 rounded-md'>
                                        <p>Dashboard</p>
                                    </TooltipContent>
                                )}

                            </Tooltip>

                            <Tooltip>

                                <TooltipTrigger asChild>

                                    <div className='w-full min-h-9 max-w-[300px] flex flex-row items-center justify-start gap-2 p-2 bg-white rounded-md text-black hover:bg-black hover:text-white ease-in-out duration-200 cursor-pointer' onClick={handleIconClick}>
                                        <IconSparkles size={20} stroke={1.75} className='min-w-5 min-h-5' />
                                        {!isCollapsed &&
                                            <span className='text-sm leading-5 font-medium'>Nuevo Proyecto</span>
                                        }
                                    </div>

                                </TooltipTrigger>

                                {isCollapsed && (
                                    <TooltipContent side='right' className='bg-black text-white font-medium border border-[#09090B] p-2 rounded-md'>
                                        <p>Nuevo Proyecto</p>
                                    </TooltipContent>
                                )}

                            </Tooltip>

                            <div className='w-full h-[1px] border-b border-[#E4E4E7]' />

                            {projects.map(project => (
                                <Tooltip key={project.title}>

                                    <TooltipTrigger asChild>

                                        <Link href={`/dashboard/${project.title}`} className={`w-full min-h-9 max-w-[300px] flex flex-row items-center justify-start gap-2 p-2 rounded-md text-black ${selectedProject === project.title ? 'bg-black text-white' : 'hover:bg-black hover:text-white'} ease-in-out duration-200 cursor-pointer`} onClick={() => handleProjectClick(project.title)}>
                                            <span className='w-5 h-5' style={{ transform: 'translateY(-2px) translateX(-.5px)' }}>{project.icon}</span>
                                            {!isCollapsed &&
                                                <span className='text-sm leading-5 font-medium'>{project.title}</span>
                                            }
                                        </Link>

                                    </TooltipTrigger>

                                    {isCollapsed && (
                                        <TooltipContent side='right' className='bg-black text-white font-medium border border-[#09090B] p-2 rounded-md'>
                                            <p>{project.title}</p>
                                        </TooltipContent>
                                    )}

                                </Tooltip>
                            ))}

                        </div>

                        {/* <SignedIn>
                            <UserButton />
                        </SignedIn> */}

                        <Tooltip>

                            <TooltipTrigger asChild>

                                <div className='w-full min-h-9 max-w-[300px] flex flex-row items-center justify-start gap-2 p-2 bg-white rounded-md text-black hover:bg-[#CE4444] hover:text-white ease-in-out duration-200 cursor-pointer' onClick={handleIconClick}>
                                    <IconLogout size={20} stroke={1.75} className='min-w-5 min-h-5' />
                                    {!isCollapsed &&
                                        <span className='text-sm leading-5 font-medium'>Cerrar Sesión</span>
                                    }
                                </div>

                            </TooltipTrigger>

                            {isCollapsed && (
                                <TooltipContent side='right' className='bg-[#CE4444] text-white font-medium border border-[#CE4444] p-2 rounded-md'>
                                    <p>Cerrar Sesión</p>
                                </TooltipContent>
                            )}

                        </Tooltip>

                    </div>

                </ResizablePanel>

                <ResizableHandle withHandle className='custom-handle' />

                <TasksModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} />

            </TooltipProvider>
        </>
    );
}