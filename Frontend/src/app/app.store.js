import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Feature/auth/auth.slice.js';
import songReducer from '../Feature/home/song.slice.js';
const store = configureStore({
    reducer: {
        auth: authReducer,
        song: songReducer
    },
});
export default store;