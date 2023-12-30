import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './Constant';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl:baseUrl }),
  tagTypes:['User'],
  endpoints: (builder) => ({
    
    userLogin: builder.mutation({
      query: (query) => ({
        url:'/api/userLogin',
        method:"POST",
        body:query,
      }),
    }),

    userRegister: builder.mutation({
      query: (query) => ({
        url:'/api/userRegister',
        method:"POST",
        body:query,
      }),
    }),


    userUpdate: builder.mutation({
      query: (query) => ({
        url:'/api/user/update',
        method:"PATCH",
        body: query.body,
        headers:{
          Authorization: query.token
        }
      }),
      invalidatesTags:['User']
    }),
   
  }),
})


export const { useUserLoginMutation,useUserRegisterMutation,useUserUpdateMutation }=authApi;