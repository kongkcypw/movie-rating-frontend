import React, { useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import LoadingAnimation from './animation/LoadingAnimation'

interface RequireAuthProps {
  allowedPermissions: Array<number>
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedPermissions }) => {

  const { user, fetchUserInfo, isFetchLoading } = useUser()
  const location = useLocation();

  useEffect(() => {
    fetchUserInfo();
  }, [])

  if (isFetchLoading) {
    return <LoadingAnimation />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasPermission = allowedPermissions.includes(user.permissionLevel);
  if (!hasPermission) {
    return <Navigate to="/permission-denied" state={{ from: location }} replace />;
  }


  return <><Outlet /></>;
}

export default RequireAuth