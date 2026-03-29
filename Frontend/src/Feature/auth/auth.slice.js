import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, getMe, logout } from "./service/auth.api";


export const loginUser = createAsyncThunk(
    "/api/auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await login({ email, password });
            return response.user;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    "/api/auth/register",
    async ({ username, email, password }, { rejectWithValue }) => {
        try {
            const response = await register({ username, email, password });
            return response.user;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);  
export const fetchCurrentUser = createAsyncThunk(
    "/api/auth/getme",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getMe();
            // console.log(response);
            
            return response.user;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "/api/auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await logout();
            return null;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
const authAlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        err: null,
        isAuthenticated: false,
        authChecked: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.err = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.authChecked = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload;
                state.authChecked = true;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.err = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.authChecked = true;   
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload;
                state.authChecked = true;
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
                state.err = null;
                state.authChecked = false;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.authChecked = true;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.authChecked = true;
})
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.err = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.authChecked = true;

            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload;
                state.isAuthenticated = false;
                state.authChecked = true;

            });        
    }
});
export default authAlice.reducer