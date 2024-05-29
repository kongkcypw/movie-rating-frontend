import React, { Dispatch, SetStateAction } from 'react'
import { useUser } from '../../hooks/useUser'

interface ConfirmLogoutModalProps {
    isDisplay: boolean
    setIsDisplay: Dispatch<SetStateAction<boolean>>
}

const ConfirmLogoutModal: React.FC<ConfirmLogoutModalProps> = ({ isDisplay, setIsDisplay }) => {

    const { logout } = useUser();

    const handleClickLogout = async () => {
        logout();
        setIsDisplay(false);
    }

    if (!isDisplay) {
        null
    }

    if (isDisplay) {
        return (
            <div className='fixed flex start-0 top-0 justify-center z-20 bg-black bg-opacity-30 h-screen w-full'>
                <div className='relative bg-white rounded-lg max-w-2xl min-h-[20vh] w-full my-auto p-8'>
                    <div className='border-b-2 border-b-blue-100 pb-2'>
                        <h1 className='text-2xl font-semibold'>Confirm logout</h1>
                    </div>
                    <div className='mt-6'>
                        <span className='text-lg'>Are you sure you want to log out?</span>
                    </div>
                    <div className='flex justify-end gap-4'>
                        <button onClick={() => setIsDisplay(false)} 
                            className='bg-white border border-blue-500 rounded-sm px-4 py-2 hover:bg-slate-50'>
                            <span className='text-blue-500'>Cancle</span>
                        </button>
                        <button onClick={() => handleClickLogout()} 
                            className='bg-blue-400 rounded-sm px-4 py-2 hover:bg-blue-500'>
                            <span className='text-white'>Okay</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConfirmLogoutModal