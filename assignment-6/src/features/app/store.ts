import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import { authSlice } from "../auth/authSlice";
import type { AuthState } from "../../interfaces/globalInterfaces";
import { publicApiSlice } from "../public/publicApiSlice";

// --- Define what we persist (breaks circular ref) ---
type PersistedState = {
  auth: AuthState;
};

// Load state from localStorage
const loadState = (): PersistedState | undefined => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState) as PersistedState;
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return undefined;
  }
};
// Save state to local storage
const saveState = (state: PersistedState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
    // ignore write errors
  }
};
const persistedState = loadState();
// ----Root Reducer----
const rootReducer = combineReducers({
  [publicApiSlice.reducerPath]: publicApiSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiSlice.middleware,
      publicApiSlice.middleware,
    ]),
  devTools: true,
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
store.subscribe(() => {
  const authState = store.getState().auth;
  saveState({ auth: authState });
});
