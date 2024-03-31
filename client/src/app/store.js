import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  themeReducer,
  modalReducer,
  gameReducer,
} from "../features";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: authReducer,
    modal: modalReducer,
    games: gameReducer,
  },
});
