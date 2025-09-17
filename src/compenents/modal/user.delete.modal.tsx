import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetDeleteUserSuccess } from "../../redux/user/user.slide";

type User = { id: number; name: string; email: string };

interface UserDeleteModalProps {
  show: boolean;
  user: User | null;
  onHide: () => void;
  onConfirm: () => void;
}

const UserDeleteModal = ({
  show,
  user,
  onHide,
  onConfirm,
}: UserDeleteModalProps) => {
  const dispatch = useAppDispatch();

  const isDeleteUserSuccess = useAppSelector(
    (state) => state.user.isDeleteUserSuccess
  );

  useEffect(() => {
    if (isDeleteUserSuccess === true) {
      toast.success("Xóa user thành công");
      dispatch(resetDeleteUserSuccess());
    }
  }, [isDeleteUserSuccess, dispatch]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete <strong>{user?.name}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDeleteModal;
