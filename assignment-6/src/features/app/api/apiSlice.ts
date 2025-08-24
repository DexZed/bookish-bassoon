import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthData, clearAuthData } from "../../auth/authSlice";
import type { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import type { RootState } from "../store";

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
    const token = state.auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
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
  if (result.error?.status === 403) {
    console.info("Sending Refresh Token");
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.info("New Access Token:", refreshResult);
    if (refreshResult.data) {
      const state = api.getState() as RootState;
      const user = state.auth;
      // store new token
      api.dispatch(setAuthData({ ...user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearAuthData());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
