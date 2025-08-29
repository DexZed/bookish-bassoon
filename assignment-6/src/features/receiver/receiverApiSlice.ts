
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
            url: `parcel/receiver/confirm/${id}`,
            method: "PATCH",
            body: payload
        }),
        invalidatesTags: ["Receiver"]
    }),
    getHistory: builder.query<ParcelsResponse,{id:string,status:string}>({
    query: ({id,status}) => `parcel/receiver/history?receiver=${id}&status=${status}`,
        providesTags: ["Receiver"],
  })
  }),
});

export const {
  useGetIncomingQuery,
  useApproveParcelMutation,
  useGetHistoryQuery
} = receiverApiSlice;