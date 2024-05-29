import React, { useState } from 'react'
import { Movie, Rate } from '../../pages/ManagerMovieGUI';
import { IoCloseCircleOutline } from "react-icons/io5";

interface MovieAddModalProps {
  rateList: Rate[];
  handleAddMovie: (newMovie: Movie) => void;
  closeModal: () => void;
}

const MovieAddModal: React.FC<MovieAddModalProps> = ({ rateList, handleAddMovie, closeModal }) => {
  const [movieTitle, setMovieTitle] = useState<string>('');
  const [yearReleased, setYearReleased] = useState<number | ''>('');
  const [rating, setRating] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMovie: Movie = {
      movieId: "",
      movieTitle,
      yearReleased: Number(yearReleased),
      rating,
      movieImageUrl: imagePreview
    };
    handleAddMovie(newMovie);
    closeModal(); // Close the modal after adding the movie
  };

  return (
    <div className='fixed flex start-0 top-0 justify-center z-20 bg-black bg-opacity-30 h-screen w-full'>
      <div className='relative bg-white rounded-lg max-w-4xl min-h-[70vh] w-full my-auto p-8'>
        <div className='flex justify-between pb-4 border-b-2'>
          <h1 className='text-xl font-semibold'>Add Movie</h1>
          <button onClick={closeModal} className='text-slate-600 text-2xl rounded-full hover:bg-slate-100'>
            <IoCloseCircleOutline />
          </button>
        </div>

        <div className='mt-4'>
          <div className='mb-4'>
            <label className='block text-gray-700'>Title:</label>
            <input
              type='text'
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded mt-1'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Image URL:</label>
            <input
              type='text'
              value={imagePreview}
              onChange={(e) => setImagePreview(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded mt-1'
            />
            {imagePreview
              ? (<div className='mt-2'>
                <img src={imagePreview} alt='Preview' className='w-auto h-48 object-cover' />
              </div>)
              : (<div className='h-32'></div>)
            }
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Year Released:</label>
            <input
              type='number'
              value={yearReleased}
              onChange={(e) => setYearReleased(Number(e.target.value))}
              className='w-full p-2 border border-gray-300 rounded mt-1'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded mt-1'
              required
            >
              <option value="">Select Rating</option>
              {rateList.map(rate => (
                <option key={rate.rateId} value={rate.rateId}>
                  {rate.rateId} - {rate.rateName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='flex justify-end gap-4 pt-4'>
          <button className='px-4 py-2 text-blue-500 border border-blue-500 bg-white rounded
                      hover:bg-slate-50' onClick={closeModal}>
            Cancel
          </button>
          <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700' onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieAddModal