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
        }
     }
})

export const {
    signInStart,
    signInSuccess,
    signInFailed
} = adminSlice.actions;

export default adminSlice.reducer;