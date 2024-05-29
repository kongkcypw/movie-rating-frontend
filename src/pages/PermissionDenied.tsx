import React from "react";
import { useNavigate } from "react-router-dom";

const PermissionDenied: React.FC = () => {

  const navigate = useNavigate();

  const previousPage = () => {
    window.history.back();
  }

  return (
    <div className='flex flex-col md:flex-row justify-center items-center mt-48 px-4'>
      <div className='flex justify-center'>
        <svg className="h-40 w-40 md:h-96 md:w-96 text-black" width="64" height="64" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <circle cx="12" cy="16" r="1" />
          <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
        </svg>
      </div>
      <div className='mt-6 text-2xl text-black text-center'>
        <p className='font-bold'>Access Denied!</p>
        <div className='text-lg mt-4'>
          There's nothing for you to see on this page. Please go back to where you came from.
          <p className="text-red-500">You must have the correct permissions to access this page.</p>
        </div>
        <div className='flex flex-row justify-center items-center gap-x-2 mt-4 font-semibold'>
          <button className='text-lg bg-red-500 text-white rounded-lg p-2 border' onClick={previousPage}>
            Go to Last Page
          </button>
          <button className='text-lg text-gray-500 bg-gray-200 rounded-lg p-2 border' onClick={() => navigate("/")}>
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  )
}

export default PermissionDenied;
