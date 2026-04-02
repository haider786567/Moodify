import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Feature/auth/auth.slice.js';
import songReducer from '../Feature/home/song.slice.js';
import historyReducer from '../Feature/history/history.slice.js';
import playerReducer from '../Feature/player/player.slice.js';
const store = configureStore({
    reducer: {
        auth: authReducer,
        song: songReducer,
        history: historyReducer,
        player: playerReducer,
    },
});
export default store;