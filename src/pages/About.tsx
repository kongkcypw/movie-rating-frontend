import React, { useEffect } from 'react'

const About: React.FC = () => {

    useEffect(() => {
        fetchRate()
    }, [])

    const fetchRate = async () => {
        try {
            // Fetch data if needed
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='mx-auto max-w-7xl bg-gray-100'>
            <h1 className='text-3xl font-bold text-left text-blue-600 pt-12 pb-4'>Classification Ratings</h1>
            <p className='text-lg text-left text-gray-700 mb-8'>
                Classifications help you decide which films to choose.
                Classifications tell you about the impact of the content and the most suitable audience for a film.
            </p>
            <div className='space-y-6'>
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <h2 className='text-2xl font-semibold text-green-500 mb-2'>G - General Audience</h2>
                    <p className='text-md text-gray-600'>
                        Suitable for all ages. These films contain no content that would offend parents if viewed by children.
                    </p>
                </div>
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <h2 className='text-2xl font-semibold text-yellow-500 mb-2'>PG - Parental Guidance</h2>
                    <p className='text-md text-gray-600'>
                        Some material may not be suitable for children. Parents are urged to give "parental guidance." May contain some material parents might not like for their young children.
                    </p>
                </div>
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <h2 className='text-2xl font-semibold text-blue-500 mb-2'>M - Mature</h2>
                    <p className='text-md text-gray-600'>
                        Suitable for mature audiences. This rating signifies that the content is more suitable for viewers who are 16 years of age or older.
                    </p>
                </div>
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <h2 className='text-2xl font-semibold text-purple-500 mb-2'>MA - Mature Audiences</h2>
                    <p className='text-md text-gray-600'>
                        Restricted to mature audiences 15 years and older. These films may contain strong content and are not suitable for children under 15 years.
                    </p>
                </div>
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <h2 className='text-2xl font-semibold text-red-500 mb-2'>R - Restricted</h2>
                    <p className='text-md text-gray-600'>
                        Restricted to adult audiences. These films contain adult material and are not suitable for children under 17 years.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
