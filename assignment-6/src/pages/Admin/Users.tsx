// TODO: ADD functionality and styling

import Skeleton from "../../components/Skeleton";
import { useGetUsersQuery } from "../../features/users/userApiSlice";
import type { Users } from "../../interfaces/interfaces";
import CustomErrorPage from "../AppError";

function Users() {
  const {
    data: users,
    isLoading,
    error
  } = useGetUsersQuery(undefined);
console.log(users);
  return (<>
    {
      isLoading ? <><Skeleton/></>:
      error? <><CustomErrorPage/></>:
      <><div>Users</div></>
    }
    </>);
}

export default Users;
