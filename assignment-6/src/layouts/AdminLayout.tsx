import { Suspense } from "react";
import { Outlet, Link } from "react-router";
import Skeleton from "../components/Skeleton";
import SideBar from "../components/SideBar";
import AppContainer from "../components/Container";
import { useAppSelector } from "../features/app/hooks";
export default function AdminLayout() {
  const selector = useAppSelector((state) => state.auth);
  const adminLinks = (
    <>
      <li>
        <Link to="/admin/users">👤 Users</Link>
      </li>
      <li>
        <Link to="/admin/parcels">📦 Parcels</Link>
      </li>
    </>
  );
  return (
    <>
      <AppContainer>
        <SideBar navLinks={adminLinks} user={`${selector.name}`}>
          <Suspense fallback={<Skeleton />}>
            <Outlet />
          </Suspense>
        </SideBar>
      </AppContainer>
    </>
  );
}
