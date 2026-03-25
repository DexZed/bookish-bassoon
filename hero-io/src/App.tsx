import { Outlet, useLocation } from "react-router";
import "./App.css";
import AppContextProvider from "./store/State";
import { AnimatePresence } from "motion/react";
import PageTransition from "./components/PageTransition";
import { Suspense } from "react";
import Skeleton from "./components/Skeleton";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();
  return (
    <>
      <main>
        <ToastContainer />
        <AppContextProvider>
          <Suspense fallback={<Skeleton />}>
            <AnimatePresence mode="wait">
              <section key={location.pathname} className="h-full">
                <PageTransition>
                  <Outlet />
                </PageTransition>
              </section>
            </AnimatePresence>
          </Suspense>
        </AppContextProvider>
      </main>
    </>
  );
}

export default App;
