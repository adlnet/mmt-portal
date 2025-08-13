'use strict';

import { Label, Radio } from 'flowbite-react';
import { TranscriptTrackingTable } from '@/components/TranscriptTrackingTable';
import { downloadTranscript, openTranscript, useTranscript } from '@/hooks/useTranscript';
import { downloadTranscriptLegacy, openTranscriptLegacy } from '@/hooks/useTranscriptLegacy';
import { useAuth } from '@/contexts/AuthContext';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import ExclamationToast from '@/components/ExclamationToast';
import GraySecondaryButton from '@/components/GraySecondaryButton';
import Head from 'next/head'
import React, { useState } from 'react';
import ShareTranscriptModal from '@/components/modals/ShareTranscriptModal';

export default function ModernMilitaryTranscript() {
  const { user } = useAuth();

  const [openModal, setOpenModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const [isLegacy, setIsLegacy] = useState(false);
  const [exclamationToast, setExclamationToast] = useState(false);

  const { data:transcriptData } = useTranscript();
  const transcriptId = transcriptData?.[0]?.id ?? null;

  const handleTranscript = transcriptAction => {
    if (transcriptId) {
      switch(transcriptAction) {
        case 'viewModernized':
          openTranscript(transcriptId);
          break;
        case 'downloadModernized':
          downloadTranscript(transcriptId, user?.last_name);
          break;
        case 'viewLegacy':
          openTranscriptLegacy(transcriptId);
          break;
        case 'downloadLegacy':
          downloadTranscriptLegacy(transcriptId, user?.last_name);
          break;
        default:
          break
      }
      setExclamationToast(false);
    } else {
      setExclamationToast(true);

      // Hide the wanring toast after 5 secs
      setTimeout(() => setExclamationToast(false), 5000);
    }
  }

  const handleViewTranscript = () => handleTranscript('viewModernized');
  const handleDownloadTranscript = () => handleTranscript('downloadModernized');
  const handleViewLegacyTranscript = () => handleTranscript('viewLegacy');
  const handleDownloadLegacyTranscript = () => handleTranscript('downloadLegacy');

  return (
    <DefaultLayout>
      <Head>
        <title>MMT</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className='flex flex-col mt-8'>
        <div className='py-4 text-xl font-bold'>Modernized Military Transcript </div>
        <div className='bg-white shadow-md'>

          <div className='flex flex-row justify-between'>
            <div className='m-5'> 
              <div className='pt-2 text-xl font-bold'>Transcript </div>
              <div className='pt-6 flex flex-row gap-5'>
                <div className=''>Format </div>
                <div className="flex items-center gap-2">
                    <Radio 
                      id="modernized" 
                      name="transcriptType"
                      value="Modernized"
                      defaultChecked
                      onChange={() => setIsLegacy(false)}
                    />
                    <Label htmlFor="modernized">Modernized</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Radio 
                      id="legacy"
                      name="transcriptType"
                      value="Legacy"
                      onChange={() => setIsLegacy(true)}
                      />
                    <Label htmlFor="legacy">Legacy</Label>
                </div>
              </div>
              <div className='pt-6 flex flex-row gap-5'>

              {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}

                
                
                <ShareTranscriptModal openModal={openModal} setOpenModal={setOpenModal} confirmModal={confirmModal} setConfirmModal={setConfirmModal} />

                <GraySecondaryButton buttonLabel={"View Transcript"} handleClick={isLegacy ? handleViewLegacyTranscript : handleViewTranscript}
                icon={<>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg> </>} />
                <GraySecondaryButton buttonLabel={"Download Transcript (PDF)"} handleClick={isLegacy ? handleDownloadLegacyTranscript : handleDownloadTranscript}
                icon={<>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg> </>} />
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

          </div>
        </div>

        <div className='bg-white border rounded-md border-gray-200 p-4 shadow-lg focus:shadow-lg px-5 my-8 mr-4'>
          <h1 className='flex text-xl font-semibold h-6 mb-6'>
            Tracking Status
          </h1>
          <TranscriptTrackingTable />

        </div>
      </div>
    </DefaultLayout>
  );
  
}
