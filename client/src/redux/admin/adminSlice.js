import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin : null,
    loading: false,
    error: null
}


const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
          },
        signInSuccess: (state, action) => {
            state.admin =  action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userDataUpdatingStarted: (state) => {
            state.loading = true;
            state.error = null; 
        },
        userDataUpdatingSuccess : (state) => {
            state.loading = false;
            state.error = null;
        },
        userDataUpdateFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        cleanState: (state) => {
            state.loading = false;
            state.error = null;
        },
        newUserAddingStarted: (state) => {
            state.loading = true;
            state.error = null;
        },
        newUserAddingSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        newUserAddingFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
     }
})

export const {
    signInStart,
    signInSuccess,
    signInFailed,
    userDataUpdatingStarted,
    userDataUpdatingSuccess,
    userDataUpdateFailed,
    cleanState,
    newUserAddingStarted,
    newUserAddingSuccess,
    newUserAddingFailed
} = adminSlice.actions;

export default adminSlice.reducer;