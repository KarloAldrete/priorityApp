import Navbar from "@/components/main/navbar";
import { switzer, inter } from "@/components/fonts/fonts";
import Dashboard from "@/components/main/dashboard";
import { SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from "next/link";




export default async function Page() {

  return (
    <div className='w-full h-auto max-w-screen flex flex-col items-center justify-start overflow-x-hidden'>

      <Navbar />

      <div className={`w-full h-full flex flex-col items-center justify-start py-20 px-16 gap-8 ${inter.className}`}>

        <div className='w-full h-auto flex flex-col items-center justify-start gap-5'>

          <div className='w-full h-auto flex flex-col items-center justify-start gap-2'>

            <span className={`${switzer.className} text-[60px] leading-[80px] font-bold`}>Agiliza tus tratos con clientes</span>

            <span className='text-[#64748B] text-base leading-5 font-normal text-center'><strong className='text-semibold'>Priority</strong> facilita la creación de cotizaciones y la gestión de proyectos para desarrolladores, <br /> agilizando las negociaciones mediante generación y gestión de tareas.</span>

          </div>

          <SignedOut>
            <SignUpButton
              mode='modal'
              fallbackRedirectUrl={'/dashboard'}
            >
              <button className='bg-black text-white text-base leading-5 font-semibold px-4 py-2 rounded'>Regístrate</button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <Link href='/dashboard' className='bg-black text-white text-base leading-5 font-semibold px-4 py-2 rounded'>Dashboard</Link>
          </SignedIn>

        </div>

        <Dashboard />

      </div>

    </div >
  )
}