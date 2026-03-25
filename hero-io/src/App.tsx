import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import AppContextProvider from "./store/State";
import { AnimatePresence } from "motion/react";
import PageTransition from "./components/PageTransition";
import { lazy, Suspense, type JSX } from "react";
import Skeleton from "./components/Skeleton";
import { ToastContainer } from "react-toastify";
import Nav from "./components/Nav.tsx";
import Footer from "./components/Footer.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));
const Catalogue = lazy(() => import("./pages/Catalogue.tsx"));
const Installations = lazy(() => import("./pages/Installations.tsx"));
const Details = lazy(() => import("./pages/Details.tsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));

function Container({ children }: { children: JSX.Element }) {
  return (
    <>
      <Suspense fallback={<Skeleton />}>
        <PageTransition>
          <Nav />
          {children}
          <Footer />
        </PageTransition>
      </Suspense>
    </>
  );
}

function App() {
  const location = useLocation();
  return (
    <>
      <main>
        <ToastContainer />
        <AppContextProvider>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                index
                element={
                  <Container>
                    <Home />
                  </Container>
                }
              />
              <Route
                path="/apps"
                element={
                  <Container>
                    <Catalogue />
                  </Container>
                }
              />
              <Route
                path="/installation"
                element={
                  <Container>
                    <Installations />
                  </Container>
                }
              />
              <Route
                path="/detail/:id"
                element={
                  <Container>
                    <Details />
                  </Container>
                }
              />
              <Route
                path="/*"
                element={
                  <Container>
                    <ErrorPage />
                  </Container>
                }
              />
            </Routes>
          </AnimatePresence>
        </AppContextProvider>
      </main>
    </>
  );
}

export default App;
