import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

export default function Pagination({
    postsPerPage,
    totalPosts,
    paginateFront,
    paginate,
    paginateBack,
    currentPage,
  }) {

    const pageNumbers = [];

    const disablePrevBtn = currentPage === 1;
    const disableNextBtn = totalPosts / postsPerPage <= currentPage;

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
      <div className='flex flex-row justify-between py-2'>
        <div className="flex flex-col mr-40 justify-start">
          <p className='text-sm text-gray-700'>
            Showing
            {totalPosts === 0 ? <span className='font-bold mr-1'> 0</span> : 
            <>
              <span className='font-bold ml-1 '>{currentPage * postsPerPage - postsPerPage + 1} </span>
              -
              {totalPosts < currentPage * postsPerPage ? <span className='font-bold mr-1'> {totalPosts} </span>  
              : <span className='font-bold mr-1'> {currentPage * postsPerPage} </span> }
            
            </> }
            of
            <span className='font-bold'> {totalPosts} </span>
          </p>
        </div>
        <nav className='block'></nav>
        <div className="flex flex-col justify-end mt-2">
          <nav
            className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
            aria-label='Pagination'
          >
            <button
              data-testid="prev-button"
              onClick={() => {
                if(currentPage > 1){paginateBack();}
              }}
              disabled={disablePrevBtn}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${disablePrevBtn ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <span><ChevronLeftIcon className="h-5"/></span>
            </button>
            <ul className='flex pl-0 rounded list-none flex-wrap'>
                <li>
                    {pageNumbers.map((number) => (
                    <a
                        onClick={() => {
                        paginate(number);
                        }}
                        href='#'
                        key={number}
                        className={
                        currentPage === number
                            ? "bg-purple-100 opacity-75 border-purple-800 text-black-800 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        }
                    >
                        {number}
                    </a>
                    ))}
                </li>
            </ul>
  
            <button
              onClick={() => {
                if((currentPage * postsPerPage) < totalPosts){paginateFront();}
              }}
              data-testid="next-button"
              disabled={disableNextBtn}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${disableNextBtn ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <span><ChevronRightIcon className="h-5"/></span>
            </button>
          </nav>
        </div>
      </div>
    );
  }