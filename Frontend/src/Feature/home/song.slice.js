import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getSong } from "./service/song.api.js";

export const fetchSong = createAsyncThunk(
    "/songs/fetchsong",
    async ({mood},{rejectWithValue})=>{
        try{
            const response = await getSong({mood})
            return response.song
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }   
)
const songSlice = createSlice({
    name:"song",
    initialState:{
        song:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchSong.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchSong.fulfilled,(state,action)=>{
            state.loading = false
            state.song = action.payload
        })
        builder.addCase(fetchSong.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
    }
})
export default songSlice.reducer 
