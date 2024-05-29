import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { axiosInstance } from '../api/axios';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../components/animation/LoadingAnimation';

const Login: React.FC = () => {

    const { fetchUserInfo } = useUser()

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleInputUsername = (e: any) => {
        setUsername(e.target.value);
        setIsError(false);
        setErrorMessage('');
    }

    const handleInputPassword = (e: any) => {
        setPassword(e.target.value);
        setIsError(false);
        setErrorMessage('');
    }

    const handleSubmit = async(e: React.FormEvent) => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const bodyParams = {
                username: username,
                password: password
            }
            const response = await axiosInstance.post(`/api/auth/login`, bodyParams)
            console.log(response)
            if (response.status === 200) {
                setIsError(false)
                fetchUserInfo();
                setIsLoading(false);
                if(response.data.permissionLevel === 0){
                    // Redirect to prev history
                    navigate("/");
                }
                else if(response.data.permissionLevel === 2){
                    navigate("/manager/movie/edit");
                }
                console.log(response);
            }
        } catch (error) {
            setIsLoading(false);
            if(error instanceof AxiosError){
                if(error.response && error.response.status === 400){
                    setErrorMessage("Email or password is invalid, please try again")
                }
                else if(error.response && error.response.status === 401){
                    setErrorMessage("No Account found, please sign up")
                }
                console.log(error);
                setIsError(true)
            }
        }
    }

    return (
        <div className='w-full min-h-screen flex items-center bg-slate-100'>
            {isLoading && <LoadingAnimation />}
            <div className=' max-w-5xl h-auto mx-auto bg-slate-50 rounded-lg drop-shadow-md'>
                <div className='grid grid-cols-8'>
                    <div className='col-span-4'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/movie-rating-173de.appspot.com/o/assets%2Flogin%2Favatar%202%20wallpaper.jpg?alt=media&token=7c083562-a400-49e7-be1a-7a76f1d7022f'
                            className='w-full h-auto rounded-lg m-2' />
                    </div>
                    <div className='col-span-4 h-full flex items-center justify-center'>
                        <div className='text-center w-full'>
                            <h1 className='text-2xl font-medium my-4'>Welcome back!</h1>
                            <form onSubmit={handleSubmit} className='px-24'>
                                <input
                                    className='border py-2 px-2 w-full my-2 rounded-sm placeholder:px-1'
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={handleInputUsername}
                                    placeholder='Type your username or email'
                                />
                                <input
                                    className='border py-2 px-2 w-full my-2 rounded-sm placeholder:px-1'
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handleInputPassword}
                                    placeholder='Type your password'
                                />
                                {isError &&
                                    <span className='text-red-400 text-sm'>{errorMessage}</span>
                                }
                                <button type="submit" className='bg-blue-400 py-2 my-8 w-full text-white rounded-sm font-medium shadow-md shadow-blue-200'>
                                    <span>Login</span>
                                </button>
                            </form>
                            <div className='flex justify-center gap-2'>
                                <span>Are you new ?</span>
                                <span className='text-slate-600 underline cursor-pointer'>Sign up</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
