import { Modal, Button } from 'react-bootstrap';
import React from "react";
import type { UserType } from '../../pages/user/index.tsx';

interface CustomModalProps {
  showModal: boolean
  toggleModal: any
  user: UserType
  deleteUser: any
}

const CustomModal = ({ showModal, toggleModal, user, deleteUser }: CustomModalProps) => {
  return (
    <Modal show={showModal} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Alert</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>co chac chan muon xoa {user.name}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Close
        </Button>
        <Button variant="primary" onClick={() => deleteUser(user.id)}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
