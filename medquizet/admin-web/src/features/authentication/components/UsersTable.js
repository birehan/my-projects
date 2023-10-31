import React, { useState } from "react";
import { Table, TableHead, Button } from "@mui/material";
import DeleteUser from "./UserDeleteDialog";

const UsersTable = ({ users, setSelectedComponent }) => {
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (id) => {
    setSelectedComponent(`user/${id}/edit`);
  };
  const handleDelete = (user) => {
    setSelectedUser(user);
    setOpenDeleteUser(true);
  };
  return (
    <Table
      sx={{ background: "white" }}
      className="table is-striped is-fullwidth"
    >
      {openDeleteUser && (
        <DeleteUser
          openDeleteUser={openDeleteUser}
          setOpenDeleteUser={setOpenDeleteUser}
          user={selectedUser}
        />
      )}

      <TableHead sx={{ background: "rgba(0, 0, 0, 0.7)", color: "white" }}>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </TableHead>
      <tbody>
        {users?.map((user, index) => (
          <tr
            style={{ justifyContent: "center", alignItems: "center" }}
            key={user?.id}
          >
            <td>{index + 1}</td>
            <td>{user?.name}</td>
            <td>{user?.email}</td>
            <td>{user?.role}</td>
            <td>
              <Button onClick={() => handleEdit(user?.id)}>Edit</Button>
              <Button onClick={() => handleDelete(user)} sx={{ color: "red" }}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;
