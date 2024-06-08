import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://api-organic.mprating.ru",
  realm: "mprating-test",
  clientId: "general",
});

// Automatically set loading state based on a request's status
export const reLoading = createSlice({
  name: "loading",
  initialState: false,
  reducers: { setLoading: (state, action) => action.payload },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      () => true
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/fulfilled"),
      () => false
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      () => false
    );
  },
});

export const loading = reLoading.reducer;

// Create a base query instance for Redux Toolkit Query
const baseQuery = fetchBaseQuery({
  baseUrl: "https://organic.mprating.ru",
  prepareHeaders: async (headers, { getState }) => {
    // check if user is authenticated
    const token = localStorage.getItem("token") || null;
    headers.set("Content-Type", "application/json");

    if (!token) {
      const isAuth = await keycloak.init({ onLoad: "check-sso" });
      if (!isAuth) return await keycloak.login();
      localStorage.setItem("token", keycloak.token);
      return headers.set("Authorization", `Bearer ${keycloak.token}`);
    }

    if (token) return headers.set("Authorization", `Bearer ${token}`);
  },
});

// if token expired or not valid - reauth user (Unauthorization error)
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    localStorage.clear();
    sessionStorage.clear();
    return keycloak.login();
  }
  return result;
};

// Create an auto-generated hooks for each endpoint
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["updateCouriers", "updateTs"],
  endpoints: (builder) => ({}),
});
