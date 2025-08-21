import { Outlet, useLocation } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();

  // Hide global navbar for dashboards
  const hideNavbar = location.pathname.startsWith("/sender")
    || location.pathname.startsWith("/receiver")
    || location.pathname.startsWith("/admin");
  return (
    <>
      {!hideNavbar && (
        <Navbar></Navbar>
      )}
       <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
