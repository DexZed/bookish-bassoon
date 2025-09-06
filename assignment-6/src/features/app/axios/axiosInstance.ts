import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { setAuthData, clearAuthData } from "../../auth/authSlice";
const rawBaseUrl = import.meta.env.VITE_BASE_URL?.trim();
const BASE_URL = rawBaseUrl
  ? rawBaseUrl.replace(/\/+$/, "")
  : "http://localhost:3000";
const SUFFIXED_BASE_URL = `${BASE_URL}/api/v1`;

const axiosInstance = axios.create({
  baseURL: SUFFIXED_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;

// 👉 custom baseQuery
export const axiosBaseQuery =
  (): BaseQueryFn<AxiosRequestConfig, unknown, unknown> =>
  async (args, api) => {
    try {
      const result = await axiosInstance(args);
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      // if access token expired
      if (err.response?.status === 401 || err.response?.status === 403) {
        try {
          // refresh using axios (still same instance, so withCredentials works)
          const refreshResponse = await axiosInstance.get("/refresh");
          const newAccessToken = (refreshResponse.data as any)?.accessToken;

          if (newAccessToken) {
            // ✅ update Redux state here
            api.dispatch(setAuthData({ accessToken: newAccessToken }));

            // retry the original request with new token
            const retryResult = await axiosInstance({
              ...args,
              headers: {
                ...(args.headers || {}),
                Authorization: `Bearer ${newAccessToken}`,
              },
            });

            return { data: retryResult.data };
          } else {
            api.dispatch(clearAuthData());
          }
        } catch (refreshError) {
          api.dispatch(clearAuthData());
          return {
            error: {
              status: (refreshError as AxiosError).response?.status || "FETCH_ERROR",
              data: (refreshError as AxiosError).response?.data || "Failed to refresh",
            },
          };
        }
      }

      // normal error passthrough
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };