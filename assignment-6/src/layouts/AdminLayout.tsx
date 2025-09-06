import { Suspense } from "react";
import { Outlet, Link, useLocation } from "react-router";
import Skeleton from "../components/Skeleton";
import SideBar from "../components/SideBar";
import AppContainer from "../components/Container";
import AdminDash from "../components/AdminDash";
import Footer from "../components/Footer";
export default function AdminLayout() {
  const location = useLocation();
  const hideDash =
    location.pathname.startsWith("/admin/users") ||
    location.pathname.startsWith("/admin/parcels") ||
    location.pathname.startsWith("/admin/status");
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
      <SideBar navLinks={adminLinks}>
        <Suspense fallback={<Skeleton />}>
          {!hideDash && <AdminDash />}
          <Outlet />
        </Suspense>
      </SideBar>
      <Footer />
    </>
  );
}
