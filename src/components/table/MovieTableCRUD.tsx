import React, { useState, useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Movie, Rate } from '../../pages/ManagerMovieCRUD';

interface MovieTableCRUDProps {
    movieList: Movie[];
    rateList: Rate[];
    handleEditButton: (selected: any) => void;
}

const MovieTableCRUD: React.FC<MovieTableCRUDProps> = ({ movieList, rateList, handleEditButton }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movieList);
    const [searchTitle, setSearchTitle] = useState<string >('');
    const [searchYear, setSearchYear] = useState<string>('');
    const [searchRating, setSearchRating] = useState<string>('');

    useEffect(() => {
        let filtered = movieList;
        if (searchTitle) {
            filtered = filtered.filter(movie => movie.movieTitle.toLowerCase().includes(searchTitle.toLowerCase()));
        }
        if (searchYear) {
            filtered = filtered.filter(movie => movie.yearReleased.toString().includes(searchYear));
        }
        if (searchRating) {
            filtered = filtered.filter(movie => movie.rating.toLowerCase().includes(searchRating.toLowerCase()));
        }
        setFilteredMovies(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTitle, searchYear, searchRating, movieList]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    const handleOnChangeSearchTitle = (e: any) => {
        setSearchTitle(e.target.value)
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Title"
                    value={searchTitle}
                    onChange={handleOnChangeSearchTitle}
                    className="p-2 border border-gray-300 rounded mr-2"
                />
                <input
                    type="text"
                    placeholder="Search by Year"
                    value={searchYear}
                    onChange={e => setSearchYear(e.target.value)}
                    className="p-2 border border-gray-300 rounded mr-2"
                />
                <select
                    value={searchRating}
                    onChange={e => setSearchRating(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="">Select Rating</option>
                    {rateList.map(rate => (
                        <option key={rate.rateId} value={rate.rateId}>
                            {rate.rateId} - {rate.rateName}
                        </option>
                    ))}
                </select>
            </div>
            <table className="min-w-full bg-white text-left">
                <thead >
                    <tr>
                        <th className="py-2 px-4">#</th>
                        {/* <th className="py-2">Image</th> */}
                        <th className="py-2 px-4">Title</th>
                        <th className="py-2 px-4">Year Released</th>
                        <th className="py-2 px-4">Rating</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMovies.map((movie, index) => (
                        <tr key={movie.movieId} className="border-t">
                            <td className="py-2 px-4">{index + 1}</td>
                            {/* <td className="py-2 w-12 h-12">
                                <img src={movie.movieImageUrl} alt={movie.movieTitle} className="h-full w-auto object-cover" />
                            </td> */}
                            <td className="py-2 px-4">{movie.movieTitle}</td>
                            <td className="py-2 px-4">{movie.yearReleased}</td>
                            <td className="py-2 px-4">{movie.rating}</td>
                            <td className="py-2 px-4">
                                <div className='flex gap-2'>
                                    <button className='text-slate-500 border border-slate-500 px-2 rounded-sm'
                                        onClick={() => handleEditButton(movie)}>
                                        <span className='my-auto'>Edit</span>
                                    </button>
                                    <button className='text-red-500 border border-red-500 px-2 rounded-sm'>
                                        <span className='my-auto'>Delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4 gap-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    <IoIosArrowBack />
                </button>
                <span className='my-auto'>{currentPage}</span>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredMovies.length / itemsPerPage)}
                    className="p-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    < IoIosArrowForward />
                </button>
            </div>
        </div>
    );
}

export default MovieTableCRUD;
