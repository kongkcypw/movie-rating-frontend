import React from 'react';
import { MoviePublic } from '../../pages/Home';

interface MovieCardProps {
    movie: MoviePublic;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <div className='w-full'>
            <div className='relative cursor-pointer group'>
                <img
                    src={movie.movieImageUrl}
                    alt={movie.movieTitle}
                    className='object-cover w-full h-72 transition duration-300 ease-in-out transform group-hover:brightness-80'
                />
                <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition duration-300 ease-in-out'></div>
            </div>
            <div className='bg-white p-4 h-32 flex flex-col '>
                <div className='flex-grow'>
                    <h1 className='text-lg font-bold line-clamp-2'>{movie.movieTitle}</h1>
                    <p className='text-md'>Rate: {movie.rating}</p>
                    <p className='text-sm text-gray-600'>Released: {movie.yearReleased}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
