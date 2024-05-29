import { Outlet } from 'react-router-dom'
import UserNavbar from './UserNavbar'
import { useUser } from '../../hooks/useUser'
import { useEffect } from 'react'
import LoadingAnimation from '../animation/LoadingAnimation'

const LayoutUser: React.FC = ({ }) => {

    const { isFetchLoading, fetchUserInfo } = useUser()

    useEffect(() => {
        fetchUserInfo()
    }, [])

    return (
        <div className="w-full min-h-screen bg-slate-100">
            {isFetchLoading && <LoadingAnimation />}
            <UserNavbar />
            <div className='mx-auto max-w-7xl'>
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutUser