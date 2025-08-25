"use client";
'use strict';

import { ArrowDownIcon, ChevronDownIcon, FolderDownloadIcon, TableIcon } from "@heroicons/react/solid";
import { Checkbox, Dropdown, DropdownItem } from 'flowbite-react';

import { downloadTranscript } from "@/hooks/useTranscript";
import { downloadTranscriptLegacy } from "@/hooks/useTranscriptLegacy";
import { exportToExcel } from "@/utils/exportToExcel";
import { getTranscriptStatusColor } from '@/utils/getTranscriptStatusColor';
import { useEffect, useMemo, useState } from "react";
import { useTranscriptStatus } from '@/hooks/useTranscriptStatus';
import Button from "./Button";
import GraySecondaryButton from "./GraySecondaryButton";
import Pagination from "./Pagination";


export const users = [];

export function NewTranscriptTable({ data, onFiltersChange, transcriptStatusFilters, currentPage, setCurrentPage }) {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postsPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);


    // Get all filter options
    const { data:allDataForDropdownOptions } = useTranscriptStatus({});

    console.log(allDataForDropdownOptions)

    useEffect(() => {
            const fetchPosts = async () => {
                setLoading(true);
                setPosts(data);
                setLoading(false);
            };
    
            fetchPosts();
    
        }, [data]); // Re-fetch posts when the currentPage changes
    
         // Get current posts
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);
    
            // Change page
        const paginateFront = () => setCurrentPage(currentPage + 1);
        const paginate = (pageNumber) => setCurrentPage(pageNumber);
        const paginateBack = () => setCurrentPage(currentPage - 1);

    const handleExportToExcelClick = () => {
        const excelData = posts?.map(transcriptStatus => ({
            'First Name': transcriptStatus.transcript.first_name,
            'Last Name': transcriptStatus.transcript.last_name,
            'DOB': transcriptStatus.transcript.dob,
            'Status': transcriptStatus.status,
            'Branch': transcriptStatus?.branch || 'N/A', // Placeholder, dont have the branch info yet
            'Received On': transcriptStatus.created,
            'Download On': data?.status === 'Opened' ? 'N/A' : data?.modified,
            'Requested By': transcriptStatus.academic_institute,
        }));

        exportToExcel({
            data: excelData, 
            fileName: 'MMT_Transcript_Status' 
        });
    };

    const renderTableContent = () => {
        if (loading) {
          return <tr><td colSpan="9" className="px-4 py-3 text-center">Loading...</td></tr>;
        }
        
        if (!currentPosts || currentPosts.length === 0) {
          return <tr><td colSpan="9" className="px-4 py-3 text-center">No records found</td></tr>;
        }
        
        return <PostList posts={currentPosts} handleChange={handleCheckbox} selectedRows={selectedRows} />;
      };

      const triggerDownload = () => {
        const dataToDownload = currentPosts.filter(data => selectedRows.includes(data.pk));
        dataToDownload?.map(selected => downloadTranscript(selected.transcript.pk, selected.transcript.last_name))
      };

      const triggerLegacyDownload = () => {
        const dataToDownload = currentPosts.filter(data => selectedRows.includes(data.pk));
        dataToDownload?.map(selected => downloadTranscriptLegacy(selected.transcript.pk, selected.transcript.last_name))
      };

      const handleCheckbox = (event, index) => {
        if (event.target.checked) {
            setSelectedRows([...selectedRows, index]);
          } else {
            setSelectedRows(selectedRows.filter(id => id !== index));
          }
   };
      

    // Get unique options here
    const statusOptions = useMemo(() => {
        if (!allDataForDropdownOptions) return [];
        
        const allStatuses = allDataForDropdownOptions.map(transcriptStatus => transcriptStatus?.status);
        return [...new Set(allStatuses)];
    }, [allDataForDropdownOptions ]);

    return (
        <>

            <div className="mx-auto max-w-screen-xl">
                {/* <!-- Start coding here --> */}
                <div className="overflow-x-auto sm:justify-center bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden mb-8">
                    <div className="w-full md:w-auto flex flex-col pl-2 md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-2 flex-shrink-0">
                        <div className="flex items-center space-x-2 w-full size-20 text-xs md:w-auto ">
                            <div className="p-0.5 mb-2 font-medium rounded-lg cursor-pointer">
                                <Dropdown placement="bottom" label='recent-filter' renderTrigger={() => (
                                    <div className="mt-2 w-max text-white bg-purple hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                        <div className="flex flex-row">
                                            <FolderDownloadIcon className="pr-2 mt-0.5 h-4" />
                                                Download
                                            <ChevronDownIcon className="ml-1 h-5" />
                                        </div>
                                    </div> )} >
                                
                                    <DropdownItem className='' onClick={() => triggerLegacyDownload()}>Legacy</DropdownItem>
                                    <DropdownItem onClick={() => triggerDownload()}>Modernized</DropdownItem>
                                </Dropdown>
                            </div>
                            <div className="font-semibold">Filters</div>

                            <div id="actionsDropdown" className="hidden z-2 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 cursor-default">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                    <li>
                                        <a rel="noopener noreferrer"href="/#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                                    </li>
                                </ul>
                                <div className="py-1">
                                    <a rel="noopener noreferrer"href="/#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                                </div>
                            </div>
                            <div className="p-0.5 mb-2 overflow-hidden font-medium rounded-lg bg-gradient-to-r from-purple to-blue-custom cursor-pointer">
                                <Dropdown label='recent-filter' renderTrigger={() => ( <div className="items-center md:w-full flex py-2 px-2 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-opacity-50 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 " >
                                    {transcriptStatusFilters?.recent ? 'Last 30 Days' : 'Recent'}
                                    <svg className=" -mr-1 ml-1.5 xl:h-5 xl:w-5 lg:w-8 lg:h-8 md:h-10 md:w-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>)} >
                                    <DropdownItem onClick={() => onFiltersChange('recent', null)}>All</DropdownItem>
                                    <DropdownItem onClick={() => onFiltersChange('recent', true)}>Last 30 Days</DropdownItem>
                                </Dropdown>
                            </div>
                            <div className="flex p-0.5 mb-2 overflow-hidden rounded-lg bg-gradient-to-r from-purple to-blue-custom cursor-pointer">
                                <Dropdown label='status-filter' renderTrigger={() => ( <div className="items-center md:w-full flex py-2 px-2 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-opacity-50 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ">
                                    {transcriptStatusFilters?.status || 'Status'}
                                    <svg className=" -mr-1 ml-1.5 2xl:h-5 xl:h-7 xl:w-5 lg:w-9 lg:h-8 md:h-10 md:w-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>)} >
                                    <DropdownItem onClick={() => onFiltersChange('status', null)}>All</DropdownItem>
                                    {statusOptions.map((status, i) => (
                                        <DropdownItem
                                            key={status}
                                            onClick={() => onFiltersChange('status', status)}
                                        >
                                            {status}
                                        </DropdownItem>
                                    ))}
                                </Dropdown>
                            </div>
                            <div className="p-0.5 mb-2 overflow-hidden font-medium rounded-lg bg-gradient-to-r from-purple to-blue-custom cursor-pointer">
                                <Dropdown label='branch-filter' renderTrigger={() => ( <div className="w-full md:w-auto flex items-center justify-center py-2 px-2 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-opacity-50 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    {transcriptStatusFilters?.branch ? 'Air Force' : 'Service Branch'}
                                    <svg className=" -mr-1 ml-1.5 xl:h-5 xl:w-5 lg:w-8 lg:h-8 md:h-10 md:w-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>)} >
                                    <DropdownItem onClick={() => onFiltersChange('branch', null)}>All</DropdownItem>
                                    <DropdownItem onClick={() => onFiltersChange('branch', 'Air Force')}>Air Force</DropdownItem>
                                </Dropdown>
                            </div>

                            <div className="p-0.5 mb-2 overflow-hidden font-medium rounded-lg bg-gradient-to-r from-purple to-blue-custom">
                                <button id="filterDropdownButton" title={"This functionality is not yet developed."} data-dropdown-toggle="filterDropdown" className="w-full sm:w-1/3 md:w-full flex items-center justify-center py-2 px-2 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-opacity-50 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                    Requested By
                                    <svg className="-mr-1 ml-1.5 xl:h-5 xl:w-5 lg:w-8 lg:h-8 md:h-10 md:w-8 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-0.5 mb-2 overflow-hidden font-medium rounded-lg">
                                <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 font-medium text-purple ring-white outline-white focus:outline-none bg-white rounded-lg hover:bg-gray-100 hover:text-primary-700 dark:bg-gray-800 dark:text-gray-400  dark:hover:text-white dark:hover:bg-gray-700"        onClick={() => {
                                    onFiltersChange('status', null);
                                    onFiltersChange('branch', null);
                                    onFiltersChange('recent', false);
                                }}>
                                    Clear Filter
                                </button>
                            </div>
                            <div className="p-0.5 mb-2 overflow-hidden font-medium rounded-lg bg-gradient-to-r from-purple to-blue-custom">
                                <GraySecondaryButton handleClick={handleExportToExcelClick}  buttonLabel={"Export to Excel"} icon={<TableIcon className="pr-1 h-6 mr-1" />} />

                            </div>
                            <div id="filterDropdown" className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                                <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
                                <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                    <li className="flex items-center">
                                        <input id="apple" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple (56)</label>
                                    </li>
                                    <li className="flex items-center">
                                        <input id="fitbit" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="fitbit" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Microsoft (16)</label>
                                    </li>
                                    <li className="flex items-center">
                                        <input id="razor" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="razor" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Razor (49)</label>
                                    </li>
                                    <li className="flex items-center">
                                        <input id="nikon" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="nikon" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Nikon (12)</label>
                                    </li>
                                    <li className="flex items-center">
                                        <input id="benq" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="benq" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">BenQ (74)</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3"></th>
                                    <th scope="col" className="px-4 py-3">First Name</th>
                                    <th scope="col" className="px-4 py-3">Last Name</th>
                                    <th scope="col" className="px-4 py-3">DOB</th>
                                    <th scope="col" className="px-4 py-3">Status</th>
                                    <th scope="col" className="px-4 py-3">Branch</th>
                                    <th scope="col" className="px-4 py-3">Received On</th>
                                    {posts?.status !== 'Delivered' && posts?.status !== 'Pending' && <th scope="col" className="px-4 py-3">Download On</th> }
                                    <th scope="col" className="px-4 py-3">Requested By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableContent()}
                            </tbody>
                        </table>
                    </div>
                    <div className="m-4">
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={posts?.length}
                            paginateBack={paginateBack}
                            paginate={paginate}
                            paginateFront={paginateFront}
                            currentPage={currentPage}
                        />
                    </div>
                    {/* <div className="flex overflow-x-auto sm:justify-center">
                <Pagination layout="table" currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />
            </div> */}
                </div>
            </div>
        </>
    );
}

const PostList = ({ posts, handleChange, selectedRows }) => {
    if (!posts || posts?.length === 0) {
        return <tr><td colSpan="9" className="px-4 py-3 text-center">No records found</td></tr>;
    }
    
    return(
        <>
            {posts.map((data, index) => (
                <tr className="border-b dark:border-gray-700" key={data.sentTo}>
                    <li className="flex mt-3 justify-center">
                        <input id="chkbx" type="checkbox" value=""  checked={selectedRows.includes(data.pk)} onChange={(event) => handleChange(event, data.pk)} className="px-2 py-2 h-4 w-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    </li>
                    <td className="px-4 py-3">{data.transcript.first_name}</td>
                    <td className="px-4 py-3">{data.transcript.last_name}</td>
                    <td className="px-4 py-3">{data.transcript.dob}</td>
                    <td className="px-4 my-3">
                        <div className={`text-center ${getTranscriptStatusColor(data?.status)} rounded-md p-1 font-semibold`}>
                            {data.status}
                        </div>
                    </td>
                    <td className="px-4 py-3">{data.transcript.branch}</td> 
                    <td className="px-4 py-3">{new Date(data?.created).toLocaleString()}</td>
                    <td className="px-4 py-3">{data?.status === 'Delivered' || data?.status === 'Pending' ? 'N/A' : new Date(data?.modified).toLocaleString()}</td>
                    {/* <td className="px-4 py-3">{data.downloadBy}</td> */}
                    <td className="px-4 py-3">{data.academic_institute}</td>
                </tr>
            ))}
        </>
    )
};

