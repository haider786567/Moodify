import React from "react"
import { useAuth } from "../../auth/hook/useAuth"

const Logout = () => {
const { logout, loading } = useAuth()

return (
    <button
    className="button"
    onClick={logout}
    disabled={loading}
    style={{ marginBottom: "1rem" }}
    >
    {loading ? "Logging out..." : "Logout"}
    </button>
)
}

export default Logout
