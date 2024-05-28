import React from 'react'
import { Movie } from '../../pages/ManagerMovieCRUD'

interface MovieModalCRUDProps {
    selectedMovie: Movie | undefined
    closeModal: () => void;
}


const MovieModalCRUD: React.FC<MovieModalCRUDProps> = ({ selectedMovie, closeModal }) => {
    return (
        <div className='fixed flex start-0 top-0 justify-center z-20 bg-black bg-opacity-30 h-screen w-full '>
            <div className='relative bg-white rounded-lg max-w-4xl min-h-[70vh] w-full my-auto p-8'>
                <div className='flex justify-between pb-4 border-b-2'>
                    <h1 className='text-xl'>Edit</h1>
                    <button onClick={closeModal}>Close</button>
                </div>

                {selectedMovie && selectedMovie.movieTitle}
            </div>
        </div>
    )
}

export default MovieModalCRUD