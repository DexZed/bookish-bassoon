import { Suspense } from "react";
import { Link, Outlet, useLocation } from "react-router";
import Skeleton from "../components/Skeleton";
import { useAppSelector } from "../features/app/hooks";
import AppContainer from "../components/Container";
import Dash from "../components/Dash";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
// TODO: Fix styling and update route components

export default function ReceiverLayout() {
  const selector = useAppSelector((state) => state.auth);
  const location = useLocation();
  const hideDash =
    location.pathname.startsWith("/receiver/incoming") ||
    location.pathname.startsWith("/receiver/history") 
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
    <AppContainer>
        <SideBar navLinks={receiverLinks}>
          <Suspense fallback={<Skeleton />}>
            {!hideDash && <Dash userData={selector}/>}
            <Outlet />
          </Suspense>
        </SideBar>
        <Footer />
      </AppContainer>
  );
}