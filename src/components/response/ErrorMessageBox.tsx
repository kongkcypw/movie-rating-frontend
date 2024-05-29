import React, { useEffect } from 'react'
import { ErrorResponseObject } from '../../pages/ManagerMovieGUI'
import { BiSolidError } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

interface ErrorMessageBoxProps {
  errorState: ErrorResponseObject
}

// Only use for CRUD GUI
const ErrorMessageBox: React.FC<ErrorMessageBoxProps> = ({ errorState }) => {

  const navigate = useNavigate();

  useEffect(() => {
    // Invalid token *Unauthorize: auth failed* (token expire)
    if (errorState.status === 401) {
      navigate("/token-expired");
    }
  }, [errorState.status, navigate]);

  // Invalid input
  if(errorState.status !== 401){
    return (
      <div className='w-full border border-red-400 bg-red-400 px-4 mt-4 rounded-sm text-white'>
        <div className='flex py-2'>
          <BiSolidError className='text-white text-2xl my-auto'/>
          <span className='my-auto ml-2'>Error({errorState.status}): </span>
          <span className='my-auto ml-2'>{errorState.message} </span>
        </div>
  
      </div>
    )
  }
  
}

export default ErrorMessageBox