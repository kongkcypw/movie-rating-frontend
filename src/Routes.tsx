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
import Signup from "./pages/Signup";
import TokenExpire from "./pages/TokenExpire";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const Routes: React.FC = ({ }) => {
    return (
        <div className='font-notoTH'>
            <Router>
                {/* Public Route */}
                <Route element={<LayoutUser />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/permission-denied" element={<PermissionDenied />} />
                    <Route path="/token-expired" element={<TokenExpire />} />

                    {/* Catch all */}
                    <Route path="*" element={<NotFound />} />
                </Route>

                {/* Private Route: Role: Floor Staff */}
                <Route element={<RequireAuth allowedPermissions={[1]} />}>
                    <Route element={<LayoutAdmin />}>
                        <Route path="/floorstaff/dashboard" element={<Dashboard />} />
                        <Route path="/floorstaff/movie/edit" element={<StaffMovieGUI />} />
                    </Route>
                </Route>

                {/* Private Route: Role: Manager */}
                <Route element={<RequireAuth allowedPermissions={[2]} />}>
                    <Route element={<LayoutAdmin />}>
                        <Route path="/manager/dashboard" element={<Dashboard />} />
                        <Route path="/manager/movie/edit" element={<ManagerMovieGUI />} />
                    </Route>
                </Route>
            </Router>
        </div>
    )
}

export default Routes