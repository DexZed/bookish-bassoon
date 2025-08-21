import { Suspense } from "react";
import { Link, Outlet } from "react-router";
// TODO: Fix styling and update route components
export default function SenderLayout() {
  return (
    <div>
      <nav>
        <Link to="/sender/create">➕ Create Parcel</Link> |{" "}
        <Link to="/sender/parcels">📋 My Parcels</Link>
      </nav>
      <hr />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}