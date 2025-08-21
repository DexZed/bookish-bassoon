import { Suspense } from "react";
import { Outlet, Link } from "react-router";
import Skeleton from "../components/Skeleton";
// TODO: Fix styling and update route components
export default function AdminLayout() {
  return (
    <div>
      <nav>
        <Link to="/admin/users">👤 Users</Link> |{" "}
        <Link to="/admin/parcels">📦 Parcels</Link>
      </nav>
      <hr />
      <Suspense fallback={<Skeleton/>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
