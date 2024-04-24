import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchLiveData = createAsyncThunk(
  "live/fetchLiveData",
  async () => {
    const response = await axios.get(`/live/get-live-buddies`);
    return response.data;
  }
);

const liveSlice = createSlice({
  name: "live",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLiveData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLiveData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchLiveData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default liveSlice.reducer;
