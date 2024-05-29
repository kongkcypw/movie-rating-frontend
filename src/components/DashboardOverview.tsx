import React from 'react'
import { MovieOverview } from '../pages/Dashboard'

interface DashboardOverviewProps {
    overview: MovieOverview
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ overview }) => {
    return (
        <div className='mt-8 mb-4'>
            <div className='grid grid-cols-12 gap-16 drop-shadow-md'>
                <div className='col-span-4 bg-white flex justify-between py-8 px-8'>
                    <label className='text-lg font-medium my-auto text-blue-600'>Total Movies</label>
                    <span className='my-auto text-xl font-bold'>{overview.totalMovies}</span>
                </div>
                <div className='col-span-4 bg-white py-8 px-8'>
                    <div className='flex justify-between my-auto'>
                        <div className='my-auto'>
                            <p className='text-lg font-medium text-blue-600'>Latest Movies</p>
                            <p className='text-md'>Released Year</p>
                        </div>
                        <div className='my-auto'>
                            <span className='my-auto text-xl font-bold'>{overview.newestMovie.yearReleased}</span>
                        </div>
                    </div>
                </div>
                <div className='col-span-4 bg-white py-8 px-8'>
                    <div className='flex justify-between my-auto'>
                        <div className='my-auto'>
                            <p className='text-lg font-medium text-blue-600'>Oldest Movies</p>
                            <p className='text-md'>Released Year</p>
                        </div>
                        <div className='my-auto'>
                            <span className='my-auto text-xl font-bold'>{overview.oldestMovie.yearReleased}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardOverview