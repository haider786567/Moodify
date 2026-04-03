import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        currentSong: null,
        isPlaying: false,
        queue: [],
        currentIndex: -1
    },
    reducers: {
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload;
            state.queue = [action.payload];
            state.currentIndex = 0;
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        playPlaylist: (state, action) => {
            const { songs, startIndex } = action.payload;
            if (songs && songs.length > 0) {
                state.queue = songs;
                state.currentIndex = startIndex || 0;
                state.currentSong = songs[state.currentIndex];
            }
        },
        playNext: (state) => {
            if (state.queue && state.currentIndex < state.queue.length - 1) {
                state.currentIndex += 1;
                state.currentSong = state.queue[state.currentIndex];
            }
        },
        playPrevious: (state) => {
            if (state.queue && state.currentIndex > 0) {
                state.currentIndex -= 1;
                state.currentSong = state.queue[state.currentIndex];
            }
        }
    },
});

export const { setCurrentSong, setIsPlaying, playPlaylist, playNext, playPrevious } = playerSlice.actions;

export default playerSlice.reducer;