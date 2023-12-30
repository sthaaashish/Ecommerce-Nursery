import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./Constant";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (query) => ({
        url: "/",
        providesTags: ["Product"],
      }),
    }),

    getProductsById: builder.query({
      query: (query) => ({
        url: `/product/${query}`,
      }),
      providesTags: ["Product"],
    }),

    getProductsByCategory: builder.query({
      query: (query) => ({
        url: `/productCategory/${query}`,
      }),
      providesTags: ["Product"],
    }),

    getProductsBySearch: builder.query({
      query: (query) => ({
        url: `/api/search-product/${query}`,
      }),
      providesTags: ["Product"],
    }),

    getProductsByCollection: builder.query({
      query: (query) => ({
        url: `/productCollection/${query}`,
      }),
      providesTags: ["Product"],
    }),

    addProducts: builder.mutation({
      query: (query) => ({
        url: "/api/create-product",
        body: query.body,
        method: "POST",
        headers: {
          Authorization: query.token,
        },
      }),
      invalidatesTags: ["Product"],
    }),

    PostReview: builder.mutation({
      query: (query) => ({
        url: `/api/review-product/${query.id}`,
        body: query.body,
        method: "PATCH",
        headers: {
          Authorization: query.token,
        },
      }),
      invalidatesTags: ["Product"],
    }),

    updateProducts: builder.mutation({
      query: (query) => ({
        url: `/api/update-product/${query.id}`,
        body: query.body,
        method: "PATCH",
        headers: {
          Authorization: query.token,
        },
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProducts: builder.mutation({
      query: (query) => ({
        url: `/api/delete-product/${query.id}`,
        body: query.body,
        method: "DELETE",
        headers: {
          Authorization: query.token,
        },
      }),
      invalidatesTags: ["Product"],
    }),

    sendMessages: builder.mutation({
      query: (query) => ({
        url: `/sendMessage`,
        body: query.body,
        method: "POST",
        headers: {
          Authorization: query.token,
        },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsByIdQuery,
  useUpdateProductsMutation,
  useDeleteProductsMutation,
  useAddProductsMutation,
  useGetProductsByCollectionQuery,
  useGetProductsByCategoryQuery,
  useSendMessagesMutation, 
  usePostReviewMutation,
  useGetProductsBySearchQuery
} = productApi;
