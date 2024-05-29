import React, { useEffect, useState } from 'react';
import LoadingAnimation from '../components/animation/LoadingAnimation';
import { axiosInstance } from '../api/axios';
import MovieTableAmoutEachYear from '../components/table/MovieTableAmoutEachYear';
import MovieTableAmoutEachRate from '../components/table/MovieTableAmoutEachRate';
import { Movie } from './ManagerMovieGUI';
import DashboardOverview from '../components/DashboardOverview';

export interface MovieCountByEachYear {
    movieCount: number;
    yearReleased: number;
}

export interface MovieCountByEachRate {
    movieCount: number;
    rating: string;
}

export interface MovieOverview {
    newestMovie: Movie
    oldestMovie: Movie
    totalMovies: number
}

const Dashboard: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [movieOverviewData, setMovieOverviewDate] = useState<MovieOverview>();
    const [movieAmountEachYear, setMovieAmountEachYear] = useState<MovieCountByEachYear[]>([]);
    const [movieAmountEachRate, setMovieAmountEachRate] = useState<MovieCountByEachRate[]>([]);

    useEffect(() => {
        fetchMovieOverView();
        fetchMovieCountByYear();
        fetchMovieCountByRate()
    }, []);

    const fetchMovieOverView = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post("/api/movie/get-over-view");
            if (response.status === 200) {
                console.log(response.data.result)
                setMovieOverviewDate(response.data.result)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMovieCountByYear = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post("/api/movie/get-count-by-year");
            if (response.status === 200) {
                console.log(response.data.result)
                setMovieAmountEachYear(response.data.result);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMovieCountByRate = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post("/api/movie/get-count-by-rating");
            if (response.status === 200) {
                console.log(response.data.result)
                setMovieAmountEachRate(response.data.result);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-full'>
            {isLoading && <LoadingAnimation />}
            {movieOverviewData && <DashboardOverview overview={movieOverviewData} />}
            <div className='grid grid-cols-10 gap-12 pt-12'>
                <div className='col-span-5'>
                    <h2 className="text-xl font-semibold mb-4">Movies released by year</h2>
                    <MovieTableAmoutEachYear movieData={movieAmountEachYear} />
                </div>
                <div className='col-span-5'>
                    <h2 className="text-xl font-semibold mb-4">Movies rating</h2>
                    <MovieTableAmoutEachRate movieData={movieAmountEachRate} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
