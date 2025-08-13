"use client";
'use strict';

import { Button, Checkbox, Label, Modal } from "flowbite-react";
import { XCircleIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/hooks/useStorage';
import { useRouter } from 'next/router';

export default function ConsentModal() {

  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [requiredMessage, setRequiredMessage] = useState('');

  // consent info saved in the local storage as of now, as a proof of concept, will get changed once the server is ready
  const [userInfoConsent, setUserInfoConsent] = useLocalStorage('userInfoConsent', null);
  
  // Display consent modal if user has not given consent
  useEffect(() => {
    if (!userInfoConsent) {
      setOpenModal(true);
    }
  }, [userInfoConsent]);

  const handleAccept = () => {
    // Requirements:
    // Once a user accepts a consent form, store the following items:
      // The items a user consents to have collected.
      // The user's language preference and the version number of the Privacy Notice.
      // The proof of the user's identity and authentication.
      // The date and time of consent.
    // consentDate can be used to send consent data to the server to use later on, 
    // it is currently saved in the local storage, as a proof of concept
    const consentData = {
      date: new Date().toISOString(),
      language: navigator.language,
      version: '1.0',
      items: ['individually identifiable information', 'social security numbers', 'user location']
    }

    setUserInfoConsent({ consentGiven: true, consentData });
    setOpenModal(false);
  }

  const handleDecline = () => {
    if (!isChecked) {
      setRequiredMessage('Please accept the terms');
      return;
    }
    setRequiredMessage('Please accept the terms to continue');
    setUserInfoConsent(null);
  }

  return (
    <Modal show={openModal} size="xl" onClose={() => {}} popup>
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 mt-5 text-xl font-normal dark:text-gray-400">
            We Value Your Privacy
          </h3>
          <p className="mb-5 text-sm text-left text-gray-500 dark:text-gray-400">
            Please provide your consent to allow us to collect your personal information for the following purposes:
          </p>
          <ul className="mb-5 text-sm text-left text-gray-500 dark:text-gray-400 list-disc list-inside">
            <li>Individually identifiable information</li>
            <li>Social security numbers</li>
            <li>User location</li>
          </ul>
          <div className="mb-5">
            <Label>
              <Checkbox required={true} onChange={() => setIsChecked(true)}/>
              <span className="ml-2" >
                I have read and agree to the <a href="/#" className="text-blue-500" title={"This Privacy Policy is not yet developed."}>Privacy Policy</a>
              </span>
            </Label>
          </div>
          <div className="flex justify-center gap-4">
            <Button color="light" onClick={() => handleAccept()} disabled={!isChecked}>
              Accept
            </Button>
            <Button color="failure" onClick={() => handleDecline()}>
              Decline
            </Button>
          </div>
        </div>
        {requiredMessage && (
          <div className='flex flex-row p-1 text-red text-sm'>
            <XCircleIcon className='h-5 mr-2 font-green' />
            {requiredMessage}
          </div>
        )}
      </Modal.Body>
    </Modal>
  )
}