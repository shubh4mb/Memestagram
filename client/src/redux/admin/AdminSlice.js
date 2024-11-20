// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { verifyToken , adminlogin} from './AdminVerifyThunk'; 

const initialState = {
    admin: null,
    isAuthenticated: false, // Track if the user is authenticated
    loading: false,         // Track loading state for async actions
    error: null,            // Store any errors from async actions
};

const userSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        logout: (state) => {
            state.admin = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                state.admin = action.payload.user; // Store user data if needed
                state.isAuthenticated = true;
                state.loading = false;
                state.admin=action.payload.username
            })
            .addCase(verifyToken.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.loading = false;
                state.error = action.payload || 'Failed to authenticate';
            })
            .addCase(adminlogin.pending,(state)=>{
                state.isAuthenticated=false
                state.loading=true;
                state.error= null
            })
            .addCase(adminlogin.fulfilled,(state,action)=>{
                state.loading=false;
                state.isAuthenticated=true;
                state.admin=action.payload.username

            })
            .addCase(adminlogin.rejected,(state,action)=>{
                state.isAuthenticated=false
                state.loading=false;
                state.error=action.payload
            })
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
