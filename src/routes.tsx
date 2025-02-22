import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Error from "./pages/error";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import CreatePost from "./pages/post";
import Profile from "./pages/profile";
import MyPhotos from "./pages/myPhotos";
import ProtectedRoutes from "./components/ProtectedRoutes";
import EditProfile from "./pages/profile/editProfile";


// creating all the routes for our pages and storing them in one router variable

export const router = createBrowserRouter([

    // protected routes(needs to be logged in)
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <Error />
            },
            {
                path: "/post",
                element: <CreatePost />,
                errorElement: <Error />
            },
            {
                path: "/profile",
                element: <Profile />,
                errorElement: <Error />
            },
            {
                path: "/myphotos",
                element: <MyPhotos />,
                errorElement: <Error />
            },
            {
                path: "/edit-profile",
                element: <EditProfile />,
                errorElement: <Error />
            },
        ]
    },

    // public routes
    {
        path: "/login",
        element: <Login />,
        errorElement: <Error />
    },
    {
        path: "/signup",
        element: <SignUp />,
        errorElement: <Error />
    },
])

export default router