import React from "react"
import { useAuth } from "../../auth/hook/useAuth"

const Logout = () => {
const { handleLogout, loading } = useAuth()

return (
    <button
    className="button"
    onClick={handleLogout}
    disabled={loading}
    style={{ marginBottom: "1rem" }}
    >
    {loading ? "Logging out..." : "Logout"}
    </button>
)
}

export default Logout
