import  {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import {AuthState} from "../../types/index";

const initialState: AuthState = {
  loading: false,
  data: null,
  error: null,
}

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (token: string) => {
    const response = await axios.get("http://localhost:5000/api/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

export default authSlice.reducer;