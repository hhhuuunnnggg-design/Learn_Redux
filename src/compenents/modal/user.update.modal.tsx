import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetUpdateUserSuccess } from "../../redux/user/user.slide";

type User = { id: number; name: string; email: string };

interface UserUpdateModalProps {
  show: boolean;
  user: User | null;
  onHide: () => void;
  onSubmit: (user: User) => void;
}

const UserUpdateModal = ({
  show,
  user,
  onHide,
  onSubmit,
}: UserUpdateModalProps) => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });

  const isUpdateUserSuccess = useAppSelector(
    (state) => state.user.isUpdateUserSuccess
  );

  useEffect(() => {
    if (isUpdateUserSuccess === true) {
      toast.success("Cập nhật user thành công");
      dispatch(resetUpdateUserSuccess());
    }
  }, [isUpdateUserSuccess, dispatch]);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleSubmit = () => {
    if (!user) return;
    onSubmit({ ...user, name: form.name, email: form.email });
  };

  const handleClose = () => {
    setForm({ name: "", email: "" });
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="editName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!form.name || !form.email}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserUpdateModal;
