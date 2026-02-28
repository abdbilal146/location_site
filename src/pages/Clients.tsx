import { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { IconSearch, IconMail, IconPhone, IconCalendarEvent, IconPlus } from '@tabler/icons-react';
import AddClientModal from '../components/AddClientModal';
import ActionDropdown from '../components/ActionDropdown';
import './Clients.scss';
import { useQuery } from '@tanstack/react-query';
import { getAllClients } from '../api/client';

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
]

export default function Clients() {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const { data, isLoading, error } = useQuery({
        queryKey: ['clients'],
        queryFn: getAllClients
    })


    if (isLoading) return <>Is Loading ....</>
    if (error) return <>Error...{error}</>

    console.log("clients are ", data)

    return (
        <div className="clients-wrapper">
            <AdminSidebar activeTab="clients" />
            <main className="clients-content">
                <header className="clients-header">
                    <div className="clients-header__title-section">
                        <h1 className="clients-header__title">Clients</h1>
                        <p className="clients-header__subtitle">{data.length}</p>
                    </div>
                    <button className="clients-header__add-button" onClick={() => setIsModalOpen(true)}>
                        <IconPlus size={18} />
                        <span>Ajouter un Client</span>
                    </button>
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
                            {data.map((client: any) => (
                                <tr key={client.id}>
                                    <td>
                                        <div className="client-info">
                                            <div className="client-initials">{"CD"}</div>
                                            <span className="client-name">{client.fullName}</span>
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
                                                <span>{client.phoneNumber}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="client-reservations">{client.reservations.length}</span>
                                    </td>
                                    <td>
                                        <div className="client-date">
                                            <IconCalendarEvent size={16} />
                                            <span>{client.createdAt}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${client.accountStatus ? "Active" : "Inactive"}`}>
                                            {client.accountStatus ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td>
                                        <ActionDropdown
                                            onView={() => console.log('View client', client.id)}
                                            onEdit={() => console.log('Edit client', client.id)}
                                            onDelete={() => console.log('Delete client', client.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <AddClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </main>
        </div>
    );
}