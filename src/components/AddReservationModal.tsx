import React from 'react';
import { IconX, IconUser, IconCar, IconFileCheck } from '@tabler/icons-react';
import './AddReservationModal.scss';

interface AddReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddReservationModal: React.FC<AddReservationModalProps> = ({ isOpen, onClose }) => {

    if (!isOpen) return null;

    return (
        <div className="reservation-modal-overlay">
            <div className="add-reservation-modal">
                <header className="modal-header">
                    <h2>Nouvelle Réservation</h2>
                    <button className="close-btn" onClick={onClose}>
                        <IconX size={20} />
                    </button>
                </header>

                <form className="modal-form" onSubmit={(e) => { e.preventDefault(); onClose(); }}>

                    <section className="form-section flex-col">
                        <div className="form-section-header">
                            <IconUser size={18} />
                            <h3>Informations Client</h3>
                        </div>

                        <div className="form-group full-width">
                            <label>Nom Complet du Client *</label>
                            <input type="text" placeholder="ex: Marie Dubois" required />
                        </div>

                        <div className="form-row">
                            <div className="form-group half">
                                <label>Email *</label>
                                <input type="email" placeholder="email@exemple.com" required />
                            </div>
                            <div className="form-group half">
                                <label>Téléphone *</label>
                                <input type="tel" placeholder="+33 6 12 34 56 78" required />
                            </div>
                        </div>
                    </section>

                    <section className="form-section flex-col">
                        <div className="form-section-header">
                            <IconCar size={18} />
                            <h3>Détails de la Réservation</h3>
                        </div>

                        <div className="form-group full-width">
                            <label>Véhicule *</label>
                            <select defaultValue="BMW Serie 5 - €95/jour">
                                <option value="BMW Serie 5 - €95/jour">BMW Serie 5 - €95/jour</option>
                                <option value="Audi Q5 - €85/jour">Audi Q5 - €85/jour</option>
                                <option value="Mercedes Classe C - €120/jour">Mercedes Classe C - €120/jour</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-group half">
                                <label>Date de Début *</label>
                                <input type="date" required />
                            </div>
                            <div className="form-group half">
                                <label>Date de Fin *</label>
                                <input type="date" required />
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label>Statut *</label>
                            <select defaultValue="Confirmée">
                                <option value="Confirmée">Confirmée</option>
                                <option value="En cours">En cours</option>
                                <option value="Annulée">Annulée</option>
                                <option value="Terminée">Terminée</option>
                            </select>
                        </div>
                    </section>

                    <footer className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
                        <button type="submit" className="btn-submit">
                            <IconFileCheck size={18} />
                            Créer la Réservation
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default AddReservationModal;
