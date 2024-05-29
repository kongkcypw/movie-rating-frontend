import React, { useEffect } from 'react'
// import { Movie } from './ManagerMovieGUI'
// import { axiosInstance } from '../api/axios';

interface DashboardProps { }

const Dashboard: React.FC<DashboardProps> = ({ }) => {

    // const [isLoading, setIsLoading] = useState<boolean | null>(null);
    // const [movieList, setMovieList] = useState<Movie[]>([]);

    useEffect(() => {
        // fetchAllMovie();
    }, [])

    // const fetchAllMovie = async () => {
    //     try {
    //       setIsLoading(true);
    //       const response = await axiosInstance.get("/api/movie/get-all");
    //       if (response.status === 200) {
    //         console.log(response.data.movie);
    //         setMovieList(response.data.movie);
    //         setIsLoading(false);
    //       }
    //     } catch (error) {
    //       console.log(error)
    //       setIsLoading(false);
    //     }
    //   }

    return (
        <div>Dashboard</div>
    )
}

export default Dashboard