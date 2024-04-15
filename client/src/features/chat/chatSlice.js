import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: null,
  error: null,
  selectedChat: JSON.parse(localStorage.getItem("selectedChat")) || null,
  chatActive: localStorage.getItem("selectedChat") ? true : false,
};

export const fetchUserChats = createAsyncThunk(
  "chat/fetchUserChats",
  async () => {
    const response = await axios.get("/chat");
    return response.data;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChat: (state, action) => {
      localStorage.setItem("selectedChat", JSON.stringify(action.payload));
      state.selectedChat = action.payload;
      state.chatActive = true;
    },
    clearActiveChat: (state) => {
      localStorage.removeItem("selectedChat");
      state.selectedChat = null;
      state.chatActive = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserChats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserChats.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUserChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setActiveChat, clearActiveChat } = chatSlice.actions;
export default chatSlice.reducer;
