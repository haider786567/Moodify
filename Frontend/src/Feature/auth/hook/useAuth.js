import { login, register, getMe, logout } from "../service/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { useEffect } from "react";


export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading ,err,seterr} = context

    async function handleRegister({ username, email, password }) {

        try {
            setLoading(true)
            seterr(null)    
            const data = await register({ username, email, password })
            setUser(data.user)
            return true
        } catch (error) {
            seterr(error.response.data.message)
            return false
        } finally {
            setLoading(false)
        }
    }

   async function handleLogin({ email, username, password }) {
    try{
        seterr(null)
        setLoading(true)

        const data = await login({ email, username, password })

        setUser(data.user)

        return true

    } catch (error) {
        console.log(error.response.data.message);
        
        

        seterr(error.response?.data?.message)

        return false

    } finally {
        setLoading(false)
    }
}

    async function handleGetMe() {
        try {
            setLoading(true)
            seterr(null)
            const data = await getMe()
            setUser(data.user)
            setLoading(false)
        } catch (error) {
            setUser(null)
            setLoading(false)
        }
    }

    async function handleLogout() {
        setLoading(true)
        const data = await logout()
        setUser(null)
        setLoading(false)
    }

    useEffect(() => {
        handleGetMe()
    }, [])

    return ({
        user, loading,err, handleRegister, handleLogin, handleLogout, handleGetMe
    })
}