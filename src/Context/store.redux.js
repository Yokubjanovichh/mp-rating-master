import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiSlice, loading } from "./api.service";

export const store = configureStore({
  reducer: combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    loading, // loading: loading
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
