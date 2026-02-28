import { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { IconSearch, IconFilter, IconCalendarEvent, IconPlus } from '@tabler/icons-react';
import AddReservationModal from '../components/AddReservationModal';
import './Reservation.scss';

interface Reservation {
    id: string;
    clientInitials: string;
    clientName: string;
    vehicle: string;
    periodStart: string;
    periodEnd: string;
    price: string;
    status: 'Confirmée' | 'En cours' | 'Terminée' | 'Annulée';
}

const mockReservations: Reservation[] = [
    { id: '#1', clientInitials: 'MD', clientName: 'Marie Dubois', vehicle: 'BMW Serie 5', periodStart: '2026-02-20', periodEnd: '2026-02-25', price: '€475', status: 'Confirmée' },
    { id: '#2', clientInitials: 'JM', clientName: 'Jean Martin', vehicle: 'Audi Q5', periodStart: '2026-02-18', periodEnd: '2026-02-22', price: '€340', status: 'En cours' },
    { id: '#3', clientInitials: 'SB', clientName: 'Sophie Bernard', vehicle: 'Mercedes Classe C', periodStart: '2026-02-15', periodEnd: '2026-02-17', price: '€240', status: 'Terminée' },
    { id: '#4', clientInitials: 'PP', clientName: 'Pierre Petit', vehicle: 'Volkswagen Golf', periodStart: '2026-02-22', periodEnd: '2026-02-28', price: '€270', status: 'Confirmée' },
    { id: '#5', clientInitials: 'CD', clientName: 'Claire Dupont', vehicle: 'Toyota Camry', periodStart: '2026-02-19', periodEnd: '2026-02-24', price: '€325', status: 'En cours' },
    { id: '#6', clientInitials: 'ML', clientName: 'Marc Leroy', vehicle: 'Porsche 911', periodStart: '2026-02-10', periodEnd: '2026-02-12', price: '€500', status: 'Annulée' }
];

export default function Reservation() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="reservations-wrapper">
            <AdminSidebar activeTab="reservations" />
            <main className="reservations-content">
                <header className="reservations-header">
                    <div className="reservations-header__title-section">
                        <h1 className="reservations-header__title">Réservations</h1>
                        <p className="reservations-header__subtitle">6 réservations au total</p>
                    </div>
                    <button className="reservations-header__add-button" onClick={() => setIsModalOpen(true)}>
                        <IconPlus size={18} />
                        <span>Nouvelle Réservation</span>
                    </button>
                </header>

                <div className="reservations-controls">
                    <div className="reservations-search">
                        <IconSearch size={20} color="#9ca3af" />
                        <input type="text" placeholder="Rechercher une réservation..." />
                    </div>
                    <div className="reservations-filter">
                        <IconFilter size={20} color="#9ca3af" />
                        <select>
                            <option>Tous les statuts</option>
                            <option>Confirmée</option>
                            <option>En cours</option>
                            <option>Terminée</option>
                            <option>Annulée</option>
                        </select>
                    </div>
                </div>

                <div className="reservations-table-container">
                    <table className="reservations-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>CLIENT</th>
                                <th>VÉHICULE</th>
                                <th>PÉRIODE</th>
                                <th>PRIX TOTAL</th>
                                <th>STATUT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockReservations.map((res) => (
                                <tr key={res.id}>
                                    <td className="reservation-id">{res.id}</td>
                                    <td>
                                        <div className="client-info">
                                            <div className="client-initials">{res.clientInitials}</div>
                                            <span className="client-name">{res.clientName}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="vehicle-name">{res.vehicle}</span>
                                    </td>
                                    <td>
                                        <div className="reservation-period">
                                            <IconCalendarEvent size={16} />
                                            <span>{res.periodStart} - {res.periodEnd}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <strong className="reservation-price">{res.price}</strong>
                                    </td>
                                    <td>
                                        <span className={`status-badge status-${res.status.toLowerCase().replace(' ', '-')}`}>
                                            {res.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <AddReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </main>
        </div>
    );
}