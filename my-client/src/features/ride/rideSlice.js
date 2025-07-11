import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://minirideapp-production.up.railway.app/';

export const createRide = createAsyncThunk('ride/create', async ({ pickup, dest, token }) => {
  const res = await axios.post(
    `${BASE_URL}/rides`,
    { pickup, dest },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
});

export const getRide = createAsyncThunk('ride/get', async ({ id, token }) => {
  const res = await axios.get(`${BASE_URL}/rides/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

const rideSlice = createSlice({
  name: 'ride',
  initialState: {
    currentRide: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRide.fulfilled, (state, action) => {
        state.currentRide = action.payload;
      })
      .addCase(getRide.fulfilled, (state, action) => {
        state.currentRide = action.payload;
      });
  },
});

export default rideSlice.reducer;
