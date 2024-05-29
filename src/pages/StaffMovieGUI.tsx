import React, { useState, useEffect } from 'react'
import { Movie, Rate } from './ManagerMovieGUI';
import { axiosInstance } from '../api/axios';
import MovieAddModal from '../components/modal/MovieAddModal';
import MovieEditModal from '../components/modal/MovieEditModal';
import MovieTableCRU from '../components/table/MovieTableCRU';
import LoadingAnimation from '../components/animation/LoadingAnimation';

const StaffMovieGUI: React.FC = ({ }) => {

    const [isLoading, setIsLoading] = useState<boolean | null>(null);

    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [rateList, setRateList] = useState<Rate[]>([]);

    const [isDisplayAddModal, setIsDisplayAddModal] = useState<boolean>(false);
    const [isDisplayEditModal, setIsDisplayEditModal] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie>();

    useEffect(() => {
        fetchAllMovie()
    }, [])

    const fetchAllMovie = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get("/api/movie/get-all");
            console.log(response.data.movie);
            if (response.status === 200) {
                setMovieList(response.data.movie);
                setRateList(response.data.rate);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }

    const handleAddButton = () => {
        setIsDisplayAddModal(true)
    }

    const handleEditButton = (selected: Movie) => {
        console.log(selected)
        setSelectedMovie(selected)
        setIsDisplayEditModal(true)
    }

    const handleAddMovie = async (addMovie: Movie) => {
        try {
            setIsLoading(true);
            const body = {
                movieTitle: addMovie.movieTitle,
                rating: addMovie.rating,
                movieImageUrl: addMovie.movieImageUrl,
                yearReleased: addMovie.yearReleased
            }
            const response = await axiosInstance.post("/api/movie/add-new", body)
            if (response.status === 200) {
                await fetchAllMovie();
                setIsDisplayAddModal(false);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }

    const handleUpdateMovie = async (updatedMovie: Movie) => {
        try {
            setIsLoading(true);
            const body = {
                movieId: updatedMovie.movieId,
                movieTitle: updatedMovie.movieTitle,
                rating: updatedMovie.rating,
                movieImageUrl: updatedMovie.movieImageUrl,
                yearReleased: updatedMovie.yearReleased
            }
            const response = await axiosInstance.post("/api/movie/update", body);
            if (response.status === 200) {
                await fetchAllMovie();
                setIsDisplayEditModal(false);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h1 className='text-2xl w-full px-4 font-semibold mb-8'>Movies</h1>
            <MovieTableCRU
                movieList={movieList}
                rateList={rateList}
                handleAddButton={handleAddButton}
                handleEditButton={handleEditButton} />
            {isDisplayAddModal === true &&
                <MovieAddModal
                    rateList={rateList}
                    handleAddMovie={handleAddMovie}
                    closeModal={() => setIsDisplayAddModal(false)}
                />
            }
            {isDisplayEditModal === true &&
                <MovieEditModal
                    selectedMovie={selectedMovie}
                    rateList={rateList}
                    closeModal={() => setIsDisplayEditModal(false)}
                    handleUpdateMovie={handleUpdateMovie} />}
            {isLoading && <LoadingAnimation />}
        </div>
    )
}

export default StaffMovieGUI