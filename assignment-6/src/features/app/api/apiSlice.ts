import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthData, clearAuthData } from "../../auth/authSlice";
import type { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import type { RootState } from "../store";
//import { axiosBaseQuery } from "../../../context/refreshContext";
const USE_FORCED_RETRY = true;
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
  extraOptions: any
) => {
  // extraOptions._retryCount = (extraOptions._retryCount || 0) + 1;
  // console.info(`🔄 Request attempt #${extraOptions._retryCount}`, args);
  let result = await baseQuery(args, api, extraOptions);
  // send refresh token to get new access token
  if (result.error?.status === 401) {
    // console.warn("⚠️ Token expired, attempting refresh…");

    const oldToken = (api.getState() as RootState).auth.accessToken;
    // console.info("Old Token before refresh:", oldToken);
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    // console.info("New Access Token:", refreshResult);
    if (refreshResult.data) {
      // console.log("Successfully received new access token.");
      const newAccessToken = (
        refreshResult.data as {
          message: string;
          response: { accessToken: string };
        }
      ).response.accessToken;
      // console.info("New Token from refresh endpoint:", newAccessToken);
      if (oldToken === newAccessToken) {
        // console.warn("⚠️ Refresh returned SAME token as old one!");
      }

      // store new token
      api.dispatch(setAuthData({ accessToken: newAccessToken }));
      // const updatedToken = (api.getState() as RootState).auth.accessToken;
      // console.info("Token in state after dispatch:", updatedToken);
      if (USE_FORCED_RETRY) {
        // console.info("🔁 Retrying with FORCED header injection");
        result = await baseQuery(
          typeof args === "string"
            ? {
                url: args,
                headers: { Authorization: `Bearer ${newAccessToken}` },
              }
            : {
                ...args,
                headers: {
                  ...(args.headers ?? {}),
                  Authorization: `Bearer ${newAccessToken}`,
                },
              },
          api,
          extraOptions
        );
      } else {
        // retry the original query with new access token
        // console.log("Retrying the original request with the new token.");
        // console.info("🔁 Retrying with STATE-driven token (prepareHeaders)");
        result = await baseQuery(args, api, extraOptions);
      }
    } else {
      // console.error("Failed to refresh token. Logging out.");
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
