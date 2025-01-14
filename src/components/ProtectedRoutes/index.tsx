import * as React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

interface IProtectedRoutes {
  // Add props here if needed
}

const ProtectedRoutes: React.FunctionComponent<IProtectedRoutes> = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  // loading while processing the user
  if (loading) {
    return <div>...Loading</div>;
  }

  // checking if the user is logged in, then can go to protected routes if not go to login
  return user ? (
    <Outlet />
  ) : (
    // redirects to login from the current location which is stored using hook useLocation() and after logging in they will be on that location they tried to get in
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoutes;
