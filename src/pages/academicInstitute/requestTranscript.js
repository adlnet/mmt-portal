'use strict';
import { Badge, Checkbox, Dropdown, Label, Modal, Radio, Tabs } from "flowbite-react";
import { CheckCircleIcon, XCircleIcon, XIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/outline';
import { academicInstitute, academicInstituteUsers, transcriptStatus } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import Button from '@/components/Button';
import DefaultLayoutAI from "@/components/layouts/DefaultLayoutAI";
import InputField from '@/components/InputField';
import React, { useEffect, useMemo, useState } from 'react';

export default function RequestTranscript() {

  const [displayContent, setDisplayContent] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [confirmBox, setconfirmBox] = useState(false);
  const [apiErrorMsg, setApiErrorMsg] = useState(false);
  const [AIId, setAIId] = useState(null);

  const [individualArray, setIndividualArray] = useState([
    {firstName: '', lastName: '', dob: '', ssn: ''}
  ]);

  const handleChange = (index, field, value) => {
    const updatedArray = [...individualArray];
    updatedArray[index][field] = value;
    setIndividualArray(updatedArray);
  };

  const handleAddDelete = (flag, counter) =>{
    if (flag === "add"){
      setIndividualArray([...individualArray, { firstName: '', lastName: '', dob: '', ssn: '' }]);
    }
    if (flag === "delete"){
      const newItems = [...individualArray];
      newItems.splice(counter, 1);
      setIndividualArray(newItems);
    }
  }

  function getInputStyle(val){
    if (val === ''){
      return { backgroundColor: '#f0f0f0' };
    }else {
      return { backgroundColor: '#ffffff' };
    }
  }

  useEffect(() => {
    axiosInstance
    .get(academicInstituteUsers)
    .then(resp => {
        console.log("api data", resp.data.members);
        setAIId(resp.data[resp.data.length - 1].id);
    })
    .catch((err) => {
        console.log('Error on fetching academic Institute Users data');
      });
  }, []);

  const renderCorrectMessage = () => {
    if (displayContent && !apiErrorMsg){
      return (
        <div className='flex flex-row justify-between mt-2 pr-5 text-green-700 bg-green-50 p-4 rounded-md mt-4 mb-1'>
          <div className='flex flex-row'>
            <CheckCircleIcon className='h-5 mt-0.5 mr-2' />
            Your transcript request have been successfully delivered! 
          </div>
          <button onClick={ () =>{
              setDisplayContent(false)
            }
          }>
            <XIcon className='h-5 mt-0.5 ml-2'></XIcon>
          </button>
        </div>
      )
    }else if (errorMsg) {
      return (
        <div className='flex flex-row justify-between mt-2 pr-5 text-red-700 bg-red-50 p-4 rounded-md mt-4 mb-1'>
          <div className='flex flex-row'>
            <XCircleIcon className='h-5 mt-0.5 mr-2' />
              Fill out the required Social Security Numbers or remove rows. 
              It has be to exactly 9 digits with no spaces and no letters.  
          </div>
          <button onClick={ () =>{
              setErrorMsg(false)
            }
          }>
            <XIcon className='h-5 mt-0.5 ml-2'></XIcon>
          </button>
        </div>
      )
    }else if (apiErrorMsg) {
      return (
        <div className='flex flex-row justify-between mt-2 pr-5 text-red-700 bg-red-50 p-4 rounded-md mt-4 mb-1'>
          <div className='flex flex-row'>
            <XCircleIcon className='h-5 mt-0.5 mr-2' />
              One or more of the SSNs you entered does not match any service members in our records. 
              Please confirm the information and resubmit the request.
          </div>
          <button onClick={ () =>{
              setApiErrorMsg(false)
            }
          }>
            <XIcon className='h-5 mt-0.5 ml-2'></XIcon>
          </button>
        </div>
      )
    }  
  };

  const clearFields = () => {
    setIndividualArray([{firstName: '', lastName: '', dob: '', ssn: ''}])
  };

  const submitTranscriptRequests = async () => {
    const promises = individualArray.map((indv, idx) =>
      axiosInstance.post(transcriptStatus, {
        ssn: indv.ssn,
        academic_institute: AIId,
      })
      .then(resp => ({
        status: "fulfilled",
        index: idx,
        data: resp.data,
      }))
      .catch(err => ({
        status: "rejected",
        index: idx,
        error: err,
      }))
    );

    const results = await Promise.all(promises);

    // Check for errors
    const errors = results.filter(r => r.status === "rejected");
    if (errors.length > 0) {
      setApiErrorMsg(true);
      setDisplayContent(false);
    } else {
      // Clear fields and hide error messages if all calls are successful 
      setApiErrorMsg(false);
      setDisplayContent(true);
      setErrorMsg(false);
      clearFields();
      let acceptPermissionsBox = document.getElementById("accept");
      acceptPermissionsBox.checked = false;
    }
  };

  return (
    <DefaultLayoutAI>
      <div className="bg-white rounded-md">
        <div className='mt-10 pb-8 p-5'>
          <h1 className='mb-2 text-2xl font-semibold'>Request Military Transcript</h1>

          <p className="pt-6"> 
            Insert first and last name and 9 digit SSN of each service member to request their transcript.
          </p>

          {!confirmBox ? ( errorMsg &&
              <div className='flex flex-row justify-between mt-2 pr-5 text-red-700 bg-red-50 p-4 rounded-md mt-4 mb-1'>
                <div className='flex flex-row'>
                  <XCircleIcon className='h-5 mt-0.5 mr-2' />
                  Confirm by clicking the checkbox that you have been granted the necessary permissions by all service members before proceeding. 
                </div>
                <button onClick={ () =>{
                    setErrorMsg(false)
                  }
                }>
                  <XIcon className='h-5 mt-0.5 ml-2'></XIcon>
                </button>
              </div>
            ):(
              renderCorrectMessage()
            )
          }

          <p className="text-red-700 pt-5">
            * = Required   
          </p>

          {individualArray.map((individual, idx) => (
            <div>
              <div key={idx} className='flex flex-row gap-4 w-100 pt-4'>
                <div className="flex flex-col gap-2 w-2/5 h-26px">
                  <Label htmlFor="Fname" className='font-medium'>First Name</Label>
                  <InputField value={individual.firstName} style={getInputStyle(individual.firstName)} onChange={(event) => handleChange(idx, 'firstName', event.target.value)}/>
                </div>
                <div className="flex flex-col gap-2 w-2/5">
                  <Label htmlFor="Lname" className='font-medium'>Last Name</Label>
                  <InputField value={individual.lastName} style={getInputStyle(individual.lastName)} onChange={(event) => handleChange(idx, 'lastName', event.target.value)} />
                </div>
                <div className="flex flex-col gap-2 w-1/10">
                  <Label htmlFor="Dob" className='font-medium'>Date of Birth</Label>
                  <InputField value={individual.dob} style={getInputStyle(individual.dob)} type="date" onChange={(event) => handleChange(idx, 'dob', event.target.value)} />
                </div>
                <div className="flex flex-col gap-2 w-1/10">
                  <Label htmlFor="SSN" className="font-medium">SSN <span className="font-bold text-red-700"> * </span></Label>
                  <InputField value={individual.ssn} style={getInputStyle(individual.ssn)}onChange={(event) => handleChange(idx, 'ssn', event.target.value)} placeholder={"###-##-####"}  type="text" maxLength="9" required={true}/>
                </div>
                
                {individualArray.length >= 2 && 
                  <button 
                  className='pl-3 text-gray-700 whitespace-nowrap hover:text-blue-700 hover:underline disabled:text-[#D6D2DB] disabled:no-underline disabled:hover:text-[#D6D2DB]'
                  data-testid={"delete-button"+idx}
                  disabled={individualArray.length===1}
                  onClick={() => handleAddDelete("delete", idx)}
                  >
                    <TrashIcon className='h-7 mt-6'/> 
                  </button>
                }
              </div>
              <div className="w-100 pt-4 border-b"> </div>
            </div>
          ))}                  

          <button 
            className='pt-6 text-[#673E9B] whitespace-nowrap hover:text-blue-700 hover:underline disabled:text-[#D6D2DB] disabled:no-underline disabled:hover:text-[#D6D2DB]'
            onClick={()=> handleAddDelete("add")}
            disabled=""
          >
            + Add Another Individual
          </button>

          <div className="flex items-center gap-2 pt-8 pb-8">
            <Checkbox data-testid="checkAccept" id="accept" className="mr-1 bg-color-white"/>
            <Label htmlFor="accept" className="font-medium"> I confirm that the individuals names in this request have granted their permission for this institution to access their military transcript and Personally Identifying Information (PII). </Label>
          </div>

          <Button className="w-full" onClick={async () =>
            {
              console.log("Submit Pressed")
              let acceptPermissionsBox = document.getElementById("accept");
              
              if(acceptPermissionsBox.checked){
                setconfirmBox(true)
                setErrorMsg(false)
              } else {
                setconfirmBox(false)
                setErrorMsg(true);
              }

              const errors = individualArray.map((indv, idx) => {
                if (
                  !indv.ssn.trim() ||
                  indv.ssn.length !== 9 ||
                  !/^\d{9}$/.test(indv.ssn)
                ) {
                  return `Row ${idx + 1}: Please enter a valid 9-digit SSN.`;
                }
                return null;
              }).filter(Boolean);

              if (errors.length > 0 || !confirmBox) {
                setDisplayContent(false);
                setErrorMsg(true);
                return;
              }
              // Await the API calls
              await submitTranscriptRequests();
            }
          }>
            Submit Request
          </Button>

        </div>
      </div>
    </DefaultLayoutAI>
  )
}