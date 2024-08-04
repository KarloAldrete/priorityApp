'use client';
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { IconDashboard, IconLogout, IconSparkles } from '@tabler/icons-react';
import { TasksModal } from '@/components/generateTasksModal';
import { TooltipProvider } from "@/components/ui/tooltip";
import { useUser } from '@clerk/nextjs';
import LogoSection from '@/components/coderlabs/LogoSection';
import SidebarItem from '@/components/coderlabs/SidebarItem';
import { useSidebarStore, useUpdateSelectedProject } from '@/stores/sidebar/sidebar.store';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Sidebar() {
    const { user } = useUser();

    const isCollapsed = useSidebarStore(state => state.isCollapsed);
    const handleCollapse = useSidebarStore(state => state.handleCollapse);
    const projects = useSidebarStore(state => state.projects);
    const fetchProjects = useSidebarStore(state => state.fetchProjects);
    const modalOpen = useSidebarStore(state => state.modalOpen);
    const setModalOpen = useSidebarStore(state => state.setModalOpen);
    const setSelectedProjectByTitle = useSidebarStore(state => state.setSelectedProjectByTitle);
    const selectedProject = useSidebarStore(state => state.selectedProject);

    useUpdateSelectedProject();

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
                <title>{`Priority | ${selectedProject?.icon} ${selectedProject?.title}`}</title>
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
                                onClick={() => setModalOpen(true)}
                            />
                            <div className='w-full h-[1px] border-b border-[#E4E4E7]' />
                            {projects.map(project => (
                                <SidebarItem
                                    key={project.title}
                                    icon={<span className='w-5 h-5' style={{ transform: 'translateY(-2px) translateX(-.5px)' }}>{project.icon}</span>}
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
            <TasksModal isVisible={modalOpen} setIsVisible={setModalOpen} />
        </>
    );
}