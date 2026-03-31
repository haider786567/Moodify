import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getSong } from "./service/song.api.js";

export const fetchSong = createAsyncThunk(
    "/songs/fetchsong",
    async ({mood},{rejectWithValue})=>{
        try{
            const response = await getSong({mood})
            console.log(response);
            
            return response
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }   
)
const songSlice = createSlice({
    name:"song",
    initialState:{
        videoId:null,
        thumbnail:null,
        title:null,
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
            state.videoId = action.payload.videoId
            state.thumbnail = action.payload.thumbnail
            state.title = action.payload.title
            state.duration = action.payload.duration
        })
        builder.addCase(fetchSong.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
    }
})
export default songSlice.reducer 
