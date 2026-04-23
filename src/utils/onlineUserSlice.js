/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const onlineUserSlice = createSlice({
  name: 'onlineUser',
  initialState: null,
  reducers: {
    addOnlineUser: (state, action) => {
      return action.payload;
    },
    removeOnlineUser: (state, action) => {
      return null;
    },
  },
});

export const { addOnlineUser, removeOnlineUser } = onlineUserSlice.actions;
export default onlineUserSlice.reducer;
