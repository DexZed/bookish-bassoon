
import { apiSlice } from "../app/api/apiSlice";


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<undefined,undefined>({
            query: () => '/users'
        })
    })
})

export const { useGetUsersQuery } = userApiSlice;