'use client';

interface LogoSectionProps {
    isCollapsed: boolean;
}

export default function LogoSection({ isCollapsed }: LogoSectionProps) {
    return (
        <div className='w-full min-h-9 pb-3 flex flex-row items-center justify-start'>
            <picture className='w-full h-full max-w-9 max-h-9 flex items-center justify-center'>
                <img alt='logo' className='w-full h-full max-w-9 max-h-9 flex items-center justify-center' src='https://mypqirkuxpecgfrnjryk.supabase.co/storage/v1/object/public/Priority/PriorityLogo.svg' />
            </picture>
            {!isCollapsed &&
                <span className='text-black text-xl leading-5 font-bold text-center'>Priority</span>
            }
        </div>
    );
}