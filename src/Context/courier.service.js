import { apiSlice } from "./api.service";

export const courierApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Gel all couriers: /api/v1/sellers/couriers
    getCouriers: builder.query({
      query: () => `/api/v1/sellers/couriers`,
      providesTags: ["updateCouriers"],
    }),

    // Add new courier: /api/v1/sellers/couriers
    addCourier: builder.mutation({
      query: (data) => ({
        url: `/api/v1/sellers/couriers`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["updateCouriers"],
    }),

    // Delete courier by id: /api/v1/sellers/couriers/{id}
    deleteCourier: builder.mutation({
      query: (id) => ({
        url: `/api/v1/sellers/couriers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["updateCouriers"],
    }),
  }),
});

export const {
  useGetCouriersQuery,
  useAddCourierMutation,
  useDeleteCourierMutation,
} = courierApi;
