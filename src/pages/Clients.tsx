
import AdminSidebar from '../components/AdminSidebar';
import { IconSearch, IconMail, IconPhone, IconCalendarEvent, IconDotsVertical } from '@tabler/icons-react';
import './Clients.scss';

interface Client {
    id: string;
    initials: string;
    name: string;
    email: string;
    phone: string;
    reservations: number;
    date: string;
    status: 'Active' | 'Inactive';
}

const mockClients: Client[] = [
    { id: '1', initials: 'MD', name: 'Marie Dubois', email: 'marie.dubois@email.com', phone: '+33 6 12 34 56 78', reservations: 12, date: '2025-08-15', status: 'Active' },
    { id: '2', initials: 'JM', name: 'Jean Martin', email: 'jean.martin@email.com', phone: '+33 6 23 45 67 89', reservations: 8, date: '2025-10-20', status: 'Active' },
    { id: '3', initials: 'SB', name: 'Sophie Bernard', email: 'sophie.bernard@email.com', phone: '+33 6 34 56 78 90', reservations: 15, date: '2025-06-10', status: 'Active' },
    { id: '4', initials: 'PP', name: 'Pierre Petit', email: 'pierre.petit@email.com', phone: '+33 6 45 67 89 01', reservations: 5, date: '2025-12-05', status: 'Inactive' },
    { id: '5', initials: 'CD', name: 'Claire Dupont', email: 'claire.dupont@email.com', phone: '+33 6 56 78 90 12', reservations: 20, date: '2025-03-22', status: 'Active' }
];

export default function Clients() {
    return (
        <div className="clients-wrapper">
            <AdminSidebar activeTab="clients" />
            <main className="clients-content">
                <header className="clients-header">
                    <div className="clients-header__title-section">
                        <h1 className="clients-header__title">Clients</h1>
                        <p className="clients-header__subtitle">5 clients enregistrés</p>
                    </div>
                </header>

                <div className="clients-controls">
                    <div className="clients-search">
                        <IconSearch size={20} color="#9ca3af" />
                        <input type="text" placeholder="Rechercher un client..." />
                    </div>
                </div>

                <div className="clients-table-container">
                    <table className="clients-table">
                        <thead>
                            <tr>
                                <th>CLIENT</th>
                                <th>CONTACT</th>
                                <th>RÉSERVATIONS</th>
                                <th>DATE D'INSCRIPTION</th>
                                <th>STATUT</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockClients.map((client) => (
                                <tr key={client.id}>
                                    <td>
                                        <div className="client-info">
                                            <div className="client-initials">{client.initials}</div>
                                            <span className="client-name">{client.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="client-contact">
                                            <div className="contact-item">
                                                <IconMail size={16} />
                                                <span>{client.email}</span>
                                            </div>
                                            <div className="contact-item">
                                                <IconPhone size={16} />
                                                <span>{client.phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="client-reservations">{client.reservations}</span>
                                    </td>
                                    <td>
                                        <div className="client-date">
                                            <IconCalendarEvent size={16} />
                                            <span>{client.date}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${client.status.toLowerCase()}`}>
                                            {client.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-dots-btn">
                                            <IconDotsVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}