'use client';
import { useFakeStore } from '@/stores/main/fake.store';
import PriorityIcon from '@/images/PriorityIcon.svg';
import PriorityText from '@/images/PriorityText.svg';

export default function LogoSection() {
    const isCollapsed = useFakeStore(state => state.isCollapsed);

    return (
        <div className='w-full min-h-9 pb-3 flex flex-row items-center justify-start gap-1'>
            <picture className='w-full h-full max-w-9 max-h-9 flex items-center justify-center'>
                <img alt='logo' className='w-full h-full max-w-9 max-h-9 flex items-center justify-center' src={PriorityIcon.src} />
            </picture>
            {!isCollapsed &&
                <picture className='w-auto h-full flex items-center justify-center'>
                    <img alt='logo' className='w-full h-full max-h-[50%] flex items-center justify-center' src={PriorityText.src} />
                </picture>
            }
        </div>
    );
}