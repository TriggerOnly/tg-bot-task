import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchLoginAndRegister = createAsyncThunk('auth/fetchLoginAndRegister', async (params) => {
    const { data } = await axios.post('/auth', params); 

    if (data.token) {
        localStorage.setItem('token', data.token);
    }

    return data;
});

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async () => {
    const token = localStorage.getItem('token');
    if (token) {
        const { data } = await axios.get('/getMe', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return data;
    }
    return null;
})

export const newRecord = createAsyncThunk('record', async () => {
    const {data} = await axios.get('/newRecord')
    return data
})

const initialState = {
    data: null,
    status: 'loading'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            //Login And Register
            .addCase(fetchLoginAndRegister.pending, (state) => {
                state.data = null;
                state.status = 'loading'; 
            })
            .addCase(fetchLoginAndRegister.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'loaded'; 
            })
            .addCase(fetchLoginAndRegister.rejected, (state) => {
                state.data = null;
                state.status = 'error'; 
            })
            //Auth
            .addCase(fetchAuth.pending, (state) => {
                state.data = null;
                state.status = 'loading'; 
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'loaded'; 
            })
            .addCase(fetchAuth.rejected, (state) => {
                localStorage.removeItem('token')
                state.data = null;
                state.status = 'error'; 
            })
    }
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
