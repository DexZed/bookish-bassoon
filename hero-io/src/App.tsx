import {Outlet, useLocation} from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import AppContextProvider from "./store/State";
import { AnimatePresence } from "motion/react";

function App() {
  const location = useLocation();
  return (
    <>
      <main>
        <Nav />
        <AppContextProvider>
          <AnimatePresence mode="wait" >
          <section key={location.pathname} className="min-h-screen">
            <Outlet />
          </section>
          </AnimatePresence>
        </AppContextProvider>
        <Footer />
      </main>
    </>
  );
}

export default App;
