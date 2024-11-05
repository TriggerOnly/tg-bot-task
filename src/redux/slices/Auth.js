import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk('auth', async (params) => {
    const { data } = await axios.post('/auth', params); 
    return data;
});

const initialState ={
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    data: null,
    initialState,
    extraReducers: (builder) => {
        builder
    .addCase(fetchAuth.pending, (state) => {
        state.data = null;
        state.status = 'loading'; 
    })
    .addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loaded'; 
    })
    .addCase(fetchAuth.rejected, (state) => {
        state.data = null;
        state.status = 'error'; 
    });

    }
})

export const selectIsAuth = state => Boolean(state.auth.data)
export const authReducer = authSlice.reducer