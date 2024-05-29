import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { BiSolidCameraMovie } from "react-icons/bi";
import ConfirmLogoutModal from '../modal/ConfirmLogoutModal';

const UserNavbar: React.FC = () => {

    const { user } = useUser();
    const [isLogoutClicked, setIsLogoutClicked] = useState<boolean>(false);

    return (
        <>
            {isLogoutClicked &&
                <ConfirmLogoutModal
                    isDisplay={isLogoutClicked}
                    setIsDisplay={setIsLogoutClicked}
                />}
            <div className="bg-white text-black p-4 drop-shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex text-2xl">
                        <BiSolidCameraMovie className=' text-blue-400 cursor-pointer' />
                        <Link to="/" className='ml-2  hover:text-blue-400'>Movie Ratings</Link>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/about" className=" hover:text-blue-400">About</Link>
                        {user ? (
                            <>
                                <button className=" hover:text-blue-400" onClick={() => setIsLogoutClicked(true)}>Logout</button>
                            </>
                        ) : (<Link to="/login" className=" hover:text-blue-400">Login</Link>)}

                    </div>
                </div>
            </div>
        </>
    );
};

export default UserNavbar;
