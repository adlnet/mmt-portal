"use client";
'use strict';

import { Dropdown, DropdownItem } from 'flowbite-react';
import { getTranscriptStatusColor } from '@/utils/getTranscriptStatusColor';
import { useDeleteTranscriptStatus } from '@/hooks/useDeleteTranscriptStatus';
import { useEffect, useMemo, useState } from 'react';
import { useTableSearch } from '@/hooks/useTableSearch';
import { useTranscriptStatus } from '@/hooks/useTranscriptStatus';
import Pagination from "./Pagination";
import SearchBar from '@/components/SearchBar';
import useField  from '@/hooks/useField';

export const users = [];

export function TranscriptTrackingTable() {

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [transcriptStatusFilters, setTranscriptStatusFilters] = useState({
    status: '',
    branch: '',
    recent: false
    });
    const { data, isLoading } = useTranscriptStatus(transcriptStatusFilters);

    // Get all filter options
    const { data:allDataForDropdownOptions } = useTranscriptStatus({});

    const { handleSearch, filteredData, setFilteredData } = useTableSearch(data);

    useEffect(() => {
        if (data) {
            setFilteredData(data);
        }
    }, [data, setFilteredData]);

    const { fields, updateKeyValuePair, resetKey } = useField({
        keyword: '',
        p: 1,
      });

    const handleChange = (event) => {
        updateKeyValuePair(event.target.name, event.target.value);
    };

    const handleSearchReset = () => {
        resetKey('keyword');
        handleSearch('', data || []);
    };

    // Dynamically update the filter options when the user selects a filter option
    const handleFiltersChange = (filterOptionKey, filterOptionVal) => {
        setTranscriptStatusFilters(prev => ({
        ...prev,
        [filterOptionKey]: filterOptionVal
        }));
    };

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredData?.slice(indexOfFirstPost, indexOfLastPost);

        // Change page
    const paginateFront = () => setCurrentPage(currentPage + 1);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const paginateBack = () => setCurrentPage(currentPage - 1);

    // Get unique options here
    const statusOptions = useMemo(() => {
        if (!allDataForDropdownOptions) return [];
        
        const allStatuses = allDataForDropdownOptions.map(transcriptStatus => transcriptStatus?.status);
        return [...new Set(allStatuses)];
    }, [allDataForDropdownOptions]);

  return (
    <>
    <div className="mx-auto max-w-screen-xl">
        {/* <!-- Start coding here --> */}
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:-space-y-4 md:space-x-4 p-4">
            <div className='flex items-center gap-4'>
             <div className="flex-grow w-[22rem] xl:w-[34rem]">
                    <SearchBar
                        parameters={fields}
                        onReset={handleSearchReset}
                        onClick={() => {
                            handleSearch(fields.keyword, data || [])
                            setCurrentPage(1);
                        }}
                        onChange={handleChange}
                    />
                </div>
            </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <div className="flex items-center pt-6 space-x-3 w-full md:w-auto">
                        {/* <div className="p-0.5 mb-2 overflow-hidden font-medium rounded-lg bg-gradient-to-r from-purple to-blue-custom from-accent-blue to-purple">                        
                            <button data-testid='actions-filter' id="actionsDropdownButton" title={"This functionality is not yet developed."} data-dropdown-toggle="actionsDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                Actions
                                <svg className="-ml-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                        </div> */}

                        <div id="actionsDropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                <li>
                                    <a rel="noopener noreferrer"href="/#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                                </li>
                            </ul>
                            <div className="py-1">
                                <a rel="noopener noreferrer"href="/#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                            </div>
                        </div>
                        <div className="p-0.5 mb-2 overflow-hidden text-black font-medium rounded-lg bg-gradient-to-r from-purple to-blue-custom from-accent-blue to-purple cursor-pointer">                        
                            <Dropdown data-testid='recent-filetr' label='recent-filter' renderTrigger={() => ( <div className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" >
                                {transcriptStatusFilters?.recent ? 'Last 30 Days' : 'Recent'}
                                <svg className=" -mr-1 ml-1.5 xl:h-5 xl:w-5 lg:w-8 lg:h-8 md:h-10 md:w-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </div>)} >
                                <DropdownItem onClick={() => handleFiltersChange('recent', null)}>All</DropdownItem>
                                <DropdownItem onClick={() => handleFiltersChange('recent', true)}>Last 30 Days</DropdownItem>
                            </Dropdown>
                        </div>
                        <div className="p-0.5 mb-2 overflow-hidden text-black font-medium rounded-lg bg-gradient-to-r from-purple to-blue-custom from-accent-blue to-purple cursor-pointer">                        
                            <Dropdown label='status-filter' renderTrigger={() => ( <div data-testid="status-dropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                {transcriptStatusFilters?.status || 'Status'}
                                <svg className=" -mr-1 ml-1.5 2xl:h-5 xl:h-7 xl:w-5 lg:w-9 lg:h-8 md:h-10 md:w-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </div>)} >
                                <DropdownItem onClick={() => handleFiltersChange('status', null)}>All</DropdownItem>
                                {statusOptions.map((status, i) => (
                                    <DropdownItem
                                        data-testid={`dropdown-item-${status}`}
                                        key={status}
                                        onClick={() => handleFiltersChange('status', status)}
                                    >
                                        {status}
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                        </div>
                        <div className="p-0.5 mb-2 overflow-hidden font-medium rounded-lg">
                                <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 font-medium text-purple ring-white outline-white focus:outline-none bg-white rounded-lg hover:bg-gray-100 hover:text-primary-700 dark:bg-gray-800 dark:text-gray-400  dark:hover:text-white dark:hover:bg-gray-700"        onClick={() => {
                                    handleFiltersChange('status', null);
                                    handleFiltersChange('branch', null);
                                    handleFiltersChange('recent', false);
                                }}>
                                    Clear Filter
                                </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">Action By</th>
                            <th scope="col" className="px-4 py-3">Transcript Recipient</th>
                            <th scope="col" className="px-4 py-3">Date Initiated</th>
                            <th scope="col" className="px-4 py-3">Status</th>
                            <th scope="col" className="px-4 py-3">Action Date</th>
                            <th scope="col" className="px-4 py-3">Action By</th>
                            {/* <th scope="col" className="px-4 py-3">Action</th> */}

                            {/* <th scope="col" className="px-4 py-3">
                                <span className="sr-only">Actions</span>
                            </th> */}
                        </tr>
                    </thead>
                    <tbody> 

                        {isLoading ? <p>Loading...</p> : <PostList posts={currentPosts} />}
                    </tbody>
                </table>
            </div>
            <div className="m-4">
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={filteredData?.length}
                    paginateBack={paginateBack}
                    paginate={paginate}
                    paginateFront={paginateFront}
                    currentPage={currentPage}
                />
            </div>
        </div>
    </div>
    </>
  );
}

const PostList = ({ posts }) => {
   
    const { mutate:deleteTranscriptStatus } = useDeleteTranscriptStatus();

    return(
        <>
            {posts?.map((data, index) => (
                    <tr className="border-b dark:border-gray-700" key={data?.created}>
                        <td className="px-4 py-3 text-slate-900">{data?.requestedBy || 'Self'}</td>
                        <td className="px-4 py-3 text-slate-900">{data?.academic_institute || 'N/A'}</td>
                        <td className="px-4 py-3">{new Date(data?.created).toLocaleString() || 'N/A'}</td>
                        <td className="px-4 my-3"> 
                            <div className={`text-center ${getTranscriptStatusColor(data?.status)} rounded-md p-1 font-semibold`}>
                                {data?.status || 'N/A'}
                            </div>
                        </td>
                        <td className="px-4 py-3">{data?.status === 'Downloaded' ? new Date(data?.modified).toLocaleString() : 'N/A'}</td>
                        <td className="px-4 py-3 text-slate-900">{data?.status === 'Downloaded' ? data?.academic_institute : 'N/A'}</td>
                        {/* <td className="px-4 py-3">
                            <button 
                                disabled={data?.status === 'Downloaded'}
                                className='text-purple whitespace-nowrap hover:text-blue-700 hover:underline disabled:text-[#D6D2DB] disabled:no-underline disabled:hover:text-[#D6D2DB]'
                                onClick={() => deleteTranscriptStatus(data?.pk)}
                            >
                                Cancel
                            </button>
                        </td> */}
                    </tr>
            ))}
        </>
    )
};
