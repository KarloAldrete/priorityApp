'use client';
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { IconDashboard, IconLogout, IconSparkles } from '@tabler/icons-react';
import { TooltipProvider } from "@/components/ui/tooltip";
import LogoSection from '@/components/main/fakeLogo';
import SidebarItem from '@/components/main/fakeSidebarItem';
import { useFakeStore } from '@/stores/main/fake.store';

export default function Sidebar() {
    const isCollapsed = useFakeStore(state => state.isCollapsed);
    const projects = useFakeStore(state => state.projects);

    const handleProjectClick = (projectTitle: string) => {
        useFakeStore.setState({ selectedProject: projects.find(project => project.title === projectTitle) || null });
    };

    const handleCollapse = () => {
        useFakeStore.setState({ isCollapsed: !isCollapsed });
    };

    return (
        <>
            <ResizablePanel onCollapse={handleCollapse} onExpand={handleCollapse} collapsible={true} minSize={15} defaultSize={3} maxSize={15} className='w-full h-auto min-w-[62px] rounded-xl font-geist'>

                <TooltipProvider delayDuration={50}>
                    <div className='rounded-xl bg-white w-full h-full flex flex-col items-start justify-between px-3 py-3 border border-[#E8E6EF]'>
                        <div className='w-full h-auto flex flex-col items-start justify-start gap-2.5'>
                            <LogoSection />
                            <SidebarItem
                                key="dashboard"
                                icon={<IconDashboard size={20} stroke={1.75} />}
                                label="Dashboard"
                                projectTitle="Dashboard"
                            />
                            <SidebarItem
                                key="newProject"
                                icon={<IconSparkles size={20} stroke={1.75} />}
                                label="Nuevo Proyecto"
                            />
                            <div className='w-full h-[1px] border-b border-[#E4E4E7]' />
                            {projects.map(project => (
                                <SidebarItem
                                    key={project.title}
                                    icon={<span className='w-5 h-5' style={{ transform: 'translateY(-2px) translateX(-.5px)' }}>{project.icon}</span>}
                                    label={project.title}
                                    projectTitle={project.title}
                                    onClick={() => handleProjectClick(project.title)}
                                />
                            ))}
                        </div>
                        <SidebarItem
                            key="logout"
                            icon={<IconLogout size={20} stroke={1.75} />}
                            label="Cerrar Sesión"
                        />
                    </div>
                </TooltipProvider>

            </ResizablePanel>

            <ResizableHandle withHandle className='custom-handle' />
        </>
    );
}