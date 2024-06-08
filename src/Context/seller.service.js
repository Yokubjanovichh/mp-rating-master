import { apiSlice } from "./api.service";

export const sellerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get seller info: /api/v1/sellers/user-info
    getSellerInfo: builder.query({
      query: () => `/api/v1/sellers/user-info`,
    }),
  }),
});

export const { useGetSellerInfoQuery } = sellerApi;
