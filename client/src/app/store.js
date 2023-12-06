import { configureStore } from "@reduxjs/toolkit";
import { authReducer, themeReducer } from "../features";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: authReducer,
  },
});
