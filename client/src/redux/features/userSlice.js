// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setUser(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo, setUser } = userSlice;
export default userSlice.reducer;
