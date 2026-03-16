import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <main>
        <Nav />
        <section className="min-h-screen">
          <Outlet />
        </section>
        <Footer />
      </main>
    </>
  );
}

export default App;
