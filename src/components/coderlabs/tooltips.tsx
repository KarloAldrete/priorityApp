'use client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface TooltipItemProps {
    children: ReactNode;
    tooltipText: string;
    isCollapsed: boolean;
}

export default function TooltipItem({ children, tooltipText, isCollapsed }: TooltipItemProps) {
    return (
        <TooltipProvider delayDuration={50}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                {isCollapsed && (
                    <TooltipContent side='right' className='bg-black text-white font-medium border border-[#09090B] p-2 rounded-md'>
                        <p>{tooltipText}</p>
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    );
}