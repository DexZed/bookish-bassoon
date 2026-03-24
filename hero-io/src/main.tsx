import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Nav from "./components/Nav.tsx";
import Footer from "./components/Footer.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));
const Catalogue = lazy(() => import("./pages/Catalogue.tsx"));
const Installations = lazy(() => import("./pages/Installations.tsx"));
const Details = lazy(() => import("./pages/Details.tsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <>
            <Nav />
            <Home />
            <Footer />
          </>
        ),
      },
      {
        path: "/apps",
        element: (
          <>
            <Nav />
            <Catalogue />
            <Footer />
          </>
        ),
      },
      {
        path: "/installation",
        element: (
          <>
            <Nav />
            <Installations />
            <Footer />
          </>
        ),
      },
      {
        path: "/detail/:id",
        element: (
          <>
            <Nav />
            <Details />
            <Footer />
          </>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
