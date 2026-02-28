import React, { useState, useEffect } from 'react';
import { IconX, IconUpload, IconDeviceFloppy } from '@tabler/icons-react';
import './AddVehicleModal.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewCar } from '../api/car';

interface AddVehicleModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any;
}

const AddVehicleModal: React.FC<AddVehicleModalProps> = ({ isOpen, onClose, initialData }) => {
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        category: 'Berline',
        price: "",
        transmission: 'Automatique',
        fuel: 'Essence',
        seats: 5,
        available: false
    });

    useEffect(() => {
        if (initialData && isOpen) {
            setFormData({
                name: initialData.model || '',
                image: initialData.imageUrl || '',
                category: initialData.category || 'Berline',
                price: initialData.rentPrice || '',
                transmission: initialData.transmission || 'Automatique',
                fuel: initialData.fuel || 'Essence',
                seats: initialData.numberOfSeats || 5,
                available: initialData.status ?? false
            });
        } else if (!isOpen) {
            // Reset form when closed
            setFormData({
                name: '',
                image: '',
                category: 'Berline',
                price: "",
                transmission: 'Automatique',
                fuel: 'Essence',
                seats: 5,
                available: false
            });
        }
    }, [initialData, isOpen]);


    const mutation = useMutation({
        mutationFn: addNewCar,
        onSuccess: (data) => {
            console.log('succed', data)
            queryClient.invalidateQueries({ queryKey: ["cars"] });
            onClose();
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const createNewCar = (newCar: {
        imageUrl: string,
        registrationNumber: string,
        brand: string,
        model: string,
        transmission: string,
        fuel: string,
        numberOfSeats: number,
        rentPrice: string,
        category: string,
        status: boolean
    }) => {
        mutation.mutate({
            ...newCar
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };


    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createNewCar(
            {
                imageUrl: formData.image,
                registrationNumber: "",
                brand: "",
                model: formData.name,
                transmission: formData.transmission,
                fuel: formData.fuel,
                numberOfSeats: formData.seats,
                rentPrice: formData.price,
                category: formData.category,
                status: formData.available
            }
        )
    }

    if (!isOpen) return null;


    return (
        <div className="modal-overlay">
            <div className="add-vehicle-modal">
                <header className="modal-header">
                    <h2>{initialData ? "Modifier un Véhicule" : "Ajouter un Véhicule"}</h2>
                    <button className="close-btn" onClick={onClose}>
                        <IconX size={20} />
                    </button>
                </header>

                <form className="modal-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Nom du Véhicule *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="ex: BMW Serie 5" />
                    </div>

                    <div className="form-group">
                        <label>URL de l'Image *</label>
                        <div className="input-with-icon">
                            <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
                            <button type="button" className="upload-btn">
                                <IconUpload size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label>Catégorie *</label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="Berline">Berline</option>
                                <option value="Sport">Sport</option>
                                <option value="SUV">SUV</option>
                            </select>
                        </div>
                        <div className="form-group half">
                            <label>Prix par Jour (€) *</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label>Transmission *</label>
                            <select name="transmission" value={formData.transmission} onChange={handleChange}>
                                <option value="Automatique">Automatique</option>
                                <option value="Manuelle">Manuelle</option>
                            </select>
                        </div>
                        <div className="form-group half">
                            <label>Type de Carburant *</label>
                            <select name="fuel" value={formData.fuel} onChange={handleChange}>
                                <option value="Essence">Essence</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electrique">Électrique</option>
                                <option value="Hybride">Hybride</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Nombre de Places *</label>
                        <input type="number" name="seats" value={formData.seats} onChange={handleChange} />
                    </div>

                    <div className="form-group checkbox-group">
                        <input type="checkbox" id="available-checkbox" name="available" checked={formData.available} onChange={handleChange} />
                        <label htmlFor="available-checkbox">Véhicule disponible à la location</label>
                    </div>

                    <footer className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
                        <button type="submit" className="btn-submit" disabled={mutation.isPending}>
                            {mutation.isPending ? (
                                <span className="loader"></span>
                            ) : (
                                <IconDeviceFloppy size={18} />
                            )}
                            {mutation.isPending ? 'Chargement...' : (initialData ? 'Modifier' : 'Ajouter')}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default AddVehicleModal;
