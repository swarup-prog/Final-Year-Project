import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import { authReducer } from "../features";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: authReducer,
  },
});
