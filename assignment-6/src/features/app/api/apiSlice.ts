import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthData, clearAuthData } from "../../auth/authSlice";
import type { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import type { RootState } from "../store";
//import { axiosBaseQuery } from "../../../context/refreshContext";
const rawBaseUrl = import.meta.env.VITE_BASE_URL?.trim();
const BASE_URL = rawBaseUrl
  ? rawBaseUrl.replace(/\/+$/, "")
  : "http://localhost:3000";
const SUFFIXED_BASE_URL = `${BASE_URL}/api/v1`;

const baseQuery = fetchBaseQuery({
  baseUrl: SUFFIXED_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    // console.log("State:", state);
    const token = state.auth.accessToken;
    // console.log("Token:", token);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);
  // send refresh token to get new access token
  if (result.error?.status === 401) {
    // console.log("Token expired. Attempting to refresh...");
    // if((extraOptions as any)?._retry){
    //    console.error("Endless loop detected: already retried once for this request");
    //     api.dispatch(clearAuthData());
    //     return {
    //       error:{
    //         status:"RETRY_LOOP",data:"Endless loop detected: already retried once for this request"
    //       }
    //     }
    //   }
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.info("New Access Token:", refreshResult);
    if (refreshResult.data) {
      // console.log("Successfully received new access token.");
      const newAccessToken = (refreshResult.data as { accessToken: string })
        .accessToken;
      const state = api.getState() as RootState;
      const user = state.auth;
      console.info("User State:", user);
      // store new token
      api.dispatch(setAuthData({ accessToken: newAccessToken }));
      // retry the original query with new access token
      // console.log("Retrying the original request with the new token.");
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error("Failed to refresh token. Logging out.");
      api.dispatch(clearAuthData());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["User", "Parcel", "Sender", "Receiver"],
  endpoints: () => ({}),
});
