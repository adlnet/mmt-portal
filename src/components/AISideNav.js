'use strict';

import {  } from "@heroicons/react/solid";
import { DocumentTextIcon, QuestionMarkCircleIcon, UserGroupIcon} from "@heroicons/react/outline";
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import headerImage from '@/public/DantesLogo.png';

export default function AcademicInstituteSideNav() {

    const router = useRouter();

    // Check if it is active path
    const isActivePath = path => router.pathname === path;
                  
    return (
      <>
        <div className="flex h-auto flex-col py-2 w-72 bg-white">
          
          <div className='flex flex-row'>
            <Image src={headerImage} height={80} alt='' className='rounded-lg m-4 md:w-16 lg:w-20 xl:w-36'/>
            <p className="pt-10 text-md md:text-xl lg:text-2xl font-bold"> MMT</p>
          </div>

          <div className='flex flex-col m-4 pl-2 gap-4' >
            <Link
              href="/academicInstitute"
              passHref
              rel="noopener noreferrer"
              className={`flex flex-row gap-4 hover:cursor hover:font-bold hover:underline ${isActivePath('/academicInstitute') ? 'font-bold text-purple bg-light-purple p-1 rounded-md' : ''}`}
            >
              <DocumentTextIcon className="h-5 flex-shrink-0 mt-2"/>
              Modernized Military Transcript 
            </Link>
            <Link
              href="/academicInstitute/userManagement"
              passHref
              rel="noopener noreferrer"
              className={`flex flex-row gap-4 hover:cursor hover:font-bold hover:underline ${isActivePath('/academicInstitute/userManagement') ? 'font-bold text-purple bg-light-purple p-1 rounded-md' : ''}`}
            >
              <UserGroupIcon className="h-5 mt-1"/>
              User Management
            </Link>
            <Link 
              href="/academicInstitute/helpCenter"
              passHref
              rel="noopener noreferrer"
              className={`flex flex-row gap-4 hover:cursor hover:font-bold hover:underline ${isActivePath('/academicInstitute/helpCenter') ? 'font-bold text-purple bg-light-purple p-1 rounded-md' : ''}`}
            >
              {isActivePath('/academicInstitute/helpCenter') ?
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
