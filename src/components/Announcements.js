'use strict';

import {ChevronDownIcon, SpeakerphoneIcon} from '@heroicons/react/solid';
import { Disclosure, Transition } from '@headlessui/react';
import { useState } from 'react';

export default function Announcements({ content, className }) {

    const [isOpen, setIsOpen] = useState(true);
    const [counter, setCounter] = useState(content.length + 1);

    const handleClick=(e)=>{
        setIsOpen(false)
        setCounter(counter - 1) 
    }
    return (
        <Disclosure>
        {({ open }) => (
            <div className='hover:bg-gray-200 hover:rounded-lg'>
                <Disclosure.Button className={'flex flex-row rounded-lg justify-between bg-purple bg-opacity-30 text-purple text-left w-full p-5 font-medium border border-gray-300 hover:opacity-90 hover:shadow'}>
                <div className='flex justify-start'> <SpeakerphoneIcon className='h-5 mr-4' /> Notifications ({counter - 1})</div>
                    <ChevronDownIcon data-testid="testId" className={`flex w-6 h-6 justify-end ${open ? "transform rotate-180" : ""} `} />
                </Disclosure.Button>

                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                <Disclosure.Panel className="p-5 rounded-lg border border-t-0 ml-2 border-gray-300 focus:ring-4 focus:ring-gray-200 focus:bg-gray-50">
                        {content.map((data, index) => {
                            return (
                                <>
                                    {data.type === "persist" ? (<div className={'flex flex-col rounded-lg justify-start text-left w-full p-5 mb-3 font-medium  border-l-4 border-orange-500 border-b-gray-300 shadow-lg hover:opacity-90 hover:shadow'}>
                                        <div className='mb-3 text-sm text-gray-500'>
                                            {data.date} at {data.time}
                                        </div>
                                        <div className='font-semibold'>
                                            {data.announcement}
                                        </div>
                                    </div>)
                                    :
                                    (
                                        <>
                                        {(isOpen) ?(<div className={'flex flex-col rounded-lg justify-start text-left w-full p-5 mb-3 font-medium  border-l-4 border-blue-800 border-b-gray-300 shadow-lg hover:opacity-90 hover:shadow'}>
                                            <div className='flex flex-row justify-between mb-3 text-sm text-gray-500'>
                                                <div>
                                                    {data.date} at {data.time}
                                                </div>
                                                <div className="">
                                                    <button data-collapse-toggle="banner" data-testid="xButton" type="button" onClick={handleClick} className="text-gray-400 hover:bg-gray-200 hover:text-black-900 rounded-lg text-sm pt-1 dark:hover:bg-gray-600 dark:hover:text-white" >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ><path fillRule="evenodd" data-testid="testId" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='font-semibold'>
                                                {data.announcement}
                                            </div>
                                            
                                        </div>) :(<></>)}
                                        </>
                                    )}
                                </>
                            )
                        })}
                </Disclosure.Panel>
                </Transition>
            </div> )}
        </Disclosure>
    );
}
