'use client';
import { useState, useEffect } from 'react';
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { IconDashboard, IconLogout, IconSparkles } from '@tabler/icons-react';
import { TasksModal } from '@/components/generateTasksModal';
import { TooltipProvider } from "@/components/ui/tooltip";
import { useUser } from '@clerk/nextjs';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import LogoSection from '@/components/coderlabs/LogoSection';
import SidebarItem from '@/components/coderlabs/SidebarItem';
import { useProjectStore } from '@/store/useStore';

interface Subtarea {
    descripcion: string;
    completed: boolean;
};

interface Tarea {
    nombre: string;
    descripcion: string;
    'Tiempo de desarrollo': string;
    subtareas: Subtarea[];
};

interface ProjectData {
    id: number;
    owner: string;
    title: string;
    icon?: string;
    data: {
        tareas: Tarea[];
    };
};

export default function Sidebar() {
    const { user } = useUser();
    const router = useRouter();
    const { projects, setProjects, selectProject, selectedProject, isSidebarCollapsed, setSidebarCollapsed } = useProjectStore();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const isCollapsed = useProjectStore(state => state.isSidebarCollapsed);
    const setCollapsed = useProjectStore(state => state.setSidebarCollapsed);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            const supabase = await createClient();

            const { data, error } = await supabase
                .from('projects')
                .select('id, owner, title, icon, data')
                .eq('owner', user.id);

            if (data) {
                setProjects(data as ProjectData[]);
                console.log(data);

                const pathname = window.location.pathname;
                const projectTitle = pathname.split('/dashboard/')[1];
                const selectedProject = data.find((project: ProjectData) => project.title === projectTitle);
                if (selectedProject) {
                    selectProject(selectedProject);
                }
            }

            if (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [user, setProjects, selectProject]);

    function handleCollapse() {
        setCollapsed(!isCollapsed);
    }

    function handleIconClick() {
        setIsModalVisible(true);
    }

    function handleProjectClick(projectTitle: string) {
        const project = projects.find(p => p.title === projectTitle);
        if (project) {
            selectProject(project);
            router.push(`/dashboard/${projectTitle}`);
        } else {
            console.error(`Project with title ${projectTitle} not found`);
        }
    }

    return (
        <>
            <ResizablePanel onCollapse={handleCollapse} onExpand={handleCollapse} collapsible={true} minSize={15} defaultSize={15} maxSize={15} className='w-full h-auto min-w-[62px] rounded-xl font-geist'>
                <TooltipProvider delayDuration={50}>
                    <div className='rounded-xl bg-white w-full h-full flex flex-col items-start justify-between px-3 py-3 border border-[#E8E6EF]'>
                        <div className='w-full h-auto flex flex-col items-start justify-start gap-2.5'>
                            <LogoSection isCollapsed={isCollapsed} />
                            <SidebarItem
                                key="dashboard"
                                icon={<IconDashboard size={20} stroke={1.75} />}
                                label="Dashboard"
                                projectTitle="Dashboard"
                                isCollapsed={isCollapsed}
                                isSelected={selectedProject?.title === 'Dashboard'}
                                onClick={() => handleProjectClick('/')}
                                path="/dashboard"
                            />
                            <SidebarItem
                                key="newProject"
                                icon={<IconSparkles size={20} stroke={1.75} />}
                                label="Nuevo Proyecto"
                                isCollapsed={isCollapsed}
                                onClick={handleIconClick}
                            />
                            <div className='w-full h-[1px] border-b border-[#E4E4E7]' />
                            {projects.map(project => (
                                <SidebarItem
                                    key={project.title}
                                    icon={<span className='w-5 h-5' style={{ transform: 'translateY(-2px) translateX(-.5px)' }}>{project.icon}</span>}
                                    label={project.title}
                                    projectTitle={project.title}
                                    isCollapsed={isCollapsed}
                                    isSelected={selectedProject?.title === project.title}
                                    onClick={() => handleProjectClick(project.title)}
                                />
                            ))}
                        </div>
                        <SidebarItem
                            icon={<IconLogout size={20} stroke={1.75} />}
                            label="Cerrar Sesión"
                            isCollapsed={isCollapsed}
                            onClick={handleIconClick}
                            hoverColor="#CE4444"
                        />
                    </div>
                </TooltipProvider>
            </ResizablePanel>
            <ResizableHandle withHandle className='custom-handle' />
            <TasksModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
        </>
    );
}