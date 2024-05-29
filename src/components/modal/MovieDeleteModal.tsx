import React from 'react'
import { Movie } from '../../pages/ManagerMovieCRUD';
import { IoCloseCircleOutline } from "react-icons/io5";

interface MovieDeleteModalProps {
    selectedMovie: Movie | undefined;
    closeModal: () => void;
    handleDeleteMovie: (selectedMovie: Movie) => void;
}

const MovieDeleteModal: React.FC<MovieDeleteModalProps> = ({ selectedMovie, closeModal, handleDeleteMovie }) => {

    const onDeleteClick = () => {
        if (selectedMovie) {
            handleDeleteMovie(selectedMovie);
        }
    };

    return (
        <div className='fixed flex start-0 top-0 justify-center z-20 bg-black bg-opacity-30 h-screen w-full '>
            <div className='relative bg-white rounded-lg max-w-4xl min-h-[70vh] w-full my-auto p-8'>
                <div className='flex justify-between pb-4 border-b-2'>
                    <h1 className='text-xl font-semibold'>Delete Movie</h1>
                    <button onClick={closeModal} className='text-slate-600 text-2xl rounded-full hover:bg-slate-100'><IoCloseCircleOutline /></button>
                </div>
                <div className='mt-12 pb-12'>
                    <div className='flex justify-center'>
                        <img src={selectedMovie?.movieImageUrl} alt='Preview' className='w-auto h-48 object-cover' />
                    </div>
                </div>

                <div className='flex justify-center w-full mb-8'>
                    <div className='w-full px-12'>
                        <div className='grid grid-cols-10 text-lg mb-4'>
                            <div className='col-span-1 my-auto'>
                                <h2 className='font-medium'>Title:</h2>
                            </div>
                            <div className='col-span-9'>
                                <h2 className='border py-1 bg-slate-100 px-4 rounded-sm'>{selectedMovie?.movieTitle}</h2>
                            </div>
                        </div>
                        <div className='grid grid-cols-10 text-lg mb-4'>
                            <div className='col-span-1 my-auto'>
                                <h2 className='font-medium'>Year:</h2>
                            </div>
                            <div className='col-span-9'>
                                <h2 className='border py-1 bg-slate-100 px-4 rounded-sm'>{selectedMovie?.yearReleased}</h2>
                            </div>
                        </div>
                        <div className='grid grid-cols-10 text-lg mb-4'>
                            <div className='col-span-1 my-auto'>
                                <h2 className='font-medium'>Rate:</h2>
                            </div>
                            <div className='col-span-9'>
                                <h2 className='border py-1 bg-slate-100 px-4 rounded-sm'>{selectedMovie?.rating}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' absolute end-8 bottom-8'>
                    <div className='flex justify-end gap-4'>
                        <button className='px-4 py-2 text-red-500 border border-red-500 bg-white rounded
                            hover:bg-slate-50'
                            onClick={closeModal}>
                            Cancel
                        </button>
                        <button className='px-4 py-2 bg-red-500 text-white rounded
                            hover:bg-red-700'
                            onClick={() => onDeleteClick()}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDeleteModal