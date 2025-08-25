import { url } from "zod";
import type { ParcelsResponse } from "../../interfaces/globalInterfaces";
import { apiSlice } from "../app/api/apiSlice";

export const parcelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParcels: builder.query<ParcelsResponse, undefined>({
      query: () => "/parcel/admin",
      providesTags: ["Parcel"],
    }),
    blockParcel: builder.mutation({
      query: (id) => ({
        url: `/parcel/admin/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),
    unblockParcel: builder.mutation({
      query: (id) => ({
        url: `/parcel/admin/unblock/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),
    updateStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/parcel/admin/status-log/${id}`,
        method: "PATCH",
        body: body
      }),
      invalidatesTags: ["Parcel"],
    }),
  }),
});
