'use strict';

import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import headerImage from '@/public/DantesLogo.png';

export default function SideNav() {

    const router = useRouter();

    // Check if it is active path
    const isActivePath = path => router.pathname === path;
                  
    return (
      <>
        <div className="flex h-auto flex-col py-2 w-72 bg-white">
          <div className='flex flex-row'>
            <Image src={headerImage} height={80} alt='' className='rounded-lg m-5 md:w-16 lg:w-20 xl:w-36'/>
            <p className="pt-10 text-md md:text-xl lg:text-2xl  font-bold"> MMT</p>
          </div>

          <div className='flex flex-col m-4 pl-2 gap-4' >
            <Link 
              href="/"
              passHref
              rel="noopener noreferrer"
              className={`flex flex-row gap-2 hover:cursor hover:font-bold hover:underline ${isActivePath('/') ? 'font-bold text-purple bg-light-purple p-1 rounded-md' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Overview
            </Link>
            <Link
              href="/modernMilitaryTranscript"
              passHref
              rel="noopener noreferrer"
              className={`flex flex-row gap-4 hover:cursor hover:font-bold hover:underline ${isActivePath('/modernMilitaryTranscript') ? 'font-bold text-purple bg-light-purple p-1 rounded-md' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mt-3 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              Modernized Military Transcript 
            </Link>
            <Link
              href="/helpCenter"
              passHref
              rel="noopener noreferrer"
              className={`flex flex-row gap-4 hover:cursor hover:font-bold hover:underline ${isActivePath('/helpCenter') ? 'font-bold text-purple bg-light-purple p-1 rounded-md' : ''}`}
            >
              {isActivePath('/helpCenter') ?
              <Image src={require('@/public/icons/life-buoy-icon.svg').default} alt='mySvgImage' className='h-5.5 w-5' />
              :
              <Image src={require('@/public/icons/life-buoy-icon-black.svg').default} alt='mySvgImage' className='h-5.5 w-5' />
              }
              Help Center
            </Link>
          </div>
        </div>
        
      </>
  );
}
