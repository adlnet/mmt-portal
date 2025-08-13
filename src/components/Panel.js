'use strict';

import { useRouter } from "next/router"
import Image from 'next/image';

export default function Panel({ title, description, buttonLabel, children, image, route, icon }){
    const router = useRouter();
    const handleClick=(e)=>{
        e.preventDefault();
        router.push(route)
    }
    return(
        <div className='bg-white border rounded-md border-gray-200 p-4 shadow-lg focus:shadow-lg px-5 my-8 mr-4 w-1/2'>
            <div className='max-h-24'>
              <Image src={image} height={100} alt='' className='rounded'/>
            </div>
            <h1 className='flex text-xl font-semibold h-6'>
                {title}
            </h1>
            {description? <p className='flex pt-3 mt-4 font-sans line-clamp-6 text-gray-500'>
                {description}
            </p>: <div className="p-1"></div>}
            {children}
            {buttonLabel &&
            <div className='flex align-bottom items-bottom mt-4'>
                <div className='inline-block align-bottom gap-2'>
                    <button
                        id={'view-course-button-'}
                        className='flex justify-center items-center gap-2 dod-500 w-84 rounded-lg hover:shadow-md text-purple bg-gray-100 hover:bg-purple hover:text-white px-2 p-1.5 py-2 transform transition-all duration-150 ease-in-out border-dod-500 border-2 focus:ring-2 ring-dod-500 outline-none'
                        title={buttonLabel}
                        onClick={handleClick}
                        data-testid="button"
                    >
                        {icon}
                        {buttonLabel}
                    </button>
                </div>
            </div>
            }
        </div>
    )
}