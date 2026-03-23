import { lazy, StrictMode, Suspense, type JSX } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Skeleton from "./components/Skeleton.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));
const Catalogue = lazy(() => import("./pages/Catalogue.tsx"));
const Installations = lazy(() => import("./pages/Installations.tsx"));
const Details = lazy(() => import("./pages/Details.tsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));

const suspenseWrap = (element: JSX.Element) => (
  <Suspense fallback={<Skeleton />}>{element}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: suspenseWrap(<ErrorPage />),
    children: [
      { index: true, element: suspenseWrap(<Home />) },
      {
        path: "/apps",
        element: suspenseWrap(<Catalogue />),
      },
      {
        path: "/installation",
        element: suspenseWrap(<Installations />),
      },
      {
        path: "/detail/:id",
        element: suspenseWrap(<Details />),
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
