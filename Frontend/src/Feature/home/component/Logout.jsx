import React from "react"
import { useAuth } from "../../auth/hook/useAuth"

const Logout = () => {
const { logout, loading } = useAuth()

return (
    <div 
        className="nav-item" 
        onClick={logout} 
        style={{ cursor: 'pointer' }}
    >
        <span className="icon">🚪</span>
        <span className="label">{loading ? "Logging out..." : "Logout"}</span>
    </div>
)
}

export default Logout
