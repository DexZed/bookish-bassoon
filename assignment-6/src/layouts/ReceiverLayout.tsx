import { Suspense } from "react";
import { Link, Outlet } from "react-router";
import Skeleton from "../components/Skeleton";
// TODO: Fix styling and update route components
export default function ReceiverLayout() {
  return (
    <div>
      <nav>
        <Link to="/receiver/incoming">📨 Incoming</Link> |{" "}
        <Link to="/receiver/history">🕓 History</Link>
      </nav>
      <hr />
      <Suspense fallback={<Skeleton/>}>
        <Outlet />
      </Suspense>
    </div>
  );
}