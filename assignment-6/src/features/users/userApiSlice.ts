import type { UsersResponse } from "../../interfaces/globalInterfaces";
import { apiSlice } from "../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, undefined>({
      query: () => "/users",
      providesTags: ["User"],
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/users/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    unblockUser: builder.mutation({
      query: (id) => ({
        url: `/users/unblock/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    getUserByEmail: builder.query<UsersResponse, string>({
      query: (email) => `/${email}`,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useGetUserByEmailQuery,
} = userApiSlice;
