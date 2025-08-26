import { Suspense } from "react";
import { Link, Outlet, useLocation } from "react-router";
import Skeleton from "../components/Skeleton";
import Dash from "../components/Dash";
import AppContainer from "../components/Container";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import { useAppSelector } from "../features/app/hooks";
// TODO: Fix styling and update route components
export default function SenderLayout() {
  const selector = useAppSelector((state) => state.auth);
  const location = useLocation();
  const hideDash =
    location.pathname.startsWith("/sender/create") ||
    location.pathname.startsWith("/sender/parcels");
  const senderLinks = (
    <>
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
      <AppContainer>
        <SideBar navLinks={senderLinks}>
          <Suspense fallback={<Skeleton />}>
            {!hideDash && <Dash userData={selector}/>}
            <Outlet />
          </Suspense>
        </SideBar>
        <Footer />
      </AppContainer>
    </>
  );
}
