import { createBrowserRouter } from "react-router"
import Register from "../Feature/auth/pages/Register"
import Login from "../Feature/auth/pages/Login"
import Protected from "../Feature/auth/component/Protected"
import Home from "../Feature/home/pages/Home"
import Landing from "../Feature/home/pages/Landing"
import AppLayout from "../Feature/Shared/component/AppLayout"
import Playlist from "../Feature/Playlist/pages/Playlist"
import History from "../Feature/history/pages/History"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
    {
        path: "/app",
        element: <Protected><AppLayout /></Protected>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "playlist",
                element: <Playlist />
            },
            {
                path: "history",
                element: <History />
            }
        ]
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    }
])