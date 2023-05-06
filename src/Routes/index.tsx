import { createBrowserRouter, Navigate } from "react-router-dom";
import { getToken } from "../api";
import MyCourse from "../Components/MyCourse";
import FeesList from "../Components/FeesList";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Signout from "../Components/Signout";

interface ProtectedRouteProps {
    element: any
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
    const Element = props.element
    return !!getToken('accessToken')? <Element />: <Navigate to='/login' />
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute element={Home} />
    },
    {
        path: "/login",
        element: <Login/>
            
    },
    {
        path: "/register",
        element: <Register/>
            
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute element={Home} />
    },
    {
        path: "/my-course",
        element: <ProtectedRoute element={MyCourse} />
    },
    {
        path: "/fees",
        element: <ProtectedRoute element={FeesList} />
    },
    {
        path: "/signout",
        element: <Signout/>
    }
])
export default router;