import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";
import { RiMovie2Line } from "react-icons/ri";
import { SiThemoviedatabase } from "react-icons/si";
import { useUser } from '../../hooks/useUser';

interface AdminSidebarProp {
    role: string
}

const AdminSidebar: React.FC<AdminSidebarProp> = ({ role }) => {

    const { logout } = useUser();

    const pathBaseOnRole = role.toLowerCase();

    const location = useLocation();

    return (
        <div className="h-screen min-w-64 bg-slate-700 text-white flex flex-col drop-shadow-md sticky top-0">
            <div className="flex items-center justify-center h-20 bg-blue-400">
                <SiThemoviedatabase className='text-6xl' />
            </div>
            <Link to={`/${pathBaseOnRole}/dashboard`}>
                <div className={`flex px-6 py-4 ${location.pathname === `/${pathBaseOnRole}/dashboard` ? 'bg-slate-500' : ''}  hover:bg-slate-500 `}>
                    <GoHome className='text-3xl' />
                    <span className='my-auto ml-2'>Dashboard</span>
                </div>
            </Link>
            <Link to={`/${pathBaseOnRole}/movie/edit`}>
                <div className={`flex px-6 py-4 ${location.pathname === `/${pathBaseOnRole}/movie/edit` ? 'bg-slate-600' : ''}  hover:bg-slate-500 `}>
                    <RiMovie2Line className='text-3xl' />
                    <span className='my-auto ml-2'>Movies</span>
                </div>
            </Link>
            <div className='flex cursor-pointer absolute w-full bottom-2 px-6 py-4 hover:bg-slate-500'
                onClick={() => logout()}>
                <IoLogOutOutline className='text-3xl' />
                <span className='my-auto ml-2'>Log out</span>
            </div>
        </div>
    )
}

export default AdminSidebar