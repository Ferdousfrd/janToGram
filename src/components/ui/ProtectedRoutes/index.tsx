import * as React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface IProtectedRoutes {
  // Add props here if needed
}

const ProtectedRoutes: React.FunctionComponent<IProtectedRoutes> = (props) => {
    const isAuth: boolean = true
    const location = useLocation()

    // checking if the user is logged in, then can go to protected routes if not go to login
    return isAuth ? (<Outlet />) : (
        // redirects to login from the current location which is stored using hook useLocation() and after logging in they will be on that location they tried to get in
        <Navigate to="/login" state={{ from: location }} />     
    )
};

export default ProtectedRoutes;