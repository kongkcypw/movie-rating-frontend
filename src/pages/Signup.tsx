import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { axiosInstance } from '../api/axios';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../components/animation/LoadingAnimation';

const SignUp: React.FC = () => {
    const { setUser, fetchUserInfo } = useUser();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleInputUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        setIsError(false);
        setErrorMessage('');
    };

    const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setIsError(false);
        setErrorMessage('');
    };

    const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setIsError(false);
        setErrorMessage('');
    };

    const handleInputConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setIsError(false);
        setErrorMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            setIsLoading(true);
            e.preventDefault();

            if (password !== confirmPassword) {
                setIsError(true);
                setErrorMessage("Passwords do not match");
                setIsLoading(false);
                return;
            }

            const bodyParams = {
                username: username,
                email: email,
                password: password
            };

            const response = await axiosInstance.post(`/api/auth/signup`, bodyParams);
            console.log(response);
            if (response.status === 200) {
                setIsError(false);
                fetchUserInfo();
                setIsLoading(false);
                setUser(response.data);
                if (response.data.permissionLevel === 0) {
                    navigate("/");
                } else if (response.data.permissionLevel === 1) {
                    navigate("/floorstaff/movie/edit");
                } else if (response.data.permissionLevel === 2) {
                    navigate("/manager/movie/edit");
                }
                console.log(response);
            }
        } catch (error) {
            setIsLoading(false);
            if (error instanceof AxiosError) {
                if (error.response && error.response.status === 400) {
                    setErrorMessage("All input is require, please try again");
                } else if (error.response && error.response.status === 409) {
                    if(error.response.data.conflict === "username"){
                        setErrorMessage("username is taken, please try again");
                    }
                    else{
                        setErrorMessage("You email is already exist, please login");
                    }        
                }
                console.log(error);
                setIsError(true);
            }
        }
    };

    return (
        <div className='w-full min-h-screen flex items-center relative bg-slate-400 overflow-hidden'>
            <div className='w-full min-h-full absolute bg-black opacity-60'>
                <div className='w-full absolute'>
                    <img
                        className='w-full h-auto'
                        src={"https://firebasestorage.googleapis.com/v0/b/movie-rating-173de.appspot.com/o/assets%2Flogin%2Fsimple-blue-white-background-with-text-space_1017-46764.jpg?alt=media&token=ee0ea9ac-ecf9-44c6-bd9c-e45976bb8e5b"}
                        alt="background" />
                </div>
            </div>

            {isLoading && <LoadingAnimation />}
            <div className='max-w-5xl h-auto mx-auto bg-slate-50 rounded-lg drop-shadow-md'>
                <div className='grid grid-cols-8'>
                    <div className='col-span-4'>
                        <img
                            src='https://firebasestorage.googleapis.com/v0/b/movie-rating-173de.appspot.com/o/assets%2Flogin%2F14562381_5500661.jpg?alt=media&token=95595b1b-ca19-4284-8bec-7f1d9d59dcda'
                            className='w-full h-auto rounded-lg'
                            alt='signup-background' />
                    </div>
                    <div className='col-span-4 h-full flex items-center justify-center'>
                        <div className='text-center w-full'>
                            <h1 className='text-2xl font-medium my-4'>Create an account</h1>
                            <form onSubmit={handleSubmit} className='px-24'>
                                <input
                                    className='border py-2 px-2 w-full my-2 rounded-sm placeholder:px-1 focus:outline-blue-400'
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={handleInputUsername}
                                    placeholder='Type your username'
                                />
                                <input
                                    className='border py-2 px-2 w-full my-2 rounded-sm placeholder:px-1 focus:outline-blue-400'
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={handleInputEmail}
                                    placeholder='Type your email'
                                />
                                <input
                                    className='border py-2 px-2 w-full my-2 rounded-sm placeholder:px-1 focus:outline-blue-400'
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handleInputPassword}
                                    placeholder='Type your password'
                                />
                                <input
                                    className='border py-2 px-2 w-full my-2 rounded-sm placeholder:px-1 focus:outline-blue-400'
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleInputConfirmPassword}
                                    placeholder='Confirm your password'
                                />
                                {isError &&
                                    <span className='text-red-400 text-sm'>{errorMessage}</span>
                                }
                                <button type="submit" className='bg-blue-400 hover:bg-blue-500 py-2 my-8 w-full text-white rounded-sm font-medium shadow-md shadow-blue-200'>
                                    <span>Sign Up</span>
                                </button>
                            </form>
                            <div className='flex justify-center gap-2'>
                                <span>Already have an account?</span>
                                <span className='text-slate-600 hover:text-slate-800 underline cursor-pointer' onClick={() => navigate("/login")}>Login</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
