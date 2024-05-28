import React from 'react';
import { Link } from 'react-router-dom';

const UserNavbar: React.FC = () => {
    return (
        <nav className="bg-stone-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl">
                    <Link to="/">Movie Ratings</Link>
                </div>
                <div className="flex space-x-4">
                    <Link to="/" className="text-white hover:text-gray-400">Home</Link>
                    <Link to="/movies" className="text-white hover:text-gray-400">Movies</Link>
                    <Link to="/about" className="text-white hover:text-gray-400">About</Link>
                    <Link to="/login" className="text-white hover:text-gray-400">Login</Link>
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;
