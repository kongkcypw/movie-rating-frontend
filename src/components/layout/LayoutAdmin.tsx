import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import { useUser } from '../../hooks/useUser'

const LayoutAdmin: React.FC = ({}) => {

    const { user, isFetchLoading } = useUser();

    if (!user && (isFetchLoading === null || isFetchLoading === true)) {
        return <h1>Loading</h1>;
    }

    if (user && !isFetchLoading) {
        return (
            <>
                <div className='w-full flex'>
                    <AdminSidebar role={user?.role} />
                    <div className='p-12 w-full bg-slate-100'>
                        <Outlet />
                    </div>
                </div>
            </>
        )
    }
}

export default LayoutAdmin