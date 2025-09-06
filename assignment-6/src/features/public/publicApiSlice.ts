import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserResponse } from "../../interfaces/globalInterfaces";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const publicApiSlice = createApi({
  reducerPath: "publicApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUser: builder.query<UserResponse, string>({
      query: (email) => `/user/${email}`,
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: "api/v1/auth/register",
        method: "POST",
        body: user,
      }),
    })
  }),
});

export const { useGetUserQuery, useRegisterUserMutation } = publicApiSlice;


