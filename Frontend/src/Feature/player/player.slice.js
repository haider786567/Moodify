import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        currentSong: null,
        isPlaying: false,
    },
    reducers: {
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload;
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
    },
});

export const { setCurrentSong, setIsPlaying } = playerSlice.actions;

export default playerSlice.reducer;