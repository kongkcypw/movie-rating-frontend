import React, { useEffect, useState } from "react"
import { axiosInstance } from "../api/axios"
import MovieTableCRUD from "../components/table/MovieTableCRUD";
import MovieEditModal from "../components/modal/MovieEditModal";
import MovieDeleteModal from "../components/modal/MovieDeleteModal";
import MovieAddModal from "../components/modal/MovieAddModal";
import LoadingAnimation from "../components/animation/LoadingAnimation";

export interface Movie {
  movieId: string;
  movieTitle: string;
  yearReleased: number;
  rating: string;
  movieImageUrl: string;
}

export interface Rate {
  rateId: string,
  rateName: string,
  rateDescription: string
}

const ManagerMovieCRUD: React.FC = ({ }) => {

  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [rateList, setRateList] = useState<Rate[]>([]);

  const [isDisplayAddModal, setIsDisplayAddModal] = useState<boolean>(false);
  const [isDisplayEditModal, setIsDisplayEditModal] = useState<boolean>(false);
  const [isDisplayDeleteModal, setIsDisplayDeleteModal] = useState<boolean>(false);
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

  const handleDeleteButton = (selected: Movie) => {
    console.log(selected)
    setSelectedMovie(selected)
    setIsDisplayDeleteModal(true)
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

  const handleDeleteMovie = async (deletedMovie: Movie) => {
    try {
      const body = {
        movieId: deletedMovie.movieId
      }
      const response = await axiosInstance.post("/api/movie/delete", body);
      if (response.status === 200) {
        await fetchAllMovie();
        setIsDisplayDeleteModal(false);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full">
      <h1 className='text-2xl w-full px-4 font-semibold mb-8'>Movies</h1>
      <MovieTableCRUD
        movieList={movieList}
        rateList={rateList}
        handleAddButton={handleAddButton}
        handleEditButton={handleEditButton}
        handleDeleteButton={handleDeleteButton} />
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
      {isDisplayDeleteModal === true &&
        <MovieDeleteModal
          selectedMovie={selectedMovie}
          closeModal={() => setIsDisplayDeleteModal(false)}
          handleDeleteMovie={handleDeleteMovie} />}
      {isLoading && <LoadingAnimation />}
    </div>
  )
}

export default ManagerMovieCRUD