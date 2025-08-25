// TODO: ADD functionality and styling

import Skeleton from "../../components/Skeleton";

import {
  useBlockUserMutation,
  useGetUsersQuery,
  useUnblockUserMutation,
} from "../../features/users/userApiSlice";
import { showErrorAlert, showSuccessAlert } from "../../utilities/utils";

import CustomErrorPage from "../AppError";

function Users() {
  const { data, isLoading, error } = useGetUsersQuery(undefined);
  const [block] = useBlockUserMutation();
  const [unblock] = useUnblockUserMutation();

  async function handleBlockUser(id: string) {
    try {
      await block(id).unwrap();
      showSuccessAlert("Success", "User blocked successfully");
    } catch (error) {
      console.error(error);
      showErrorAlert("Error", error as string);
    }
  }

  async function handleUnblockUser(id: string) {
    try {
      await unblock(id).unwrap();
      showSuccessAlert("Success", "User unblocked successfully");
    } catch (error) {
      console.error(error);
      showErrorAlert("Error", error as string);
    }
  }

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton />
        </>
      ) : error ? (
        <>
          <CustomErrorPage />
        </>
      ) : (
        <>
          <article>
            <h2>Users</h2>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {data?.users.map((user, idx) => (
                    <tr key={idx}>
                      <th>{idx + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td className="flex gap-2">
                        <button
                          onClick={() => handleUnblockUser(user.id)}
                          className="btn btn-accent btn-outline rounded-full btn-xs"
                          disabled={!user.isBlocked}
                        >
                          Unblock
                        </button>
                        <button
                          onClick={() => handleBlockUser(user.id)}
                          className="btn btn-error btn-outline rounded-full btn-xs"
                          disabled={user.isBlocked}
                        >
                          Block
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </>
      )}
    </>
  );
}

export default Users;
