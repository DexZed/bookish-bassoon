// TODO: ADD functionality and styling

import Skeleton from "../../components/Skeleton";
import { useGetUsersQuery } from "../../features/users/userApiSlice";
import type { User, Users } from "../../interfaces/interfaces";
import CustomErrorPage from "../AppError";

function Users() {
  const {
    data: users,
    isLoading,
    error
  } = useGetUsersQuery(undefined);


  return (<>
    {
      isLoading ? <><Skeleton/></>:
      error? <><CustomErrorPage/></>:
      <><div>Users</div>
      <div>{users?.map((user:User) => (
        <ul key={user.id}></ul> 
      ))}</div></>
    }
    </>);
}

export default Users;
