import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function register({ email, password, username }) {
    try{
        const response = await api.post("/api/auth/register", {
            email, password, username
        })
    
        return response.data

    }catch(err){
        err.response 
        
        throw err
    }
}

export async function login({ email, username, password }) {
    try{
        const response = await api.post("/api/auth/login", {
            email, username, password
        })
    
        return response.data

    }
    catch (err) {
        err.response 
        
        throw err
    }
}

export async function getMe() {
    const response = await api.get("/api/auth/getme")
    return response.data
}

export async function logout() {
    const response = await api.get("/api/auth/logout")
    return response.data
}