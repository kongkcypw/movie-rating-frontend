import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import 'swiper/css';
import 'swiper/css/navigation';
import CardCarousel from "../components/carousel/CardCarousel";
import LoadingAnimation from "../components/animation/LoadingAnimation";

export interface MoviePublic {
  movieTitle: string;
  movieImageUrl: string;
  yearReleased: number;
  rating: string;
}

interface YearRange {
  startYear: number;
  endYear: number;
}

export interface MovieWithYearRange {
  movieList: MoviePublic[];
  yearRange: YearRange;
}

const Home: React.FC = () => {
  const [movieGroup, setMovieGroup] = useState<MovieWithYearRange[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const yearlist = [
    { startYear: 1990, endYear: 1999 },
    { startYear: 2000, endYear: 2009 },
    { startYear: 2010, endYear: 2019 }
  ];

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const promises = yearlist.map(async (yearRange) => {
        try {
          const response = await axiosInstance.post("/api/movie/get-public", yearRange);
          if (response.status === 200) {
            return {
              movieList: response.data.movie,
              yearRange: yearRange
            };
          }
          throw new Error('Failed to fetch movies');
        } catch (error) {
          console.error(`Error fetching movies for year range ${yearRange.startYear}-${yearRange.endYear}:`, error);
          setIsLoading(false);
          return null;
        }
      });

      const movieGroups = await Promise.all(promises);
      const filteredMovieGroups = movieGroups.filter(group => group !== null) as MovieWithYearRange[];
      setMovieGroup(filteredMovieGroups);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching movies:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {movieGroup.map((group, index) => (
        <CardCarousel
          key={index}
          topic={`${group.yearRange.startYear} - ${group.yearRange.endYear}`}
          movieList={group.movieList}
        />
      ))}
      {isLoading && <LoadingAnimation />}
    </div>
  );
};

export default Home;
