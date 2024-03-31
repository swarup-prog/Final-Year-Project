import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchGames = createAsyncThunk("games/getAllGames", async () => {
  const response = await axios.get("/game/getAll");
  return response.data;
});

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGames.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchGames.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default gameSlice.reducer;
