'use strict';

import { DocumentTextIcon, ExternalLinkIcon} from "@heroicons/react/outline";
import Button from "@/components/Button";
import DefaultLayoutAI from "@/components/layouts/DefaultLayoutAI";
import GraySecondaryButton from "@/components/GraySecondaryButton";
import HelpImage from '@/public/HelpImage.png'
import Image from 'next/image';

export default function Docs() {
  return (
    <DefaultLayoutAI>
      <div className="bg-white rounded-md"> 
      
      <div className='mt-10 pb-8 p-5'>
        <h1 className='mb-2 text-2xl font-semibold'>Help Center</h1>
        <p> All links open a new window to the MMT help center in a new window.</p>

      </div>

      <div className='flex flex-col justify-center items-center gap-5 bg-light-purple p-4 py-8 px-32'>
        
        <Image src={require('@/public/icons/life-buoy-icon.svg').default} alt='mySvgImage' />

        <h1 className='mb-2 text-xl font-semibold'>Need Help? Create a Support Request.</h1>
        <div className='flex justify-center items-center text-center'>If you need help resolving an issue or have a specific request, submitting a support ticket is the best way to get direct, personalized assistance. Our support team will review your ticket, track the issue, and respond as quickly as possible.</div>

        <Button onClick={() => {window.open("https://dantes.zendesk.com/hc/en-us/requests/new", "DantesZendesk", "noopener");}} id={"request"} testid={"request"} >
          <div className="flex flex-row gap-2">
            Submit a Request 
            <ExternalLinkIcon className="h-5"/>
            </div>
        </Button>
          
      </div>

      {/* <div className='flex flex-row mt-10 mx-6 rounded-md border border-grey-200 shadow-sm'>
          <div className="w-1/2 p-4 mr-14">
            <h1 className='mb-2 text-xl font-semibold'>Frequently Asked Questions</h1>
            <p>Resources to help service members navigate testing, college planning, academic support, credit transfers, and funding options for their education and career goals.</p>
            <div className="flex pt-4 justify-end">
              <GraySecondaryButton buttonLabel={"View FAQs"} handleClick={()=>{window.open('https://dantes.zendesk.com/hc/en-us', "DantesZendesk", "noopener")}}> 
                <ExternalLinkIcon className="h-5"/>
              </GraySecondaryButton>
            </div>
          </div>

          <Image src={HelpImage} alt='' className="flex justify-end rounded-r rounded-md" />
      </div> */}

      </div>
    </DefaultLayoutAI>
  );
}
