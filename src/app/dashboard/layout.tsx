'use client';
import {
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import Sidebar from "@/components/sidebar";
import { Toaster } from 'sonner'
import { Suspense } from 'react';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='w-full h-full font-geist p-3'>
            <Toaster />

            <div className='w-full h-full font-geist p-8 rounded-xl bg-[#ECECEF] bg-[radial-gradient(#B4B4B6_1px,transparent_1px)] bg-[size:12px_12px] text-[color:var(--foreground)] border border-[#E8E6EF]'>

                <ResizablePanelGroup direction="horizontal" className='rounded-xl w-full h-auto'>

                    <Sidebar />

                    <ResizablePanel defaultSize={85} className='w-full h-full flex flex-col items-center justify-center bg-white rounded-xl ml-4 border border-[#E8E6EF]'>
                        {children}
                    </ResizablePanel>

                </ResizablePanelGroup>

            </div>

        </div>
    );
}
