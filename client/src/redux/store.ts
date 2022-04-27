import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { profileSlice } from "./slices/profile";
import { shipmentsSlice } from "./slices/shipments";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    shipments: shipmentsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
