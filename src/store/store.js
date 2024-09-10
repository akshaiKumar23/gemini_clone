import { configureStore } from "@reduxjs/toolkit";
import { chatMessageReducer } from "./slices/chatMessages";
import { chatHistoryReducer } from "./slices/chatHistorySlice";

export const store = configureStore({
  reducer: {
    chatMessages: chatMessageReducer,
    chatHistory: chatHistoryReducer,
  },
});
