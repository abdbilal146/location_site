import React, { useState, useEffect } from 'react';
import { IconX, IconUser, IconMapPin, IconDeviceFloppy } from '@tabler/icons-react';
import './AddClientModal.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewClient } from '../api/client';

interface AddClientModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ isOpen, onClose }) => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        status: true
    });

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                zipCode: '',
                status: true
            });
        }
    }, [isOpen]);

    const mutation = useMutation({
        mutationKey: ["clients"],
        mutationFn: addNewClient,
        onSuccess: (data) => {
            console.log("client succed added", data)
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            onClose();
        },
        onError: (error) => {
            console.log("there is an error with the call", error)
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'status' ? value === 'true' : value
        }));
    };


    const createNewClient = (
        newClient: {
            fullName: string,
            email: string,
            phoneNumber: string,
            address: {
                address: string,
                city: string,
                postalCode: string
            },
            accountStatus: boolean
        }
    ) => {
        mutation.mutate({
            ...newClient
        })

    }


    const onSubmitForm = () => {
        const address = {
            address: formData.address,
            city: formData.city,
            postalCode: formData.zipCode
        }
        createNewClient(
            {
                fullName: formData.name,
                email: formData.email,
                phoneNumber: formData.phone,
                address: address,
                accountStatus: formData.status
            }

        )
    }



    if (!isOpen) return null;

    return (
        <div className="client-modal-overlay">
            <div className="add-client-modal">
                <header className="modal-header">
                    <h2>Ajouter un Nouveau Client</h2>
                    <button className="close-btn" onClick={onClose}>
                        <IconX size={20} />
                    </button>
                </header>

                <form className="modal-form" onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitForm()
                }}>

                    <section className="form-section flex-col">
                        <div className="form-section-header">
                            <IconUser size={18} />
                            <h3>Informations Personnelles</h3>
                        </div>

                        <div className="form-group full-width">
                            <label>Nom Complet *</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="ex: Marie Dubois" required />
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
                            <IconMapPin size={18} />
                            <h3>Adresse</h3>
                        </div>

                        <div className="form-group full-width">
                            <label>Adresse Complète</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="ex: 15 Rue de la Paix" />
                        </div>

                        <div className="form-row">
                            <div className="form-group half">
                                <label>Ville</label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="ex: Paris" />
                            </div>
                            <div className="form-group half">
                                <label>Code Postal</label>
                                <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="ex: 75002" />
                            </div>
                        </div>
                    </section>

                    <div className="form-group full-width">
                        <label>Statut du Compte *</label>
                        <select name="status" value={formData.status.toString()} onChange={handleChange}>
                            <option value="true">Actif</option>
                            <option value="false">Inactif</option>
                        </select>
                    </div>

                    <footer className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
                        <button type="submit" className="btn-submit" disabled={mutation.isPending}>
                            {mutation.isPending ? (
                                <span className="loader"></span>
                            ) : (
                                <IconDeviceFloppy size={18} />
                            )}
                            {mutation.isPending ? 'Ajout en cours...' : 'Ajouter le Client'}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default AddClientModal;
