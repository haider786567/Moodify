import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Feature/auth/auth.slice';
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
export default store;