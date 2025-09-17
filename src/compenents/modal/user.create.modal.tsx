import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetCreateUserSuccess } from "../../redux/user/user.slide";

type User = { id: number; name: string; email: string };

interface UserCreateModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (user: Omit<User, "id">) => void;
}

const UserCreateModal = ({ show, onHide, onSubmit }: UserCreateModalProps) => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });

  const isCreateUserSuccess = useAppSelector(
    (state) => state.user.isCreateUserSuccess
  );

  useEffect(() => {
    if (isCreateUserSuccess == true) {
      toast.success("Thêm user thành công");
      dispatch(resetCreateUserSuccess());
    }
  }, [isCreateUserSuccess]);

  const handleSubmit = () => {
    onSubmit({ name: form.name, email: form.email });
    setForm({ name: "", email: "" });
  };

  const handleClose = () => {
    setForm({ name: "", email: "" });
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="addName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="addEmail">
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
          Add123
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserCreateModal;
