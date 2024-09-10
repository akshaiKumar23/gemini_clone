import { createSlice } from "@reduxjs/toolkit";

export const chatMessages = createSlice({
  name: "chatMessage",
  initialState: [],
  reducers: {
    addMessage(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addMessage, setMessage } = chatMessages.actions;

export const chatMessageReducer = chatMessages.reducer;
