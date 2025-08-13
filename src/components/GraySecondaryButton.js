'use strict';

import React from 'react';

export default function GraySecondaryButton({ buttonLabel, handleClick, icon, tooltip, testid, children }) {
  return (
    <button
        id={'view-course-button-'}
        className='px-4 flex justify-center items-center gap-2 dod-500 w-84 rounded-lg hover:shadow-md text-purple bg-gray-100 hover:bg-purple hover:text-white px-2 p-1.5 py-2 transform transition-all duration-150 ease-in-out border-dod-500 border-2 focus:ring-2 ring-dod-500 outline-none'
        title={tooltip}
        data-testid={testid}
        onClick={handleClick}
        >
        {icon}
        {buttonLabel}
        {children}
    </button>
  );
}
