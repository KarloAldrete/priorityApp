import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';

export default async function Page() {
  const user = await currentUser();

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      {user &&
        <Link href={'/dashboard'}>
          <button className='bg-black p-4 rounded-sm flex items-center justify-center'>
            <span className='text-lg text-white'>CLICK TO START</span>
          </button>
        </Link>
      }

    </div>
  )
}