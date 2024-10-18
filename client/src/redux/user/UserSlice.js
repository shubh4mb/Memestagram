import { createSlice } from "@reduxjs/toolkit";

// Corrected the spelling of initialState
const initialState = {
    currentUser: null,
    error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState, // Ensure the correct spelling here
    reducers: {
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
        }
    }
});

// Export the actions
export const { signInSuccess } = userSlice.actions;

// Correct the export to use userSlice.reducer
export default userSlice.reducer;
