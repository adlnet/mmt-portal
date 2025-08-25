'use strict';

import { Badge, Checkbox, Dropdown, Label, Modal, Radio, Tabs } from "flowbite-react";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import { NewTranscriptTable } from '@/components/NewTranscriptTable';
import { academicInstitute, academicInstituteUsers, transcriptStatus } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { useAITableSearch } from '@/hooks/useAITableSearch';
import { useAuth } from "@/contexts/AuthContext";
import { useTranscriptStatus } from '@/hooks/useTranscriptStatus';
import Button from '@/components/Button';
import DefaultLayoutAI from '@/components/layouts/DefaultLayoutAI';
import GraySecondaryButton from '@/components/GraySecondaryButton';
import Head from 'next/head'
import InputField from '@/components/InputField';
import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import useField  from '@/hooks/useField';

export default function ModernMilitaryTranscriptAIPage() {

  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [displayContent, setDisplayContent] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [ssn, setSsn] = useState('');
  const [filling, setFilling] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [apiErrorMsg, setApiErrorMsg] = useState(false);
  const [confirmBox, setconfirmBox] = useState(false);
  const [AIId, setAIId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [transcriptStatusFilters, setTranscriptStatusFilters] = useState({
    status: '',
    branch: '',
    recent: false
  });
  
  const { fields, updateKeyValuePair, resetKey } = useField({
    keyword: '',
    p: 1,
  });

  const { data } = useTranscriptStatus(transcriptStatusFilters);

  const transcript = useMemo(() => 
    data ? data?.filter(item => item.status !== 'Delivered' && item.status !== 'Pending') : null
  , [data]);
  
  const newTranscript = useMemo(() => 
    data ? data?.filter(item => item.status === 'Delivered' || item.status === 'Pending') : null
  , [data]);

  const { handleSearch, handleSearchReset, filteredData } = useAITableSearch(newTranscript, transcript);

  const handleChange = (event) => {
    updateKeyValuePair(event.target.name, event.target.value);
  };

  const handleResetSearch = () => {
    resetKey('keyword');
    handleSearchReset();
  };

  // Dynamically update the filter options when the user selects a filter option
  const handleFiltersChange = (filterOptionKey, filterOptionVal) => {
    setTranscriptStatusFilters(prev => ({
      ...prev,
      [filterOptionKey]: filterOptionVal
    }));
  };

  const renderCorrectMessage = () => {
    if (displayContent && !apiErrorMsg){
      return (
        <div className='flex flex-row mt-2 text-green-600'>
          <CheckCircleIcon className='h-5 mt-1 mr-2' />
          Your transcript request have been successfully delivered!
        </div>
      )
    }else if (errorMsg) {
      return (
        <div className='flex flex-row mt-2 pr-5 text-red-800'>
          <XCircleIcon className='h-14 mt-0.5 mr-2 font-green' />
          Fill out the required Social Security Number. 
          It has be to exactly 9 digits with no spaces and no letters.
        </div>
      )
    }else if (apiErrorMsg) {
      return (
        <div className='flex flex-row mt-2 pr-5 text-red-800'>
          <XCircleIcon className='h-14 mt-0.5 mr-2 font-green' />
          The SSN you entered does not match any service members in our records. 
          Please confirm the information and resubmit the request.
        </div>
      )
    }    
  };

  const clearFields = () => {
    setFirstName('')
    setLastName('')
    setSsn('')
  };

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

  // Modal
  return (
    <DefaultLayoutAI>
      <Head>
        <title>MMT</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className='flex flex-col mt-8'>
        <div className='flex justify-between py-4 text-xl font-bold'>
          <div>
            Welcome{user && user.position ? <>, {user.position}, </> : <></>}
            {user ? <> {user.first_name} {user.last_name}!</> : <>!</>}
          </div>
          <div className="p-0.5 mb-2 text-xs font-medium ">
            <GraySecondaryButton handleClick={() => setOpenModal(true)} buttonLabel={"Request Military Transcript"} route={"/"} testid={"requestmilitaryTranscript"}/>
            {openModal && <div 
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                onClick={openModal}
                onKeyDown={openModal}
                role='presentation'
              ></div>}

            <Modal show={openModal} size="md" position="center" onClose={() => {setOpenModal(false); setDisplayContent(false); setErrorMsg(false); clearFields()}} >
              <Modal.Header>Request Military Transcript</Modal.Header>
              <Modal.Body>
                <div className="space-y-6 py-3">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Insert the first and last name, date of birth, and the 9 digit SSN of the Service Member to request their transcript. 
                  </p>
                  <p className="text-base leading-relaxed text-red-500 dark:text-gray-400">
                      * = Required   
                  </p>
                  {filling && (
                    <div className="p-2 bg-blue-100  rounded-md">
                      Just in time reminder: The <strong>{filling}</strong> will be processed 
                    </div>
                  )}
                  <div className='flex flex-col gap-4'>
                    <div className="flex items-center gap-2">
                      {/* <Radio id="AI" name="sendType" value="AI" defaultChecked /> */}
                      <Label htmlFor="Fname" className='w-1/3'>First Name</Label>
                      <InputField placeholder='First Name' value={firstName} onChange={(event) => setFirstName(event.target.value)} onFocus={() => setFilling("First Name")}  onBlur={() => setFilling('')} required={true}/>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="Lname" className='w-1/3'>Last Name</Label>
                      <InputField placeholder='Last Name' value={lastName} onChange={(event) => setLastName(event.target.value)}  onFocus={() => setFilling("Last Name")}  onBlur={() => setFilling('')} />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="SSN" >SSN<span className="ml-1 text-base leading-relaxed text-red-500 dark:text-gray-400">*</span></Label>
                      <div className='w-1/3 ml-4 appearance-none'> <InputField value={ssn} onChange={(event) => setSsn(event.target.value)} placeholder={"#########"} onFocus={() => setFilling("SSN")} type="text" maxLength="9" onBlur={() => setFilling('')} required={true}/></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox data-testid="checkAccept" id="accept" />
                    <Label htmlFor="accept"> By clicking Request Military Transcript, you confirm that the Service Member(s) have granted their permission(s) for the institution to access their transcript(s) and their PII. </Label>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className='flex flex-col pb-8'>

                {/* <Button className='w-full' onClick={() => { setOpenModal(false); setConfirmModal(true) }}>Request Military Transcript</Button> */}
                <Button className='w-full' testid="requestTranscriptButton" onClick={() => { 

                    clearFields();  
                    let isNum = /^\d+$/.test(ssn);
                    let acceptPermissionsBox = document.getElementById("accept");

                    if(acceptPermissionsBox.checked){
                      setconfirmBox(true)
                      setErrorMsg(false)
                    } else {
                      setconfirmBox(false)
                      setErrorMsg(true);
                    }

                    if (!ssn || ssn.length !== 9 || !isNum) {
                      setDisplayContent(false);
                      setErrorMsg(true);
                      return;
                    }


                    // API Call 
                    axiosInstance.post(transcriptStatus, 
                    {
                      "ssn": ssn,
                      "academic_institute": AIId,
                    }).then(resp => {
                      console.log("response", resp);
                    }).catch((err) => {
                      console.log("Error creating transcript status");
                      setApiErrorMsg(true);
                    });

                    //clearing variables
                    setDisplayContent(true); 
                    acceptPermissionsBox.checked = false;
                  }}>Request Military Transcript</Button>
                  {!confirmBox ? ( errorMsg &&
                      <div className='flex flex-row mt-2 pr-5 text-red-800'>
                        <XCircleIcon className='h-14 mt-0.5 mr-2 font-green' />
                        Confirm by clicking the checkbox that you have been granted the necessary permissions by service member before proceeding. 
                      </div>
                    ):(
                      renderCorrectMessage()
                    )
                  }
              </Modal.Footer>
            </Modal>

          </div>
        </div>

        <div className='rounded-md p-4 shadow-lg focus:shadow-lg px-5 my-4 mr-4 bg-white'>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className='flex items-center gap-4'>
            <div className="flex-grow w-[22rem] xl:w-[34rem]">
              <SearchBar
                parameters={fields}
                onReset={handleResetSearch}
                onClick={() => {
                  handleSearch(fields.keyword)
                  setCurrentPage(1)
                }} 
                onChange={handleChange}
              />
            </div>
            
            </div>
          </div>
          <Tabs aria-label="Tabs with underline" variant="underline">
            <Tabs.Item active title={
              <div className="flex items-center">
                New Transcripts
                <Badge color="purple" className="ml-2 rounded-md">
                  {filteredData.oneGroup?.length || 0}
                </Badge>
              </div>
            }>
              {filteredData.oneGroup 
                ? <NewTranscriptTable 
                    data={filteredData.oneGroup}
                    transcriptStatusFilters={transcriptStatusFilters}
                    onFiltersChange={handleFiltersChange}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  /> : <>No Data to display at this time.</> }
            </Tabs.Item>
            <Tabs.Item title={
              <div className="flex items-center">
                Completed Transcripts
                <Badge color="purple" className="ml-2">
                  {filteredData.all?.length || 0}
                </Badge>
              </div>
            }>
              {filteredData.all 
                ? <NewTranscriptTable
                    data={filteredData.all}
                    transcriptStatusFilters={transcriptStatusFilters}
                    onFiltersChange={handleFiltersChange}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  /> : <>No Data to display at this time.</> }
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
    </DefaultLayoutAI>
  );

}
