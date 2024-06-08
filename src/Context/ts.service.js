import { apiSlice } from "./api.service";

export const tsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // add a new ts: /api/v1/tasks/tasks
    addTs: builder.mutation({
      query: (data) => ({
        url: `/api/v1/sellers/tasks`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["updateTs"],
    }),

    // get all ts: /api/v1/tasks/tasks
    getTs: builder.query({
      query: () => `/api/v1/tasks/tasks`,
      providesTags: ["updateTs"],
    }),

    // get one ts: /api/v1/tasks/tasks/{id}
    getOneTs: builder.query({
      query: (id) => `/api/v1/tasks/tasks/${id}`,
      providesTags: ["updateTs"],
    }),

    // POST product info: /api/v1/sellers/products/info
    productInfo: builder.mutation({
      query: (data) => ({
        url: `/api/v1/sellers/products/info`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["updateTs"],
    }),

    // POST /api/v1/sellers/products/calc-prices
    calcPrices: builder.mutation({
      query: (data) => ({
        url: `/api/v1/sellers/products/calc-prices`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["updateTs"],
    }),

    // Get all cities: /cities
    getCities: builder.query({
      query: () => `/cities`,
    }),
  }),
});

export const {
  useAddTsMutation,
  useGetTsQuery,
  useGetOneTsQuery,
  useProductInfoMutation,
  useCalcPricesMutation,
  useGetCitiesQuery,
} = tsApi;
