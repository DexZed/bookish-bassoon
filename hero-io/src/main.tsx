import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/apps",
        element: <div>Apps Not implemented</div>,
      },
      {
        path: "/installation",
        element: <div>Installation Not implemented</div>,
      },
      {
        path: "/detail/:id",
        element: <div>Detail Not implemented</div>,
      },
      {
        path: "/not-found",
        element: <div>Not Found</div>,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
