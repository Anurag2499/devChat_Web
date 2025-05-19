/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
    emptyFeed: (state, action) => {
      return null;
    },
  },
});

export const { addFeed, removeUserFromFeed, emptyFeed } = feedSlice.actions;
export default feedSlice.reducer;
