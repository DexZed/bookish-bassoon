import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import AppContextProvider from "./store/State";

function App() {
  return (
    <>
      <main>
        <Nav />
        <AppContextProvider>
          <section className="min-h-screen">
            <Outlet />
          </section>
        </AppContextProvider>
        <Footer />
      </main>
    </>
  );
}

export default App;
