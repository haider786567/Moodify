import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/music',
    withCredentials: true
})

export const createPlaylist = async (name) => {
    const response = await api.post('/playlists', { name });
    return response.data;
}

export const getPlaylists = async () => {
    const response = await api.get('/playlists');
    return response.data;
}

export const getSinglePlaylist = async (playlistId) => {
    const response = await api.get(`/playlists/${playlistId}`);
    return response.data;
}

export const updatePlaylist = async (playlistId, name) => {
    const response = await api.put(`/playlists/${playlistId}`, { name });
    return response.data;
}

export const deletePlaylist = async (playlistId) => {
    const response = await api.delete(`/playlists/${playlistId}`);
    return response.data;
}

export const addToPlaylist = async (playlistId, videoId) => {
    const response = await api.post(`/playlists/${playlistId}/add`, { videoId });
    return response.data;
}

export const removeFromPlaylist = async (playlistId, videoId) => {
    const response = await api.delete(`/playlists/${playlistId}/remove/${videoId}`);
    return response.data;
}   