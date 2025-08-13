'use strict';

import { downloadTranscript, useTranscript } from '@/hooks/useTranscript';
import { getFormatDaysFromToday } from '@/utils/getDaysFromToday';
import { useAdditionalLearningUpdates } from '@/hooks/useAdditionalLearningUpdates';
import { useAuth } from '@/contexts/AuthContext';
import { useCourseUpdates } from '@/hooks/useCourseUpdates';
import { useOccupationUpdates } from '@/hooks/useOccupationUpdates';
import { useRouter } from 'next/router';
import { useTranscriptStatus } from '@/hooks/useTranscriptStatus';
import Announcements from '@/components/Announcements';
import Button from '@/components/Button';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import ExclamationToast from '@/components/ExclamationToast';
import GraySecondaryButton from '@/components/GraySecondaryButton';
import Head from 'next/head'
import Image from 'next/image';
import MyUpdatesSections from '@/components/MyUpdatesSections';
import React, { useEffect, useState } from 'react';
import SecondaryButton from '@/components/SecondaryButton';
import headerImage from '@/public/HomePageImage.jpg';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const [exclamationToast, setExclamationToast] = useState(false);

  const { data:transcriptData } = useTranscript();
  const { data:transcriptStatusData } = useTranscriptStatus();
  const { data:courseUpdatesData } = useCourseUpdates();
  const { data:occupationUpdatesData } = useOccupationUpdates();
  const { data:additionalLearningData } = useAdditionalLearningUpdates();

  const transcriptId = transcriptData?.[0]?.id ?? null;

  const data = [
    {date:"January 30, 2025", time: "12:44 PM EST", announcement: "ARMY, NAVY, MARINE CORPS, SPACE FORCE: All veterans, active duty, National Guard Personnel should use the Joint Services Transcript (JST).", type: "dismiss"},
    {date:"July 23, 2025", time: "9:00 AM EST", announcement: "This tool is currently being piloted to select service members for the US Coast Guard. If you're accessing the MMT from another Service, you may not see any records — this is expected throughout the duration of the pilot effort. We appreciate your understanding as we continue to expand access.", type: "dismiss"}
  ];
  
  const [mockData, setMockData] = useState(data);

  const handleTranscript = transcriptAction => {
    if (transcriptId) {
      switch(transcriptAction) {
        case 'downloadModernized':
          downloadTranscript(transcriptId, user?.last_name);
          break;
        default:
          break
      }
      setExclamationToast(false);
    } else {
      setExclamationToast(true);
      setTimeout(() => setExclamationToast(false), 5000);
    }
  }

  const handleDownloadTranscript = () => handleTranscript('downloadModernized');

  // Check if user has given consent already, checking local storage as of now as a proof of concept
  useEffect(() => {
    if (localStorage.getItem('userInfoConsent')) {
      const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' } );
      const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'});
      const consentAnnouncement = {
        date: date,
        time: time,
        announcement: (
          <span> You have given consent to use your data. If you would like to make some changes to the consent, please{' '}
            <span className='text-blue-500 cursor-pointer' role="button" tabIndex={0} onClick={() => {
              localStorage.removeItem('userInfoConsent');
              window.location.reload();
            }}
            onKeyDown={() => {}}
            >Click Here</span>
          </span>
        ),
        type: "persist"
      };

      // setMockData(prevData => [consentAnnouncement, ...prevData]);
    }
  }, []);

  return (
    <div>
      <div className='flex w-full bg-accent-yellow-minimal h-20'>
        <div className='flex flex-row w-full mx-24 my-3 border border-white shadow-md items-center'>
          <Image src={require('@/public/icons/Union.svg').default} alt='mySvgImage' className='ml-4 p-1 h-7 w-7 bg-accent-yellow-light' />
          <p className='p-5 pr-16 text-sm text-gray-primary'>This tool is currently being piloted to select servicemembers for the US Coast Guard. If you&apos;re accessing the MMT from another service, you may not see any records — this is expected throughout the duration of the pilot effort. We appreciate your understanding as we continue to expand access.</p>
        </div>
      </div>
      <DefaultLayout>
        <Head>
          <title>MMT</title>
          <link rel="icon" href="/logo.png" />
        </Head>


        <div className='flex flex-col mt-8'>
          <div className='py-4 text-xl font-bold'>Welcome{user && user.rank ? <>, {user.rank}, </> : <></>}
            {user ? <> {user.first_name} {user.last_name}!</> : <>!</>}
          </div>
          <div className='mb-5 '><Announcements content={mockData}/></div>

          <div className='bg-white shadow-md'>

            <div className='flex flex-row justify-between'>
              <div className='w-1/2 m-5'> 
                <div className='pt-2 text-xl font-bold'>MMT Portal </div>
                <div className='pt-2 text-gray-600'>
                  The MMT Portal gives service members the ability to view past and current transcript requests and manage visibility into those records. You can see who is asking for your data and control access and visibility, track the progress of your transcript from request, to delivery, and see when the recipient downloads your transcript. 
                </div>
                <div className='pt-12 flex flex-row'>
                  <div>
                    <Button onClick={()=>{router.push("/modernMilitaryTranscript")}}>
                      <div className='flex flex-row gap-2 w-full'> <p className='pt-0.5'>View Tracking Status</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                      </div>
                    </Button>
                  </div>
                  
                  {/* <SecondaryButton tooltip={"This page is not yet developed."}>
                    <div className='flex flex-row gap-2'>
                      FAQs
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                      </svg>
                    </div>
                  </SecondaryButton> */}
                </div>
              </div>
              <div className='max-h-36'>
                <Image src={headerImage} height={150} alt='' className='rounded-lg m-5 max-w-1/2'/>
              </div>
            </div>
          </div>

          <div className='bg-white border rounded-md border-gray-200 p-4 shadow-lg focus:shadow-lg px-5 my-8 mr-4'>
            <h1 className='flex text-xl font-semibold h-6 mb-2'>
            What is Modernized Military Transcript (MMT)?
            </h1>
            <div className='pt-2 text-gray-600 pb-5'>
            The Modernized Military Transcript helps educators understand and more holistically capture a service member’s military learning, work experience, competencies, academic and professional development achievements.
            </div>
            <div className='flex align-bottom items-bottom mt-4 gap-5'>
              <GraySecondaryButton buttonLabel={"Download Unofficial Transcript (PDF)"} handleClick={handleDownloadTranscript} 
              icon={<>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg> </>} />
              <GraySecondaryButton buttonLabel={"Share Official Transcript"} handleClick={()=>{router.push("/modernMilitaryTranscript")}}
              icon={<>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg> </>}/>

              <GraySecondaryButton buttonLabel={"Update/Correct Transcript"} handleClick={()=>{window.open('https://dantes.zendesk.com/hc/en-us/requests/new', "DantesZendesk", "noopener")}} 
              icon={<>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg> </>}/>
            </div>
            {exclamationToast && 
              <div className='pt-6'>
                <ExclamationToast message="No transcript found" />
              </div>
            }
          </div>

          <div className='bg-white border rounded-md border-gray-200 p-4 shadow-lg focus:shadow-lg px-5mr-4 mb-8'>
            <h1 className='flex text-xl font-semibold h-6 mb-3'>
              My Updates
            </h1>
            <div>
            {transcriptStatusData?.length > 0 && (
                <>
                  <div className='text-lg font-bold py-2'>Transcript Submission</div>
                  <div className='flex flex-col gap-5'>
                    {transcriptStatusData.map((transcriptStatus, i) => (
                      <MyUpdatesSections 
                        key={transcriptStatus?.created}
                        title={transcriptStatus?.academic_institute || 'N/A'}
                        badgelabel={transcriptStatus?.status || 'N/A'}
                        sentDate={getFormatDaysFromToday(transcriptStatus?.created)}
                        date={new Date(transcriptStatus?.created).toLocaleDateString() || 'N/A'}
                        icon={
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                        }
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {courseUpdatesData?.length > 0 && (
            <div>
              <div className='text-lg font-bold py-2 pt-6'>Military Courses</div>
              <div className='flex flex-col gap-5'>
                {courseUpdatesData.map((course, i) => (
                  <MyUpdatesSections key={course?.created} title={course.course} description={course.location} badgelabel={"New"} sentDate={`Added ${course.created.split('T')[0]}`} date={`${course.start_date} - ${course.end_date || "Present"}`}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>} />
                ))}
              </div>
            </div>
            )}

            {occupationUpdatesData?.length > 0 && (
            <div>
              <div className='text-lg font-bold py-2 pt-6'>Operational Experiences</div>
              <div className='flex flex-col gap-5'>
                {occupationUpdatesData.map((occupation, i) => (
                  <MyUpdatesSections key={occupation?.created} title={occupation.course} description={occupation.location} badgelabel={"Latest"} sentDate={`Added ${occupation.created.split('T')[0]}`} date={`${occupation.start_date} - ${occupation.end_date || "Present"}`}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>} />
                ))}
              </div>
            </div>
            )}

            {additionalLearningData?.length > 0 && (
            <div>
              <div className='text-lg font-bold py-2 pt-6'>Additional Learning</div>
              <div className='flex flex-col gap-5'>
                {additionalLearningData.map((course, i) => (
                  <MyUpdatesSections key={course?.created} title={course.course} description={course.location} badgelabel={"New"} sentDate={`Added ${course.created.split('T')[0]}`} date={`${course.start_date} - ${course.end_date || "Present"}`}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>} />
                ))}
              </div>
            </div>
            )}

          </div>
        </div>
        {/* <Footer /> */}
      </DefaultLayout>
    </div>
  );
  
}
