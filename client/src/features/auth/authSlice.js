import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (id) => {
    const response = await axios.get(`/user/getUserInfo/${id}`);
    return response.data;
  }
);

const CLEAR_USER_DATA = "auth/clearUserData";

export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(CLEAR_USER_DATA, (state) => {
      localStorage.clear();
      state.data = [];
      state.isLoggedIn = false;
    });
  },
});

export default authSlice.reducer;
