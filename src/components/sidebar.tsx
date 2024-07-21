// import { useState, useEffect } from 'react';
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { IconLayoutDashboard, IconLogout, IconSparkles } from '@tabler/icons-react';
// import { TasksModal } from '@/components/generateTasksModal';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cookies } from 'next/headers';
import TooltipItem from '@/components/coderlabs/tooltips';
import AtomizedSidebar from '@/components/atomizedSidebar';

interface Project {
    title: string;
    icon: string;
};

interface ProjectContextType {
    selectedProject: string | null;
    title: string;
};

async function getSelectedProject() {
    const cookieStore = cookies();
    const pathname = cookieStore.get('current-path')?.value || '/';
    const userId = cookieStore.get('user-id')?.value;

    const res = await fetch('/api/path', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            pathname: pathname,
        }),
        cache: 'no-store'
    });

    const projects = await res.json();
    return projects;
};

export default async function Sidebar() {
    const selectedProject = await getSelectedProject();

    // const [isCollapsed, setIsCollapsed] = useState(true);
    // const [isModalVisible, setIsModalVisible] = useState(false);
    // const [projects, setProjects] = useState<Project[]>([]);

    // function handleCollapse() {
    //     // setIsCollapsed(!isCollapsed);
    //     console.log('collapse');
    // };

    // function handleIconClick() {
    //     // setIsModalVisible(true);
    // };

    // function handleProjectClick(projectTitle: string) {
    //     // setSelectedProject(projectTitle);
    //     // router.push(`/dashboard/${projectTitle}`);
    // }

    if (!selectedProject) {
        return null;
    }

    return (
        <AtomizedSidebar />
    );
}