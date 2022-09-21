import { Button, Modal } from 'react-bootstrap'

export default function ModalComponent({
  title,
  children,
  successHandle,
  declineHandle,
  onHide,
}) {
  return (
    <Modal show={true} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {declineHandle && (
          <Button variant="outline-danger" onClick={declineHandle}>
            Закрыть
          </Button>
        )}
        {successHandle && (
          <Button
            type="submit"
            variant="outline-success"
            onClick={successHandle}
          >
            Подтвердить
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}
