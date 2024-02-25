// store.js

import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./features/alertSlice"; // Import alertSlice without curly braces
import userReducer from "./features/userSlice";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    user: userReducer,
  },
});
