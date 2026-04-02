import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function getHistory() {
    const response = await api.get("/api/music/history")
    
    return response.data
}