import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getHistory } from "./service/history.api";

export const fetchHistory = createAsyncThunk(
    "/api/music/history",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getHistory();
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)
const historySlice = createSlice({
    name: "history",
    initialState: {
        history: [],
        loading: false,
        err: null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchHistory.pending,(state)=>{
            state.loading = true
            state.err = null
        })
        builder.addCase(fetchHistory.fulfilled,(state,action)=>{
            state.loading = false
            state.history = action.payload
        })
        builder.addCase(fetchHistory.rejected,(state,action)=>{
            state.loading = false
            state.err = action.payload
        })
    }
})

export default historySlice.reducer