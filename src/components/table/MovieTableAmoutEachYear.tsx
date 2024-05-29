import React, { useState } from 'react';
import { MovieCountByEachYear } from '../../pages/Dashboard';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface MovieTableAmoutEachYearProps {
    movieData: MovieCountByEachYear[];
}

const MovieTableAmoutEachYear: React.FC<MovieTableAmoutEachYearProps> = ({ movieData }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = movieData.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (indexOfLastItem < movieData.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full divide-y divide-gray-200 drop-shadow-md">
                <thead>
                    <tr className="bg-white">
                        <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">Year Released</th>
                        <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">Movie Count</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.map((item) => (
                        <tr key={item.yearReleased} className='hover:bg-blue-50'>
                            <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">{item.yearReleased}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">{item.movieCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4 gap-4">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="p-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    <IoIosArrowBack className="text-gray-600" />
                </button>
                <span className="my-auto text-lg font-semibold">{currentPage}</span>
                <button
                    onClick={nextPage}
                    disabled={indexOfLastItem >= movieData.length}
                    className="p-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    <IoIosArrowForward className="text-gray-600" />
                </button>
            </div>
        </div>
    );
};

export default MovieTableAmoutEachYear;
