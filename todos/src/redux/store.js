import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/authSlice";

const rootReducer = {
  auth: authSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
