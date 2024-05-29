import React from 'react'
import { useNavigate } from 'react-router-dom'

const TokenExpire: React.FC = ({ }) => {

    const navigate = useNavigate();

    return (
        <div className='w-full bg-white'>
            <div className='mx-auto max-w-7xl min-h-screen bg-white overflow-hidden'>
                <div className='w-full min-h-screen flex items-center justify-end relative '>
                    <div className='absolute left-52'>
                        <h1 className='text-3xl font-semibold'>Your session has expired !</h1>
                        <h1 className='text-xl text-slate-600 mt-4'>To continue using dashboard, you need to login again</h1>
                        <button className='mt-16 bg-blue-400 px-6 py-4 text-white rounded-full drop-shadow-md hover:bg-blue-500'
                            onClick={() => navigate("/login")}>
                            <span className='text-lg'>Login again</span>
                        </button>
                    </div>
                    <div className='w-[500px] mr-36'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/movie-rating-173de.appspot.com/o/assets%2Ftoken-expire%2F8476699_3926922.jpg?alt=media&token=f81077ed-a6fe-46aa-9c73-f4fb86825832' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TokenExpire