import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/Home.tsx";
import Catalogue from "./pages/Catalogue.tsx";
import Installations from "./pages/Installations.tsx";
import Details from "./pages/Details.tsx";
import Skeleton from "./components/Skeleton.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/apps",
        element: <Catalogue />,
      },
      {
        path: "/installation",
        element: <Installations />,
      },
      {
        path: "/detail/:id",
        element: <Details />,
      },
      {
        path: "/loading",
        element: <Skeleton/>,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
