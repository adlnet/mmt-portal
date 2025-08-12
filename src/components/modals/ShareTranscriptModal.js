'use strict';
import { Autocomplete } from '@mui/material';
import { Checkbox, Label, Modal } from 'flowbite-react';
import { TrashIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import { axiosInstance } from '@/config/axiosConfig';
import { transcriptStatus } from '@/config/endpoints';
import { useAcademicInstitute } from '@/hooks/useAcademicInstitute';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import Button from '@/components/Button';
import GraySecondaryButton from '@/components/GraySecondaryButton';
import TextField from '@mui/material/TextField';


export default function ShareTranscriptModal({ openModal, setOpenModal, confirmModal, setConfirmModal }) {

  const router = useRouter();

  const { data:aIData } = useAcademicInstitute();
  const [instituteArray, setInstituteArray] = useState([{}]);
  const [isAccepted, setIsAccepted] = useState(false);
  const [requiredMessage, setRequiredMessage] = useState('');
  const institutions = [];

  aIData?.map((school, i) => {
    const obj = {"label": school?.institute, "id":school?.id}
    institutions.push(obj)
  })

  const handleShare = () => {

    if (!instituteArray[0].label && !isAccepted) {
      setRequiredMessage('Please select an institution and accept the terms');
      return;
    }

    else if (!instituteArray[0].label) {
      setRequiredMessage('Please select an institution');
      return;
    }

    else if (instituteArray.map((institute) => (Object.keys(institute).length === 0) ? false : true ).includes(false)) {
      setRequiredMessage('Please select an institution for every dropdown or delete dropdown');
      return;
    }

    else if (!isAccepted) {
      setRequiredMessage('Please accept the terms');
      return;
    }
    
    instituteArray?.map((institute,i) =>{
      if (institute) {
        axiosInstance.post(transcriptStatus, 
          {
            "academic_institute": institute.id,
          }).then(resp => {
            console.log("response", resp);
          }).catch((err) => {
            console.log("Error loading academic institutes");
          });
        setOpenModal(false);
        setConfirmModal(true);
        setRequiredMessage(null);
        setIsAccepted(false);
        setInstituteArray([{}]);
      }
    })
  }

  const handleAddDelete = (flag, counter) =>{
    if (flag === "add"){
      setInstituteArray([...instituteArray, {}]);
    }
    if (flag === "delete"){
      const newItems = [...instituteArray];
      newItems.splice(counter, 1);
      setInstituteArray(newItems);
    }
  }

  const onTextChange = (newValue, counter) => {
    if (newValue === null) {
      newValue = {}
    }
    setInstituteArray(instituteArray.map((institute, i) =>
        i === counter ? newValue  : institute
    ))
  }

  const InstitutionSearchBox = [];
  
  instituteArray.map((institute, index) => {
    InstitutionSearchBox.push(
        <div className='flex flex row'>
          <Autocomplete
            disablePortal
            value={institute?.label || null}
            options={institutions}
            sx={{ width: 350 }}
            onChange={(event, newValue) => {
              onTextChange( newValue, index);
            }}
            renderInput={(params) => <TextField {...params} data-testid='autocomplete-input' label="Select an Institution"/>}
          />
          <button 
              className='pl-4 text-purple whitespace-nowrap hover:text-blue-700 hover:underline disabled:text-[#D6D2DB] disabled:no-underline disabled:hover:text-[#D6D2DB]'
              data-testid={"delete-button"+index}
              disabled={instituteArray.length===1}
              onClick={() => handleAddDelete("delete", index)}
          >
            <TrashIcon className='h-7'/> 
          </button>
        </div>
      );   
  })

  useEffect(() => {
      instituteArray.map((institute, index) => {
        if(institutions.some(institution => institution.id === institute.id)){
          let index = institutions.findIndex(institution => institution.id === institute.id);
          institutions.splice(index, 1);
        }
      })
  }, [instituteArray]);

  return (
    <>
      <GraySecondaryButton handleClick={() => setOpenModal(true)} buttonLabel={"Share Official Transcript"} route={"/"} 
        icon={<>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
      </svg></>} />

      <Modal show={openModal} size="lg" position="center" onClose={() => {setOpenModal(false); setRequiredMessage(null)}}>
          <Modal.Header>Share Transcript</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Who do you want to share with?
              </p>
              <div className='flex flex-row gap-1'>
                  {/* <div className="flex items-center gap-2">
                      <Radio id="AI" name="sendType" value="AI" defaultChecked />
                      <Label htmlFor="AI">Academic Institutions</Label>
                  </div> */}
                  {/* <div className="flex items-center gap-2">
                      <Radio id="ESO" name="sendType" value="ESO" />
                      <Label htmlFor="ESO">Educational Service Officers (ESOs)/Counselors</Label>
                  </div> */}
              </div>
              {InstitutionSearchBox}
              <button 
                  className='text-purple whitespace-nowrap hover:text-blue-700 hover:underline disabled:text-[#D6D2DB] disabled:no-underline disabled:hover:text-[#D6D2DB]'
                  onClick={()=> handleAddDelete("add")}
                  disabled={instituteArray.length>4}
              >
                  + Add Another Institution
              </button>
              {instituteArray.length>4 && <div className='text-sm text-red'>You have reached the max number of institutions you can send to at once. Please send these, then go back and add more. </div>}
              <div className="flex items-center gap-2">
                <Checkbox id="accept" checked={isAccepted} onChange={e => setIsAccepted(e.target.checked)}/>
                <Label htmlFor="accept">I authorize institutions named in this request to access my official military transcript and Personally Identifying Information (PII) </Label>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <Button 
                className='w-full' 
                onClick={handleShare}
                testid={"share-button"}
              >
                Share Transcript
              </Button>
              {requiredMessage && (
                <div className='flex flex-row p-1 text-red text-sm'>
                  <XCircleIcon className='h-5 mr-2 font-green' />
                  {requiredMessage}
                </div>
              )}
          </div>
          </Modal.Footer>
      </Modal>

      <Modal show={confirmModal} size="md" position="center" onClose={() => setConfirmModal(false)}>
          <Modal.Header>Share Transcript</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className='font-bold'>Your transcript(s) have been successfully delivered! </p>
              <p className=''>
                You can track the transcript status on the 
                <button
                  onClick={() => {
                    router.push('/modernMilitaryTranscript').then(() => {
                      window.location.reload();
                    });
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      router.push('/modernMilitaryTranscript').then(() => {
                        window.location.reload();
                      });
                    }
                  }}
                  className='text-purple cursor-pointer'
                >
                Military Transcript
                </button>
                .
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
          
          <Button className='w-full' onClick={() => { setOpenModal(false); setConfirmModal(false) }}>Close</Button>

          </Modal.Footer>
      </Modal>
    </>
  );
}