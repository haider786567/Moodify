import { createBrowserRouter } from "react-router"
import Register from "../Feature/auth/pages/Register"
import Login from "../Feature/auth/pages/Login"
import Protected from "../Feature/auth/component/Protected"
import Home from "../Feature/home/pages/Home"


export const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register />
    },
    {
        path:"/",
        element: <Protected><Home/></Protected>
        // element: <Protected><Home/></Protected>

    },
    {
        path: "/login",
        element: <Login />
    }
])