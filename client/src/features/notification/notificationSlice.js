import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: null,
  unreadCount: 0,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  "notification/",
  async () => {
    const response = await axios.get("/notifications", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session-token")}`,
      },
    });
    console.log(response);
    return response.data;
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.notifications;
      state.unreadCount = action.payload.unreadCount;
    });
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default notificationSlice.reducer;
