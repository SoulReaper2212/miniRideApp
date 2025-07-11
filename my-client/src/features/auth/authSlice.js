import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true; // for cookies

const BASE_URL = 'https://minirideapp-production.up.railway.app/';

export const signup = createAsyncThunk('auth/signup', async (data) => {
  const res = await axios.post(`${BASE_URL}/auth/signup`, data);
  return res.data;
});

export const login = createAsyncThunk('auth/login', async (data) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, data);
  return res.data.token;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.error = 'Login failed';
      });
  },
});

export default authSlice.reducer;
