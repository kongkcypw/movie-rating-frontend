import React, { useEffect } from 'react'

const About: React.FC = ({ }) => {

    useEffect(() => {
        fetchRate()
    }, [])

    const fetchRate = async() => {
        try{

        } catch(error) {

        }
    }

    return (
        <div className='mx-auto max-w-7xl'>
            <h1 className='text-2xl font-semibold pt-12 pb-4'>Classification Ratetings</h1>
            <p className='text-lg'>Classifications help you decide which films to choose.
                Classifications tell you about the impact of the content and the most suitable audience for a film.
            </p>
        </div>
    )
}

export default About