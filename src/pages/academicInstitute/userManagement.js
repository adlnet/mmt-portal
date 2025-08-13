'use strict';

import { Badge, Tabs } from "flowbite-react";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import { Label, Modal } from "flowbite-react";
import { PlusIcon } from '@heroicons/react/outline';
import { UsersTable } from '@/components/UsersTable';
import { academicInstituteUsers } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { useAITableSearch } from '@/hooks/useAITableSearch';
import Button from '@/components/Button';
import DefaultLayoutAI from '@/components/layouts/DefaultLayoutAI';
import Head from 'next/head'
import InputField from '@/components/InputField';
import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import useField from '@/hooks/useField';

export default function UserManagement() {

  const [openModal, setOpenModal] = useState(false);
  const [displayContent, setDisplayContent] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [users, setUsers] = useState(null);
  const [errorMsg, setErrorMsg] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { fields, updateKeyValuePair, resetKey } = useField({
    keyword: '',
    p: 1,
  });

  const handleChange = (event) => {
      updateKeyValuePair(event.target.name, event.target.value);
  };

  const handleResetSearch = () => {
    resetKey('keyword');
    handleSearchReset();
  };

  useEffect(() => {
    axiosInstance
    .get(academicInstituteUsers)
    .then(resp => {
        console.log("api data", resp.data.members);
        setUsers(resp.data[resp.data.length - 1]);
    })
    .catch((err) => {
        console.log('Error on fetching academic Institute Users data');
      });
  }, []);

  const adminUser = useMemo(() => 
    users ? users.administrators : null
  , [users]);
  
  const memberUser = useMemo(() => 
    users ? users.members : null
  , [users]);

  const { handleSearch, handleSearchReset, filteredData } = useAITableSearch(adminUser, memberUser);

  const clearFields = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setRole('') 
  };

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
            User Management
          </div>
        </div>

        <div className='rounded-md p-4 w-full mb-5 m-4 bg-white shadow-lg focus:shadow-lg px-5 my-4 mr-4 overflow-clip'>
          <div className="flex flex-row gap-2 justify-between items-center space-y-3 md:space-y-0 md:space-x-4 p-4">
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
              {/* <div className="font-semibold">Filters</div> */}
                <div id="actionsDropdown" className="hidden z-2 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                    <li>
                      <a rel="noopener noreferrer" href="/#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a rel="noopener noreferrer" href="/#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                  </div>
                </div>
              <div className='flex flex-col mt-0.5'>
                <div className="rounded-lg p-[0.06rem] bg-gradient-to-r from-purple to-blue-custom">
                  <button id="filterDropdownButton" title={"This functionality is not yet fully developed."} data-dropdown-toggle="filterDropdown" className=" dropdown-button h-[37x] flex items-center justify-center py-1.5 px-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                    Role
                    <svg className="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-2 overflow-hidden font-medium rounded-lg whitespace-nowrap">
                <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 font-medium text-purple ring-white outline-white focus:outline-none bg-white rounded-lg hover:bg-gray-100 hover:text-primary-700 dark:bg-gray-800 dark:text-gray-400  dark:hover:text-white dark:hover:bg-gray-700" type="button">
                  Clear Filters
                </button>
              </div>
            </div>

            <div className='flex justify-end'>
              <Button onClick={() => setOpenModal(true)} >
                <div className="flex flex-row ">
                  <PlusIcon className="h-5 mr-2" />
                  Add New User
                </div>
               </Button>
              {openModal && <div 
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                onClick={openModal}
                onKeyDown={openModal}
                role='presentation'
              ></div>}
              <Modal show={openModal} size="md" position="center" onClose={() => {setOpenModal(false); setDisplayContent(false); setErrorMsg(false); clearFields();}}>
                <Modal.Header>Add New User</Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Insert the first and last name, email, and role (optional) to add a user to have access to the system. 
                    </p>
                    <p className="text-base leading-relaxed text-red-500 dark:text-gray-400">
                      * = Required   
                    </p>
                    <div className='flex flex-col gap-4'>
                      <div className="flex items-center gap-2">
                        {/* <Radio id="AI" name="sendType" value="AI" defaultChecked /> */}
                        <Label htmlFor="Fname" className='w-1/3'>First Name</Label>
                        <InputField placeholder="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)} required={true}/>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* <Radio id="AI" name="sendType" value="AI" defaultChecked /> */}
                        <Label htmlFor="Lname" className='w-1/3'>Last Name</Label>
                        <InputField placeholder="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)}/>
                      </div><div className="flex items-center gap-2">
                        {/* <Radio id="AI" name="sendType" value="AI" defaultChecked /> */}
                        <Label htmlFor="Email" className='w-1/3'>Email<span className="ml-1 text-base leading-relaxed text-red-500 dark:text-gray-400">*</span></Label>
                        <InputField placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required={true}/>
                      </div><div className="flex items-center gap-2">
                        {/* <Radio id="AI" name="sendType" value="AI" defaultChecked /> */}
                        <Label htmlFor="Role" className='w-1/3'>Role</Label>
                        <InputField placeholder="Role" value={role} onChange={(event) => setRole(event.target.value)} />
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer className='flex flex-col'>
  
                  <Button className='w-full' onClick={(e) => { 
                    
                    let isValid = true;
                    const newErrors = {};

                    //setOpenModal(false); 
                    if (!email) {
                      setErrorMsg(true);
                      clearFields()
                      return;
                    }

                    // API Call 
                    axiosInstance.patch(academicInstituteUsers+`${users?.id}`, 
                    {"members":
                      [{
                        "email": email,
                        "first_name": firstName,
                        "last_name": lastName,
                        "position": role,
                      }]
                    }).then(resp => {
                      console.log("response", resp);
                    }).catch((err) => {
                      console.log('Error on adding new user');
                    });

                    //clear fields
                    setDisplayContent(true);
                    clearFields();             
                  }}>Add User</Button>
                  {displayContent ?
                    (
                      <div className='flex flex-row mt-2 pr-5 text-green-600'>
                        <CheckCircleIcon className='h-5 mt-0.5 mr-2 font-green' />
                        User added
                      </div>
                    ):(errorMsg &&
                      <div className='flex flex-row mt-2 pr-5 text-red-800'>
                        <XCircleIcon className='h-5 mt-0.5 mr-2 font-green' />
                        Please fill out the required Email field
                      </div>
                    )
                  }
              </Modal.Footer>
              </Modal>
            </div>

          </div>
          <Tabs aria-label="Tabs with underline" variant="underline">
            <Tabs.Item active title={
              <div className="flex items-center">
                Admin Users
                <Badge color="purple" className="ml-2 rounded-md">
                  {filteredData?.oneGroup?.length}
                </Badge>
              </div>
            }>
            {filteredData 
              && 
                <UsersTable 
                  data={filteredData?.oneGroup}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
              />}
            </Tabs.Item>
            <Tabs.Item title={
              <div className="flex items-center">
                All Users
                <Badge color="purple" className="ml-2">
                  {filteredData?.all?.length}
                </Badge>
              </div>
            }>
            
            {filteredData 
              && 
                <UsersTable
                  data={filteredData?.all}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />}
              
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
    </DefaultLayoutAI>
  );

}
