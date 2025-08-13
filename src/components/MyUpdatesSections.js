'use strict';
import { getTranscriptStatusColor } from '@/utils/getTranscriptStatusColor';

export default function MyUpdatesSections({ title, description, icon, badgelabel, sentDate, date }){

    return(
        <div>
            <div className='flex flex-row'>
              <div className='flex flex-col'>
                {icon}
                {description? <div className='mt-2 border-l h-16 ml-2'></div> : <div className='mt-2 border-l h-12 ml-2'></div>}
              </div>

              <div className='flex flex-col pl-3'>
                <div className='flex flex-row'>
                  {badgelabel? <div className={`p-1 px-3 mr-2 font-bold text-sm rounded ${getTranscriptStatusColor(badgelabel)} bg-opacity-50`}>{badgelabel} </div> : <></>}
                  <div className='pt-0.5 text-gray-400 text-sm'> {sentDate}</div> 
                </div>

                <div className='font-bold py-1'>
                  {title}
                </div>

                {description? <p className='flex font-sans line-clamp-6 text-gray-500 '>
                {description}
                </p>: <div></div>}

                <div className='text-gray-700'>
                  {date}
                </div>
              </div>
            </div>
        </div>
    )
}