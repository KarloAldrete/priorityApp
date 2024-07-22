'use client';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useProjectStore } from '@/store/useStore';

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    projectTitle?: string;
    isCollapsed: boolean;
    isSelected?: boolean;
    onClick?: () => void;
    hoverColor?: string;
    path?: string;
}

export default function SidebarItem({ icon, label, projectTitle, isCollapsed, isSelected, onClick, hoverColor = 'black', path }: SidebarItemProps) {
    const { selectProject, projects, selectedProject } = useProjectStore();

    const handleClick = () => {
        if (projectTitle) {
            const project = projects.find(p => p.title === projectTitle);
            if (project) {
                selectProject(project);
            }
        }
        if (path) {
            window.location.href = path;
        }
        if (onClick) {
            onClick();
        }
    };

    const isItemSelected = selectedProject?.title === projectTitle;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    className={`w-full min-h-9 max-w-[300px] flex flex-row items-center justify-start hover:bg-black gap-2 p-2 rounded-md text-black ${isItemSelected ? 'bg-black text-white' : `hover:bg-${hoverColor} hover:text-white`} ease-in-out duration-200 cursor-pointer`}
                    onClick={handleClick}
                >
                    {icon}
                    {!isCollapsed &&
                        <span className='text-sm leading-5 font-medium'>{label}</span>
                    }
                </div>
            </TooltipTrigger>
            {isCollapsed && (
                <TooltipContent side='right' className={`bg-${hoverColor} text-white font-medium border border-[#09090B] p-2 rounded-md`}>
                    <p>{label}</p>
                </TooltipContent>
            )}
        </Tooltip>
    );
}