import { Suspense } from "react";
import { Link, Outlet, useLocation } from "react-router";
import Skeleton from "../components/Skeleton";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import SenderDash from "../components/SenderDash";
// TODO: Fix styling and update route components
export default function SenderLayout() {
  const location = useLocation();
  const hideDash =
    location.pathname.startsWith("/sender/create") ||
    location.pathname.startsWith("/sender/parcels") ||
    location.pathname.startsWith("/sender/status");
  const senderLinks = (
    <>
      <li>
        <Link to="/sender">🏠 Dashboard</Link>
      </li>
      <li>
        <Link to="/sender/create">➕ Create Parcel</Link>
      </li>
      <li>
        <Link to="/sender/parcels">📦 Parcels</Link>
      </li>
    </>
  );
  return (
    <>
      <SideBar navLinks={senderLinks}>
        <Suspense fallback={<Skeleton />}>
          {!hideDash && <SenderDash />}
          <Outlet />
        </Suspense>
      </SideBar>
      <Footer />
    </>
  );
}
