import { useDispatch, useSelector, useStore } from "react-redux";

import type { RootState, AppDispatch, AppStore } from "./store";
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // eslint-disable-line
export const useAppSelector = useSelector.withTypes<RootState>(); // eslint-disable-line
export const useAppStore = useStore.withTypes<AppStore>();
