
import type { ParcelsResponse } from "../../interfaces/globalInterfaces";
import { apiSlice } from "../app/api/apiSlice";

export const receiverApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIncoming: builder.query<ParcelsResponse,string>({
        query: (id) => `parcel/receiver/${id}`,
        providesTags: ["Receiver"],
    }),
    approveParcel: builder.mutation({
        query: ({id,payload})=> ({
            url: `/receiver/confirm/${id}`,
            method: "PATCH",
            body: payload
        }),
        invalidatesTags: ["Receiver"]
    }),
    getHistory: builder.query<ParcelsResponse,undefined>({
    query: () => "/receiver/history",
        providesTags: ["Receiver"],
  })
  }),
});

export const {
  useGetIncomingQuery,
  useApproveParcelMutation,
  useGetHistoryQuery
} = receiverApiSlice;