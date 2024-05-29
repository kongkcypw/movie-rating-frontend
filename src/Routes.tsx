import { Routes as Router, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';
import ManagerMovieGUI from './pages/ManagerMovieGUI';
import PermissionDenied from "./pages/PermissionDenied";
import LayoutAdmin from "./components/layout/LayoutAdmin";
import LayoutUser from "./components/layout/LayoutUser";
import React from "react";
import StaffMovieGUI from "./pages/StaffMovieGUI";
import About from "./pages/About";
import Register from "./pages/Register";

const Routes: React.FC = ({ }) => {
    return (
        <div className='font-notoTH'>
            <Router>
                {/* Public Route */}
                <Route element={<LayoutUser />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/permission-denied" element={<PermissionDenied />} />
                </Route>

                {/* Private Route: Role: Floor Staff */}
                <Route element={<RequireAuth allowedPermissions={[1]} />}>
                    <Route element={<LayoutAdmin />}>
                        <Route path="/floorstaff/movie/edit" element={<StaffMovieGUI />} />
                    </Route>
                </Route>

                {/* Private Route: Role: Manager */}
                <Route element={<RequireAuth allowedPermissions={[2]} />}>
                    <Route element={<LayoutAdmin />}>
                        <Route path="/manager/movie/edit" element={<ManagerMovieGUI />} />
                    </Route>
                </Route>

            </Router>
        </div>
    )
}

export default Routes