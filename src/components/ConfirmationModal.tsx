import React from 'react';
import { IconAlertTriangle, IconX } from '@tabler/icons-react';
import './ConfirmationModal.scss';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message,
    isLoading = false
}) => {
    if (!isOpen) return null;

    return (
        <div className="confirmation-modal-overlay">
            <div className="confirmation-modal">
                <header className="modal-header">
                    <div className="header-title">
                        <IconAlertTriangle size={24} className="alert-icon" />
                        <h2>{title}</h2>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <IconX size={20} />
                    </button>
                </header>

                <div className="modal-body">
                    <p>{message}</p>
                </div>

                <footer className="modal-footer">
                    <button type="button" className="btn-cancel" onClick={onClose} disabled={isLoading}>Annuler</button>
                    <button type="button" className="btn-confirm" onClick={() => {
                        onConfirm();
                    }} disabled={isLoading}>
                        {isLoading ? <span className="loader"></span> : null}
                        {isLoading ? "En cours..." : "Confirmer"}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ConfirmationModal;
