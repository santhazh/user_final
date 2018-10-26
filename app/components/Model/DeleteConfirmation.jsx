import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Model.scss';

const DeleteConfirmation = props => {
    const { onHide, bodycontent, onConfirmation, buttons } = props;

    const onConfirm = () => {
        onConfirmation();
        onHide();
    };

    return (
        <Modal {...props} className="customPopupWrap" >
            <Modal.Header className="modal-header-styles">
                <button onClick={onHide} type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <Modal.Body className="delete-modal-body-styles">
                {bodycontent}
            </Modal.Body>
            <Modal.Footer className="modal-footer-styles">
                <Button className="modal-button-styles" onClick={onHide}>{buttons.cancel}</Button>
                <Button className="modal-button-styles" onClick={onConfirm}>{buttons.confirm}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmation;
