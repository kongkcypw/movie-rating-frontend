import axios from 'axios';

const BASE_URL = import.meta.env.VITE_PRODUCTION_MODE === true ? import.meta.env.VITE_SERVER_HOSTING_URL: import.meta.env.VITE_SERVER_LOCALHOST;

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
})

export { axiosInstance }