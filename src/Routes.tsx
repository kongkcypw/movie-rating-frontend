import { Routes as Router, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import  RequireAuth  from './components/RequireAuth';
import ManagerMovieCRUD from './pages/ManagerMovieCRUD';
import  PermissionDenied  from "./pages/PermissionDenied";
import LayoutAdmin from "./components/layout/LayoutAdmin";
import LayoutUser from "./components/layout/LayoutUser";
import React from "react";

const Routes:React.FC = ({}) => {
    return (
        <div className='font-notoTH'>
            <Router>
                {/* Public Route */}
                <Route element={<LayoutUser />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Login />} />
                    <Route path="/permission-denied" element={<PermissionDenied />} />
                </Route>

                {/* Private Route: Role: Manager */}
                <Route element={<RequireAuth allowedPermissions={[2]} />}>
                    <Route element={<LayoutAdmin />}>
                        <Route path="/manager/movie/edit" element={<ManagerMovieCRUD />} />
                    </Route>
                </Route>

            </Router>
        </div>
    )
}

export default Routes