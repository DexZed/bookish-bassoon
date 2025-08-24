import { useNavigate } from "react-router";
import { useAppDispatch} from "../features/app/hooks";
import { useLogoutMutation } from "../features/slices/authApiSlice";
import CustomErrorPage from "../pages/AppError";
import { clearAuthData } from "../features/slices/authSlice";

type Props = {};

function LogoutButton({}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout, { error }] = useLogoutMutation();

  function handleClick() {
    logout();
    dispatch(clearAuthData())
    navigate("/");
  }
  return (
    <>
      {error ? (
        <>
          <CustomErrorPage />
        </>
      ) : (
        <>
          <div onClick={handleClick} className="btn-style skew-x-var [--tw-skew-x:-22.6deg]">
            Log Out
          </div>
        </>
      )}
    </>
  );
}

export default LogoutButton;
