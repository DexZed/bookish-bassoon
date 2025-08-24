import { apiSlice } from "../app/api/apiSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login : builder.mutation({
            query: credentials => ({
                url:"/auth/login",
                method:"POST",
                body: {...credentials}
            })
        }),
        logout: builder.mutation<void,void>({
            query: () => ({ 
                url:"/auth/logout",
                method:"GET"
            })
        })
    }),
})

export const { useLoginMutation,useLogoutMutation} = authApiSlice