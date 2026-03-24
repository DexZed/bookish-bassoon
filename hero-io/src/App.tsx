import { Outlet, useLocation } from "react-router";
import "./App.css";
import AppContextProvider from "./store/State";
import { AnimatePresence } from "motion/react";
import PageTransition from "./components/PageTransition";
import { Suspense } from "react";
import Skeleton from "./components/Skeleton";

function App() {
  const location = useLocation();
  return (
    <>
      <main>
        
        <AppContextProvider>
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <section  className="min-h-screen">
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
