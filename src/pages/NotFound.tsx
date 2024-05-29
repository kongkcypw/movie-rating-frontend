import React from 'react'
import { useNavigate } from 'react-router-dom'

interface NotFoundProps {

}

const NotFound: React.FC<NotFoundProps> = ({ }) => {

    const navigate = useNavigate();

    return (
        <div className='w-full bg-white'>
            <div className='mx-auto max-w-7xl min-h-screen bg-white overflow-hidden'>
                <div className='w-full min-h-screen flex items-center justify-end relative '>
                    <div className='absolute left-52'>
                        <h1 className='text-3xl font-semibold'>404 Error !</h1>
                        <h1 className='text-xl text-slate-600 mt-4'>Sorry, page not found</h1>
                        <h1 className='text-xl text-slate-600 mt-2'>We can't seem to find the page you're looking for</h1>
                        <button className='mt-16 bg-blue-400 px-6 py-4 text-white rounded-full drop-shadow-md hover:bg-blue-500'
                            onClick={() => navigate("/")}>
                            <span className='text-lg'>Back to home</span>
                        </button>
                    </div>
                    <div className='w-[500px] mr-36'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/movie-rating-173de.appspot.com/o/assets%2Fnot-found%2F20906890_6384608.jpg?alt=media&token=b323e029-1eda-4e32-a59a-7f8306b23a2d' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound