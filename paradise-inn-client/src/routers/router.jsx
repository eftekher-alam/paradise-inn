import { createBrowserRouter } from "react-router-dom";
import App from './../App';
import Home from "../components/home/Home";
import Login from './../components/login/Login';
import Register from './../components/register/Register';
import RoomDetails from "../components/room_details/RoomDetails";
import Rooms from "../components/rooms/Rooms";
import MyBookings from "../components/my_bookings/MyBookings";
import Error_Page from "../components/error_page/Error_Page";
import AboutUs from "../components/about_us/AboutUs";
import PrivateRoute from "./PrivateRoute";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <Error_Page></Error_Page>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/hello",
                element: <Home></Home>
            },
            {
                path: "/room_details/:id",
                element: <RoomDetails></RoomDetails>
            },
            {
                path: "/rooms",
                element: <Rooms></Rooms>
            },
            {
                path: "/myBookings",
                element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>
            },
            {
                path: "/about_us",
                element: <AboutUs></AboutUs>
            }
        ]
    }
]);

export default router;