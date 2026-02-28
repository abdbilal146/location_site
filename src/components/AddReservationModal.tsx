import React, { useState, useEffect } from 'react';
import { IconX, IconUser, IconCar, IconFileCheck } from '@tabler/icons-react';
import './AddReservationModal.scss';
import { useMutation, useQueries } from '@tanstack/react-query';
import { getAllClients } from '../api/client';
import { getAllCars } from '../api/car';
import { addReservation } from '../api/reservation';

interface AddReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddReservationModal: React.FC<AddReservationModalProps> = ({ isOpen, onClose }) => {


    const mutation = useMutation({
        mutationKey: ["reservation"],
        mutationFn: addReservation,
        onSuccess: (success) => {
            console.log(success);
            onClose();
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const results = useQueries({
        queries: [
            {
                queryKey: ['clients'],
                queryFn: getAllClients
            },
            {
                queryKey: ['cars'],
                queryFn: getAllCars
            }
        ]
    })

    const [clientsQuery, carsQuery] = results;

    const [formData, setFormData] = useState({
        clientId: 0,
        email: '',
        phone: '',
        carId: 0,
        startDate: '',
        endDate: '',
        status: 'CONFIRMED'
    });

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                clientId: 0,
                email: '',
                phone: '',
                carId: 0,
                startDate: '',
                endDate: '',
                status: 'CONFIRMED'
            });
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'carId' ? Number(value) : value
        }));
    };

    const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedClientId = Number(e.target.value);
        const selectedClient = clientsQuery.data?.find((c: any) => c.id === selectedClientId || Number(c.id) === selectedClientId);

        setFormData(prev => ({
            ...prev,
            clientId: selectedClientId,
            email: selectedClient ? selectedClient.email : prev.email,
            phone: selectedClient ? selectedClient.phoneNumber : prev.phone
        }));
    };

    const onSubmitForm = () => {
        console.log("Form Data Submitted:", formData);
        // Add submit logic here, similar to AddClientModal
        mutation.mutate({
            clientId: formData.clientId,
            carId: formData.carId,
            startDate: formData.startDate,
            endDate: formData.startDate,
            reservationStatus: formData.status

        })
    };

    if (clientsQuery.isLoading || carsQuery.isLoading) {
        return <div>Chargement...</div>;
    }

    if (clientsQuery.error || carsQuery.error) {
        return <div>Une erreur est survenue</div>;
    }

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

                <form className="modal-form" onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitForm();
                }}>

                    <section className="form-section flex-col">
                        <div className="form-section-header">
                            <IconUser size={18} />
                            <h3>Informations Client</h3>
                        </div>

                        <div className="form-group full-width">
                            <label>Client *</label>
                            <select name="clientId" value={formData.clientId} onChange={handleClientChange} required>
                                <option value={0} disabled>Sélectionner un client</option>
                                {clientsQuery.data?.map((client: any) => (
                                    <option key={client.id} value={client.id}>{client.fullName}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-group half">
                                <label>Email *</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@exemple.com" required />
                            </div>
                            <div className="form-group half">
                                <label>Téléphone *</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+33 6 12 34 56 78" required />
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
                            <select name="carId" value={formData.carId} onChange={handleChange} required>
                                <option value={0} disabled>Sélectionner un véhicule</option>
                                {carsQuery.data?.map((car: any) => (
                                    <option key={car.id} value={car.id}>{car.model} - €{car.rentPrice}/jour</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-group half">
                                <label>Date de Début *</label>
                                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                            </div>
                            <div className="form-group half">
                                <label>Date de Fin *</label>
                                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label>Statut *</label>
                            <select name="status" value={formData.status} onChange={handleChange}>
                                <option value="CONFIRMED">Confirmée</option>
                                <option value="IN_PROGRESS">En cours</option>
                                <option value="CANCELLED">Annulée</option>
                                <option value="COMPLETED">Terminée</option>
                            </select>
                        </div>
                    </section>

                    <footer className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
                        <button type="submit" className="btn-submit" disabled={mutation.isPending}>
                            {mutation.isPending ? (
                                <span className="loader"></span>
                            ) : (
                                <IconFileCheck size={18} />
                            )}
                            {mutation.isPending ? 'Création en cours...' : 'Créer la Réservation'}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default AddReservationModal;
