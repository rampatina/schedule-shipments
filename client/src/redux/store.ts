import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { partnersSlice } from "./slices/partners";
import { profileSlice } from "./slices/profile";
import { deliveriesSlice, shipmentsSlice } from "./slices/shipments";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    shipments: shipmentsSlice.reducer,
    deliveries: deliveriesSlice.reducer,
    partners: partnersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
