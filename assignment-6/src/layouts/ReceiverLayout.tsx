import { Suspense } from "react";
import { Link, Outlet, useLocation } from "react-router";
import Skeleton from "../components/Skeleton";
import AppContainer from "../components/Container";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import ReceiverDash from "../components/ReceiverDash";
// TODO: Fix styling and update route components

export default function ReceiverLayout() {
  const location = useLocation();
  const hideDash =
    location.pathname.startsWith("/receiver/incoming") ||
    location.pathname.startsWith("/receiver/history");
  const receiverLinks = (
    <>
      <li>
        <Link to="/receiver/incoming">📨 Incoming</Link>
      </li>
      <li>
        <Link to="/receiver/history">🕓 History</Link>
      </li>
    </>
  );
  return (
    <>
      <SideBar navLinks={receiverLinks}>
        <Suspense fallback={<Skeleton />}>
          {!hideDash && <ReceiverDash />}
          <Outlet />
        </Suspense>
      </SideBar>
      <Footer />
    </>
  );
}
