import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { axiosInstance } from "../api/axios"
import MovieTableCRUD from "../components/table/MovieTableCRUD";
import MovieEditModal from "../components/modal/MovieEditModal";
import MovieDeleteModal from "../components/modal/MovieDeleteModal";
import MovieAddModal from "../components/modal/MovieAddModal";
import LoadingAnimation from "../components/animation/LoadingAnimation";
import { AxiosError } from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export interface ErrorResponseObject {
  isError: boolean;
  status: number;
  message: string;
}

const initialErrorState = {
  isError: false,
  status: 200,
  message: ""
}

const ManagerMovieGUI: React.FC = ({ }) => {

  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [errorState, setErrorState] = useState<ErrorResponseObject>(initialErrorState);

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
      if (response.status === 200) {
        console.log(response.data.movie);
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
        notifySuccess("Add movie success!");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorObject = {
          isError: true,
          status: error.response.status,
          message: error.response.data.message
        }
        setErrorState(errorObject)
        setIsLoading(false);
        setIsDisplayAddModal(true)
      }
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
        notifySuccess("Update success!");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorObject = {
          isError: true,
          status: error.response.status,
          message: error.response.data.message
        }
        setErrorState(errorObject)
        setIsLoading(false);
        setIsDisplayEditModal(true)
      }
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
        notifySuccess("Delete movie success!");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorObject = {
          isError: true,
          status: error.response.status,
          message: error.response.data.message
        }
        setErrorState(errorObject)
        setIsLoading(false);
        setIsDisplayDeleteModal(true)
      }
    }
  }

  const handleCloseModal = (setState: Dispatch<SetStateAction<boolean>>) => {
    setErrorState(initialErrorState);
    setState(false);
  }

  const notifySuccess = (message: string) => toast.success(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    });

  return (
    <div className="w-full">
      <ToastContainer />
      <h1 className='text-2xl w-full px-4 font-semibold mb-8'>Movies</h1>
      <MovieTableCRUD
        movieList={movieList}
        rateList={rateList}
        handleAddButton={handleAddButton}
        handleEditButton={handleEditButton}
        handleDeleteButton={handleDeleteButton}
        accessDeleteFunction={true} />
      {isDisplayAddModal === true &&
        <MovieAddModal
          rateList={rateList}
          handleAddMovie={handleAddMovie}
          closeModal={() => handleCloseModal(setIsDisplayAddModal)}
          errorState={errorState}
        />
      }
      {isDisplayEditModal === true &&
        <MovieEditModal
          selectedMovie={selectedMovie}
          rateList={rateList}
          closeModal={() => handleCloseModal(setIsDisplayEditModal)}
          handleUpdateMovie={handleUpdateMovie}
          errorState={errorState} />}
      {isDisplayDeleteModal === true &&
        <MovieDeleteModal
          selectedMovie={selectedMovie}
          closeModal={() => handleCloseModal(setIsDisplayDeleteModal)}
          handleDeleteMovie={handleDeleteMovie}
          errorState={errorState} />}
      {isLoading && <LoadingAnimation />}
    </div>
  )
}

export default ManagerMovieGUI