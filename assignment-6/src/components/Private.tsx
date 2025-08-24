import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../features/app/hooks";
import { showErrorAlert } from "../utilities/utils";


type Props = {featureFlag?: boolean, children: React.ReactNode; allowedRoles?: string[] };

function Private({ featureFlag,children }: Props) {
  const location = useLocation();
  const { isBlocked, role } = useAppSelector((state) => state.auth);
  if (!featureFlag) {
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
