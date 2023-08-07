"use client";
import { Button, Modal } from "@/lib/bootstrap";
import AdicionarClienteForm from "../AdicionarClienteForm/AdicionarClienteForm";

export default function AdicionarClienteModal(props: {
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
}) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdicionarClienteForm />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          type="submit"
          form="adicionarClienteForm"
          onClick={() => {
            props.handleClose();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
