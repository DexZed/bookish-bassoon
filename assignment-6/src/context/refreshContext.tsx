import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";
import { useAppSelector, useAppDispatch } from "../features/app/hooks";
import { setAuthData, clearAuthData } from "../features/auth/authSlice";


type RefreshProps = {
  children: ReactNode;
};

const RefreshContext = createContext<(() => Promise<void>) | null>(null);

export default function RefreshProvider({ children }: RefreshProps) {
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // manual refresh function
  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/refresh", {
        method: "GET",
       // credentials: "include",
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });
      if (!response.ok) throw new Error("Refresh failed");
      const data = await response.json();
      console.log("data",data)
      if (data.accessToken) {
        dispatch(setAuthData({ accessToken: data.accessToken }));
      } else {
        dispatch(clearAuthData());
      }
    } catch (err) {
      console.error("Manual refresh error:", err);
      dispatch(clearAuthData());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (!accessToken) {
      console.warn("No access token in RefreshProvider");
      return;
    }

    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);

      if (response.status === 401) {
        try {
          await refresh();
          // after refresh, try request again with latest token from store
          const latestToken = (await import("../features/app/store")).store.getState().auth
            .accessToken;
          const retryConfig = {
            ...args[1],
            headers: {
              ...args[1]?.headers,
              Authorization: `Bearer ${latestToken}`,
            },
          };
          return await originalFetch(args[0], retryConfig);
        } catch {
          return response;
        }
      }

      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [accessToken, refresh]);

  return (
    <RefreshContext.Provider value={refresh}>
      {children}
    </RefreshContext.Provider>
  );
}

export function useRefresh() {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error(
      "useRefresh must be used within a RefreshProvider. Did you wrap the app with the RefreshProvider component?"
    );
  }
  return context;
}
