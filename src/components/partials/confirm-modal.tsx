import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface IConfirmationModal {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
}
const ConfirmationModal = ({
    show,
    onHide,
    onConfirm,
  }: IConfirmationModal) => {
  
    return (
      <Modal show={show} onHide={onHide} centered size="sm">
        <div style={{ backgroundColor: '#f0f0f0' }}>
          <Modal.Header closeButton>
            <Modal.Title>Potwierdzenie</Modal.Title>
          </Modal.Header>
          <Modal.Body>Czy na pewno chcesz kontynuować?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={onHide}>
              Anuluj
            </Button>
            <Button variant="success" onClick={() => {onConfirm(); onHide();}}>
              Tak
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  };
  
  export default ConfirmationModal;
  
