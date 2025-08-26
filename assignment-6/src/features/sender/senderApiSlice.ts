import type { Parcel, ParcelsResponse } from "../../interfaces/globalInterfaces";
import { apiSlice } from "../app/api/apiSlice";

export const senderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSenderParcels: builder.query<ParcelsResponse, string>({
      query: (id) => `parcel/sender/${id}`,
      providesTags: ["Sender"],
      transformErrorResponse: (response: any) => {
        return response.data;
      },
    }),
    addSenderParcel: builder.mutation({
      query: (data) => ({
        url: "parcel/sender",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sender"],
    }),
    cancelSenderParcel: builder.mutation({
        query: (id) => ({
        url: `parcel/sender/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Sender"],
    }),
    senderStatusLog: builder.query<Parcel,string>({
        query: (id) => `parcel/sender/status/${id}`,
        providesTags: ["Sender"],
    })
  }),
});

export const {
  useGetSenderParcelsQuery,
  useAddSenderParcelMutation,
  useCancelSenderParcelMutation,
  useSenderStatusLogQuery
} = senderApiSlice;