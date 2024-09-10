import { createSlice } from "@reduxjs/toolkit";

export const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState: [],
  reducers: {
    addHistoryMessage: (state, action) => {
      state.push(action.payload);
    },
    setChatHistory: (state, action) => {
      return action.payload;
    },
  },
});

export const { addHistoryMessage, setChatHistory } = chatHistorySlice.actions;

export const chatHistoryReducer = chatHistorySlice.reducer;
