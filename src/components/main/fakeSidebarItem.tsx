'use client';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useFakeStore } from '@/stores/main/fake.store';
import { useRouter } from 'next/navigation';
import React from 'react';

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    projectTitle?: string;
    onClick?: () => void;
    path?: string;
};

const SidebarItem = React.memo(({ icon, label, projectTitle, onClick, path }: SidebarItemProps) => {
    const router = useRouter();
    const isCollapsed = useFakeStore(state => state.isCollapsed);
    const selectedProject = useFakeStore(state => state.selectedProject);

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        if (path) {
            router.push(path);
        }
    };

    const isSelected = selectedProject?.title === projectTitle;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    className={`w-full min-h-9 flex ${isCollapsed ? 'bg-[#F1F5F9] group-hover:text-white text-[#64748B]' : 'text-black'} flex-row ${isSelected ? 'bg-black text-white cursor-default' : `hover:bg-black cursor-pointer hover:text-white`} items-center justify-start gap-2 p-2 rounded-md text-black group`}
                    onClick={handleClick}
                >
                    <div className={`w-auto h-auto`}>
                        {icon}
                    </div>
                    {!isCollapsed &&
                        <span className='text-sm leading-5 font-medium'>{label}</span>
                    }
                </div>
            </TooltipTrigger>
            {isCollapsed && (
                <TooltipContent side='right' className={`bg-black text-white font-medium border border-[#09090B] p-2 rounded-md`}>
                    <p>{label}</p>
                </TooltipContent>
            )}
        </Tooltip>
    );
});

SidebarItem.displayName = 'SidebarItem';

export default SidebarItem;