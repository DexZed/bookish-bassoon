import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter.tsx";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./features/app/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import CustomErrorPage from "./pages/AppError.tsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<CustomErrorPage />}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={AppRouter} />
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
