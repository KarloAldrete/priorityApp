'use client';
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { IconDashboard, IconLogout, IconSparkles } from '@tabler/icons-react';
import { TasksModal } from '@/components/generateTasksModal';
import { TooltipProvider } from "@/components/ui/tooltip";
import { useUser } from '@clerk/nextjs';
import LogoSection from '@/components/coderlabs/LogoSection';
import SidebarItem from '@/components/coderlabs/SidebarItem';
import { useSidebarStore } from '@/stores/sidebar/sidebar.store';
import { useEffect } from 'react';
import { useProjectStore } from '@/stores/project/project.store';
import { useUpdateSelectedProject } from '@/hooks/useUpdateSelectedProject';
import { useTasksStore } from '@/stores/modal/modal.store';
import { Emoji } from 'emoji-picker-react';

export default function Sidebar() {
    const { user } = useUser();
    useUpdateSelectedProject();
    const handleCollapse = useSidebarStore(state => state.handleCollapse);
    const projects = useSidebarStore(state => state.projects);
    const fetchProjects = useSidebarStore(state => state.fetchProjects);
    const setSelectedProjectByTitle = useProjectStore(state => state.setSelectedProjectByTitle);
    const selectedProject = useProjectStore(state => state.selectedProject);
    const setIsVisible = useTasksStore(state => state.setIsVisible);


    useEffect(() => {
        if (user) {
            fetchProjects(user.id);
        }
    }, [fetchProjects, user]);

    const handleProjectClick = (projectTitle: string, path: string) => {
        setSelectedProjectByTitle(projectTitle);
    };

    return (
        <>
            <ResizablePanel onCollapse={handleCollapse} onExpand={handleCollapse} collapsible={true} minSize={15} defaultSize={3} maxSize={15} className='w-full h-auto min-w-[62px] rounded-xl font-geist'>
                <title>{`Priority | ${selectedProject?.title ? `${selectedProject.title}` : 'Dashboard'}`}</title>
                <TooltipProvider delayDuration={50}>
                    <div className='rounded-xl bg-white w-full h-full flex flex-col items-start justify-between px-3 py-3 border border-[#E8E6EF]'>
                        <div className='w-full h-auto flex flex-col items-start justify-start gap-2.5'>
                            <LogoSection />
                            <SidebarItem
                                key="dashboard"
                                icon={<IconDashboard size={20} stroke={1.75} />}
                                label="Dashboard"
                                projectTitle="Dashboard"
                                path="/dashboard"
                            />
                            <SidebarItem
                                key="newProject"
                                icon={<IconSparkles size={20} stroke={1.75} />}
                                label="Nuevo Proyecto"
                                onClick={() => setIsVisible(true)}
                            />
                            <div className='w-full h-[1px] border-b border-[#E4E4E7]' />
                            {projects.map(project => (
                                <SidebarItem
                                    key={project.title}
                                    icon={<Emoji unified={project.icon ?? ''} size={20} />}
                                    label={project.title}
                                    projectTitle={project.title}
                                    path={`/dashboard/${project.title}`}
                                    onClick={() => handleProjectClick(project.title, `/dashboard/${project.title}`)}
                                />
                            ))}
                        </div>
                        <SidebarItem
                            icon={<IconLogout size={20} stroke={1.75} />}
                            label="Cerrar Sesión"
                            hoverColor="#CE4444"
                        />
                    </div>
                </TooltipProvider>
            </ResizablePanel>
            <ResizableHandle withHandle className='custom-handle' />
            <TasksModal />
        </>
    );
}