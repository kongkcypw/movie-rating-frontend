import React, { useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface RequireAuthProps {
  allowedPermissions: Array<number>
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedPermissions }) => {

  const { user, fetchUserInfo, isFetchLoading } = useUser()
  const location = useLocation();

  console.log(user);

  useEffect(() => {
    fetchUserInfo();
  }, [])

  if (!user && (isFetchLoading === null || isFetchLoading === true)) {
    return <h1>Loading</h1>;
  }

  if(!user && !isFetchLoading){
    // Add some modal to told that session expired
    return <Navigate to="/login" state={{ from: location }} replace/>;
  }

  if (user && (isFetchLoading === null || isFetchLoading === true)) {
    return <h1>Loading</h1>;
  }

  if(user && !isFetchLoading){
    const hasPermission = allowedPermissions.includes(user.permissionLevel);
    console.log(user.permissionLevel)
    if (!hasPermission) {
      return <Navigate to="/permission-denied" state={{ from: location }} replace/>;
    }
  }


  return <><Outlet /></>;
}

export default RequireAuth