import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../features/app/hooks";
import { showErrorAlert } from "../utilities/utils";
import { BYPASS_PTOTECTED_ROUTE } from "../config/config";


type Props = { children: React.ReactNode; allowedRoles?: string[] };

function Private({ children }: Props) {
  const location = useLocation();
  const { isBlocked, role } = useAppSelector((state) => state.auth);
  console.log("Private hit:", { BYPASS_PTOTECTED_ROUTE, isBlocked, role });
  if (BYPASS_PTOTECTED_ROUTE) {
    return children;
  }
  if (isBlocked) {
    showErrorAlert(
      "You have been blocked.",
      "You are not allowed to access this page."
    );
    return <Navigate to={"/"}></Navigate>;
  }

  return <>{role === null ? <><Navigate to={"/login"} state={{ from: location }} replace></Navigate></> : <>{children}</>}</>;
}

export default Private;
