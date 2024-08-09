import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';
import PriorityLogo from '@/images/PriorityLogoFinal.svg';

export default function Navbar() {

    return (
        <div className='w-full h-full max-h-14 px-4 py-2.5 flex flex-row items-center justify-between border-b border-[#E5E7EB]'>

            <div className='w-auto h-auto flex flex-row items-center justify-center'>

                <picture>
                    <img src={PriorityLogo.src} alt="logo" className='w-auto h-full' />
                </picture>

            </div>

            <div className='w-auto h-auto flex flex-row items-center justify-center'>

                <SignedIn>
                    <UserButton />
                </SignedIn>

                <SignedOut>
                    <SignInButton mode='modal'>
                        <button className='bg-black rounded px-4 py-1.5 flex items-center justify-center text-white text-sm font-medium leading-5'>Ingresar</button>
                    </SignInButton>
                </SignedOut>

            </div>

        </div>
    )
}
