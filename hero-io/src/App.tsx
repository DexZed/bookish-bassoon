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
        <ToastContainer/>
        <AppContextProvider>
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <section  className="h-full">
                <Suspense fallback={<Skeleton/>}>
                  <Outlet />
                </Suspense>
              </section>
            </PageTransition>
          </AnimatePresence>
        </AppContextProvider>
        
      </main>
    </>
  );
}

export default App;
