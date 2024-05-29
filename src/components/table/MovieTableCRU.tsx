import React, { useState, useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Movie, Rate } from '../../pages/ManagerMovieGUI';
import { IoAddCircle } from "react-icons/io5";

interface MovieTableCRUProps {
    movieList: Movie[];
    rateList: Rate[];
    handleAddButton: () => void
    handleEditButton: (selected: any) => void;
}

const MovieTableCRU: React.FC<MovieTableCRUProps> = ({ movieList, rateList, handleAddButton, handleEditButton }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movieList);
    const [searchTitle, setSearchTitle] = useState<string>('');
    const [searchYear, setSearchYear] = useState<string>('');
    const [searchRating, setSearchRating] = useState<string>('');
    const [isDisplayDetail, setIsDisplayDetail] = useState<boolean>(false);
    const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null);

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

    const handleMouseOver = (movie: Movie) => {
        setHoveredMovie(movie);
        setIsDisplayDetail(true);
    }

    const handleMouseLeave = () => {
        setHoveredMovie(null);
        setIsDisplayDetail(false);
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <div className='flex justify-between'>
                    <button className='bg-blue-400 text-white px-4 flex' onClick={handleAddButton}>
                        <IoAddCircle className='my-auto text-lg'/>
                        <span className='my-auto ml-2 font-semibold'>
                            ADD NEW
                        </span>
                    </button>
                    <div>
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
                </div>
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
                        <tr key={movie.movieId} className="border-t hover:bg-blue-50">
                            <td className="py-2 px-4">{index + 1}</td>
                            {/* <td className="py-2 w-12 h-12">
                                <img src={movie.movieImageUrl} alt={movie.movieTitle} className="h-full w-auto object-cover" />
                            </td> */}
                            <td className="py-2 px-4 hover:text-blue-800"
                                onMouseOver={() => handleMouseOver(movie)}
                                onMouseLeave={handleMouseLeave}>
                                {movie.movieTitle}
                            </td>
                            <td className="py-2 px-4">{movie.yearReleased}</td>
                            <td className="py-2 px-4">{movie.rating}</td>
                            <td className="py-2 px-4">
                                <div className='flex gap-2'>
                                    <button className='text-slate-500 border border-slate-500 px-2 rounded-sm
                                        hover:bg-slate-500 hover:text-white'
                                        onClick={() => handleEditButton(movie)}>
                                        <span className='my-auto'>Edit</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isDisplayDetail && hoveredMovie && (
                <div className="absolute top-4 right-4 w-48 h-64 bg-white shadow-lg p-2 border">
                    <img src={hoveredMovie.movieImageUrl} alt={hoveredMovie.movieTitle} className="h-full w-full object-cover" />
                </div>
            )}
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

export default MovieTableCRU;
