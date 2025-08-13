'use strict';

import { SearchIcon, XIcon } from '@heroicons/react/solid';

export default function SearchBar({ parameters, onChange, onClick, onReset }) {
  const checkSpecialChar = (e) => {
    if(/[<>/?+={};#$%&*()`~\\]/.test(e.key)){
     e.preventDefault();
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (onClick) onClick(event);
      }}
      className='relative w-full max-w-3xl h-[37px] flex items-center inline-flex border border-[#d6d2db]  rounded-lg overflow-hidden shadow-md'>
        <input type="submit" className='hidden' />
        <div className='absolute left-3 flex items-center pointer-events-none'>
          <SearchIcon className='h-5 w-5 text-gray-500' />
        </div>
      <input
        id='search-bar'
        data-testid='search-bar-t'
        value={parameters.keyword}
        name='keyword'
        type='text'
        className="flex-1 pl-10 text-gray-500 text-sm font-normal outline-none bg-transparent border-none"
        onChange={onChange}
        autoComplete='off'
        placeholder='Search'
        maxLength="128"
        onKeyPress={(e)=>checkSpecialChar(e)}
      />
      <button
          id={'reset'}
          title='reset'
          data-testid="reset-button"
          onClick={() => onReset('keyword')}
          className='outline-none focus:bg-gray-100 p-2 text-gray-400 hover:text-purple hover:text-shadow cursor-pointer rounded-full hover:bg-gray-100 w-min'
        >
          <XIcon className={'h-4 w-4'} />
        </button>
        <button
          title='Search'
          className="h-full px-4 bg-purple text-white text-sm font-medium font-['Inter'] "
        >
          Search
        </button>
    </form>
  );
}

