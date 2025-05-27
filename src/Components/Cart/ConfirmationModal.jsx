import React from 'react';
import './confirmationModal.scss'

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>Bạn có muốn xoá sản phẩm khỏi danh sách?</p>
                <button onClick={onConfirm}>Có</button>
                <button onClick={onClose}>Không</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;