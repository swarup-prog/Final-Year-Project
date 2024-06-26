import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  themeReducer,
  gameReducer,
  chatReducer,
  notificationReducer,
  liveReducer,
  newsReducer,
} from "../features";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: authReducer,
    games: gameReducer,
    chat: chatReducer,
    notifications: notificationReducer,
    liveStreams: liveReducer,
    news: newsReducer,
  },
});
