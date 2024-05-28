import React, { useEffect, useState } from "react"
import { axiosInstance } from "../api/axios"
import MovieTableCRUD from "../components/table/MovieTableCRUD";
import MovieModalCRUD from "../components/modal/MovieModalCRUD";

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

const ManagerMovieCRUD:React.FC = ({}) => {

  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [rateList, setRateList] = useState<Rate[]>([]);

  const [isDisplayEditModal, setIsDisplayEditModal] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();

  useEffect(() => {
    fetchAllMovie()
  }, [])

  const fetchAllMovie = async () => {
    try {
      const response = await axiosInstance("/api/movie/get-all");
      console.log(response.data.movie);
      if (response.status === 200) {
        setMovieList(response.data.movie);
        setRateList(response.data.rate);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditButton = (selected: Movie) => {
    console.log(selected)
    setSelectedMovie(selected)
    setIsDisplayEditModal(true)
  }

  return (
    <div className="w-full">
      <h1 className='text-2xl w-full px-4'>Movies</h1>
      <MovieTableCRUD
        movieList={movieList}
        rateList={rateList} 
        handleEditButton={handleEditButton}/>
      {isDisplayEditModal === true &&
        <MovieModalCRUD
          selectedMovie={selectedMovie}
          closeModal={() => setIsDisplayEditModal(false)} />}
    </div>
  )
}

export default ManagerMovieCRUD