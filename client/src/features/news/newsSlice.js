import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchNews = createAsyncThunk("news/get", async () => {
  const response = await axios.get(`/news/get`);
  return response.data;
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default newsSlice.reducer;
