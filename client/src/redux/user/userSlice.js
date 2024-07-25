import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInUser: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        signInFail: (state, action) => {
            state.loading = false,
            state.error = action.payload;
        },
    },
});

export const { signInUser, signInSuccess, signInFail } = userSlice.actions;
export default userSlice.reducer;