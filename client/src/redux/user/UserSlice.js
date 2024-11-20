import { createSlice } from "@reduxjs/toolkit";

// Corrected the spelling of initialState
const initialState = {
    currentUser: null,
    error: false,
   
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInSuccess: (state, action) => {
            state.currentUser = action.payload.username;
        },
        logout: (state) => {
            state.currentUser = null; 
          },
        
    }
});

// Export the actions
export const { signInSuccess , logout} = userSlice.actions;

// Correct the export to use userSlice.reducer
export default userSlice.reducer;
