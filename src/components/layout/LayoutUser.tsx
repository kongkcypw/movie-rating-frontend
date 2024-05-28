import { Outlet } from 'react-router-dom'
import UserNavbar from './UserNavbar'

const LayoutUser: React.FC = ({ }) => {

    return (
        <>
            <UserNavbar />
            <Outlet />
        </>
    )
}

export default LayoutUser