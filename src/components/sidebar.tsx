'use client';
import { useState } from 'react';
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { IconSparkles } from '@tabler/icons-react';
import { TasksModal } from '@/components/generateTasksModal';

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    function handleCollapse() {
        setIsCollapsed(!isCollapsed);
    };

    function handleIconClick() {
        setIsModalVisible(true);
    };

    return (
        <>
            <ResizablePanel onCollapse={handleCollapse} onExpand={handleCollapse} collapsible={true} minSize={16} defaultSize={16} maxSize={16} className='w-auto h-auto min-w-[62px] rounded-xl xl:'>

                <div className='rounded-xl bg-white w-full h-full flex flex-col items-start justify-start px-3 py-3 border border-black'>

                    <div className={`w-full min-h-9 max-w-[300px] flex flex-row items-center justify-start gap-2 p-2 bg-black rounded-md text-white cursor-pointer ${isCollapsed ? '' : ''}`} onClick={handleIconClick}>

                        <IconSparkles size={20} stroke={1.75} className='min-w-5 min-h-5' />

                        {!isCollapsed &&
                            <span className='text-white text-sm leading-5 font-medium'>Nuevo Proyecto</span>
                        }

                    </div>

                </div>

            </ResizablePanel>

            <ResizableHandle withHandle className='custom-handle' />

            <TasksModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
        </>
    );
}