import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./Constant";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({

    getAllOrders: builder.query({
      query: (token) => ({
        url: "/api/order/all",
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["Order"],
    }),

    getOrderByUser: builder.query({
      query: (token) => ({
        url: `/api/order/user`,
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["Order"],
    }),

    getOrderById: builder.query({
      query: (query) => ({
        url: `/api/orderById/${query.id}`,
        headers: {
          Authorization: query.token,
        },
      }),
      invalidatesTags: ["Order"],
    }),

    addOrder: builder.mutation({
      query: (query) => ({
        url: "/api/create-order",
        body: query.body,
        method: "POST",
        headers: {
          Authorization: query.token,
        },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useAddOrderMutation,
  useGetOrderByUserQuery,
  useGetOrderByIdQuery,
} = orderApi;
