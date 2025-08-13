'use strict';

import React from 'react';

export default function SecondaryButton({ onClick, id, children, tooltip }) {
  return (
    <div className="w-min p-0.5 mb-2 overflow-hidden font-medium rounded-lg bg-gradient-to-r from-purple to-blue-custom ">
        {/* <div className="p-2 bg-gray-100 transition-all ease-in duration-75 rounded-md hover:bg-opacity-50 border-2 border-white text-sm"> */}
        {}
                      
        <button
            type="button"
            className="p-1.5 mt-0.25 bg-gray-100 transition-all ease-in duration-75 rounded-md hover:bg-opacity-50 border-2 border-white text-sm"
            onClick={onClick}
            title={tooltip}
            id={id}
        >
            {children}
        </button>
        {/* </div> */}
    </div>
  );
}
