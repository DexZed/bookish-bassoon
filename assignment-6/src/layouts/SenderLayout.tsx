import { Suspense } from "react";
import { Link, Outlet } from "react-router";
import Skeleton from "../components/Skeleton";
// TODO: Fix styling and update route components
export default function SenderLayout() {
  return (
    <div>
      <nav>
        <Link to="/sender/create">➕ Create Parcel</Link> |{" "}
        <Link to="/sender/parcels">📋 My Parcels</Link>
      </nav>
      <hr />
      <Suspense fallback={<Skeleton/>}>
        <Outlet />
      </Suspense>
    </div>
  );
}