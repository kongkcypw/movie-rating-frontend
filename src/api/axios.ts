import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_PRODUCTION_MODE === true
//     ? import.meta.env.VITT_SERVER_HOSTING_URL
//     : import.meta.env.VITE_SERVER_LOCALHOST;

const axiosInstance = axios.create({
    withCredentials: true,
    // baseURL: BASE_URL,
    baseURL: "https://movie-rating-backend.vercel.app",
    headers: { 'Content-Type': 'application/json' },
})

export { axiosInstance }