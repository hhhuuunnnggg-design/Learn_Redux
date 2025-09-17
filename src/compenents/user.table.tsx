import { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  createNewUser,
  deleteUser,
  fetchListUser,
  updateUser,
} from "../redux/user/user.slide";
import UserCreateModal from "./modal/user.create.modal";
import UserDeleteModal from "./modal/user.delete.modal";
import UserUpdateModal from "./modal/user.update.modal";

const UserTable = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.listUser);
  type User = { id: number; name: string; email: string };

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch(fetchListUser());
    toast.success("Fetch users successfully");
  }, []);

  const nextId = useMemo(() => {
    if (!users.length) return 1;
    return Math.max(...users.map((u) => u.id)) + 1;
  }, [users]);

  const openAdd = () => {
    setShowAdd(true);
  };
  const submitAdd = (userData: Omit<User, "id">) => {
    const newUser: User = { id: nextId, ...userData };
    dispatch(createNewUser(userData));
    console.log("User vừa mới được thêm vào:", newUser);
    setShowAdd(false);
  };

  const openEdit = (user: User) => {
    setEditingUser(user);
    setShowEdit(true);
  };
  const submitEdit = (updatedUser: User) => {
    console.log("User cũ:", editingUser);
    console.log("User mới sau khi sửa:", updatedUser);

    dispatch(updateUser(updatedUser));
    setShowEdit(false);
    setEditingUser(null);
  };

  const openDelete = (user: User) => {
    setDeletingUser(user);
    setShowDelete(true);
  };
  const submitDelete = () => {
    if (!deletingUser) return;

    console.log("User bị xóa:", deletingUser);
    dispatch(deleteUser(deletingUser.id));
    setShowDelete(false);
    setDeletingUser(null);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <h3 style={{ margin: 0 }}>Users</h3>
        <Button variant="primary" onClick={openAdd}>
          + Add User
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: 64 }}>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th style={{ width: 160 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => openEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => openDelete(user)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* Add Modal */}
      <UserCreateModal
        show={showAdd}
        onHide={() => setShowAdd(false)}
        onSubmit={submitAdd}
      />

      {/* Edit Modal */}
      <UserUpdateModal
        show={showEdit}
        user={editingUser}
        onHide={() => setShowEdit(false)}
        onSubmit={submitEdit}
      />

      {/* Delete Confirm Modal */}
      <UserDeleteModal
        show={showDelete}
        user={deletingUser}
        onHide={() => setShowDelete(false)}
        onConfirm={submitDelete}
      />
    </>
  );
};

export default UserTable;
