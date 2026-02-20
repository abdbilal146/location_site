import React from 'react';
import './AdminRecentReservations.scss';

interface Reservation {
    id: string;
    client: string;
    vehicule: string;
    date: string;
    statut: 'Confirmée' | 'En cours' | 'Terminée';
}

const reservations: Reservation[] = [
    { id: '1', client: 'Marie Dubois', vehicule: 'BMW Serie 5', date: '2026-02-20', statut: 'Confirmée' },
    { id: '2', client: 'Jean Martin', vehicule: 'Audi Q5', date: '2026-02-19', statut: 'En cours' },
    { id: '3', client: 'Sophie Bernard', vehicule: 'Mercedes Classe C', date: '2026-02-18', statut: 'Terminée' },
    { id: '4', client: 'Pierre Petit', vehicule: 'Volkswagen Golf', date: '2026-02-17', statut: 'Confirmée' },
    { id: '5', client: 'Claire Dupont', vehicule: 'Toyota Camry', date: '2026-02-16', statut: 'En cours' }
];

const AdminRecentReservations: React.FC = () => {
    return (
        <div className="admin-recent-reservations">
            <h3 className="admin-recent-reservations__title">Réservations Récentes</h3>
            <div className="admin-recent-reservations__table-container">
                <table className="admin-recent-reservations__table">
                    <thead>
                        <tr>
                            <th>CLIENT</th>
                            <th>VÉHICULE</th>
                            <th>DATE</th>
                            <th>STATUT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((res) => (
                            <tr key={res.id}>
                                <td className="client-name">{res.client}</td>
                                <td className="vehicle-name">{res.vehicule}</td>
                                <td className="date-text">{res.date}</td>
                                <td>
                                    <span className={`status-badge status-${res.statut.toLowerCase().replace(' ', '-')}`}>
                                        {res.statut}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminRecentReservations;
