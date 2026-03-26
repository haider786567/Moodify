import React from "react"
import { Navigate } from "react-router"
import { useSelector } from "react-redux"

    function Protected({ children }) {
    const { isAuthenticated, loading } = useSelector(
        (state) => state.auth
    )

    // ⏳ Wait until auth check finishes
    if (loading) {
        return <h1>Loading...</h1>
    }

    // ❌ Not logged in → redirect
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    // ✅ Logged in → allow access
    return children
    }

export default Protected