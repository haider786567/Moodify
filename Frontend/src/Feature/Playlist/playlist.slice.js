import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { getPlaylists, createPlaylist, addToPlaylist, deletePlaylist, removeFromPlaylist, getSinglePlaylist, updatePlaylist } from "../Playlist/service/playlist.api.js";

export const fetchPlaylists = createAsyncThunk('playlist/fetchPlaylists', async () => {
    const playlists = await getPlaylists();
    return playlists;
})

export const createNewPlaylist = createAsyncThunk('playlist/createNewPlaylist', async (name) => {
    const playlist = await createPlaylist(name);
    return playlist;
})

export const addSongToPlaylist = createAsyncThunk('playlist/addSongToPlaylist', async ({ playlistId, videoId }) => {
    const updatedPlaylist = await addToPlaylist(playlistId, videoId);
    return updatedPlaylist;
})

export const removeSongFromPlaylist = createAsyncThunk('playlist/removeSongFromPlaylist', async ({ playlistId, videoId }) => {
    const updatedPlaylist = await removeFromPlaylist(playlistId, videoId);
    return updatedPlaylist;
})

export const deleteExistingPlaylist = createAsyncThunk('playlist/deleteExistingPlaylist', async (playlistId) => {
    const response = await deletePlaylist(playlistId); 
    const data = await response.json();
    return data;
})
export const getSingleExistingPlaylist = createAsyncThunk('playlist/getSingleExistingPlaylist', async (playlistId) => {
    const playlist = await getSinglePlaylist(playlistId);
    return playlist;
})

export const updateExistingPlaylist = createAsyncThunk('playlist/updateExistingPlaylist', async ({ playlistId, name }) => {
    const updatedPlaylist = await updatePlaylist(playlistId, name);
    return updatedPlaylist;
})

const playlistSlice = createSlice({
    name: 'playlist',
    initialState: {
        playlists: [],
        loading: false,
        error: null,
        currentPlaylist: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaylists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlaylists.fulfilled, (state, action) => {
                state.loading = false;
                state.playlists = action.payload;
            })
            .addCase(fetchPlaylists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createNewPlaylist.fulfilled, (state, action) => {
                state.playlists.push(action.payload);
            })
            .addCase(addSongToPlaylist.fulfilled, (state, action) => {
                const index = state.playlists.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.playlists[index] = action.payload;
                }
            })
            .addCase(removeSongFromPlaylist.fulfilled, (state, action) => {
                const index = state.playlists.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.playlists[index] = action.payload;
                }
            })
            .addCase(deleteExistingPlaylist.fulfilled, (state, action) => {
                state.playlists = state.playlists.filter(p => p._id !== action.meta.arg);
            })
            .addCase(getSingleExistingPlaylist.fulfilled, (state, action) => {
                state.currentPlaylist = action.payload;
            })
            .addCase(updateExistingPlaylist.fulfilled, (state, action) => {
                const index = state.playlists.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.playlists[index] = action.payload;
                }
            })
    }
})

export default playlistSlice.reducer;