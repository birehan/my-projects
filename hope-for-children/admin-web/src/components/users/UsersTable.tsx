import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  DeleteUserAction,
  FetchAllUsers,
} from "../../features/redux/userSlice";
import Loading from "../common/Loading";
import { User } from "../../types/types";
import { BsPlus } from "react-icons/bs";
import DeletePopup from "../common/DeletePopup";
import Notification from "../common/Notification";

const UsersTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, users, error, isDeleteSuccess } = useSelector(
    (state: any) => state.users
  );
  const { user } = useSelector((state: any) => state.auth);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    if (!user || user.userRole !== "SuperAdmin") {
      navigate("/");
    }
    if (users.length == 0) {
      dispatch(FetchAllUsers());
    }

    return () => {};
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto max-w-[100rem] flex flex-col gap-6 ">
      {isDeleteSuccess && (
        <Notification success={isDeleteSuccess} message="Delete succesffully" />
      )}

      {error && <Notification success={isDeleteSuccess} message={error} />}

      {openDelete && selectedUser && (
        <DeletePopup
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          id={selectedUser.userName}
          DeleteAction={DeleteUserAction}
        />
      )}

      <div className="flex flex-row justify-between items-center gap-4">
        <h3 className="text-primaryColor text-2xl font-bold">Users List</h3>

        <Link to="/user/register">
          <button
            type="button"
            className=" inline-flex justify-center items-center  gap-x-1.5 rounded-md bg-primaryColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primaryColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColorHover"
          >
            <BsPlus className=" h-6 w-6" aria-hidden="true" />
            Create User
          </button>
        </Link>
      </div>

      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Role
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((curUser: User, index: number) => {
            return (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap flex flex-center">
                  <div className="text-sm font-medium text-gray-900">
                    {curUser.userName}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {curUser.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {curUser.userRole}
                </td>
                <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                  <Link
                    to={`/user/update/${curUser.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => [
                      setOpenDelete(true),
                      setSelectedUser(curUser),
                    ]}
                    className="ml-2 text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
