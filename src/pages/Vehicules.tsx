
import AdminSidebar from '../components/AdminSidebar';
import { IconSearch, IconPencil, IconTrash, IconPlus } from '@tabler/icons-react';
import './Vehicules.scss';

interface Vehicle {
    id: string;
    name: string;
    category: string;
    price: string;
    transmission: string;
    fuel: string;
    seats: number;
    status: string;
    image: string;
}

const mockVehicles: Vehicle[] = [
    {
        id: '1',
        name: 'BMW Serie 5',
        category: 'Berline',
        price: '€95',
        transmission: 'Automatique',
        fuel: 'Essence',
        seats: 5,
        status: 'Disponible',
        image: 'https://images.unsplash.com/photo-1555215695-30049a4b868a?auto=format&fit=crop&q=80&w=200'
    },
    {
        id: '2',
        name: 'Mercedes-Benz Classe C',
        category: 'Sport',
        price: '€120',
        transmission: 'Automatique',
        fuel: 'Essence',
        seats: 4,
        status: 'Disponible',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=200'
    },
    {
        id: '3',
        name: 'Audi Q5',
        category: 'SUV',
        price: '€85',
        transmission: 'Automatique',
        fuel: 'Diesel',
        seats: 7,
        status: 'Disponible',
        image: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=200'
    }
];

export default function Vehicules() {
    return (
        <div className="vehicules-wrapper">
            <AdminSidebar activeTab="vehicules" />
            <main className="vehicles-content">
                <header className="vehicles-header">
                    <div className="vehicles-header__title-section">
                        <h1 className="vehicles-header__title">Gestion des Véhicules</h1>
                        <p className="vehicles-header__subtitle">3 véhicules au total</p>
                    </div>
                    <button className="vehicles-header__add-button">
                        <IconPlus size={18} />
                        <span>Ajouter un Véhicule</span>
                    </button>
                </header>

                <div className="vehicles-controls">
                    <div className="vehicles-search">
                        <IconSearch size={20} color="#9ca3af" />
                        <input type="text" placeholder="Rechercher un véhicule..." />
                    </div>
                </div>

                <div className="vehicles-table-container">
                    <table className="vehicles-table">
                        <thead>
                            <tr>
                                <th>VÉHICULE</th>
                                <th>CATÉGORIE</th>
                                <th>PRIX/JOUR</th>
                                <th>TRANSMISSION</th>
                                <th>CARBURANT</th>
                                <th>PLACES</th>
                                <th>STATUT</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockVehicles.map((veh) => (
                                <tr key={veh.id}>
                                    <td>
                                        <div className="vehicle-info">
                                            <img src={veh.image} alt={veh.name} className="vehicle-image" />
                                            <span className="vehicle-name">{veh.name}</span>
                                        </div>
                                    </td>
                                    <td>{veh.category}</td>
                                    <td className="vehicle-price"><strong>{veh.price}</strong></td>
                                    <td>{veh.transmission}</td>
                                    <td>{veh.fuel}</td>
                                    <td>{veh.seats}</td>
                                    <td>
                                        <span className="status-badge available">
                                            {veh.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="vehicle-actions">
                                            <button className="action-btn edit-btn">
                                                <IconPencil size={18} />
                                            </button>
                                            <button className="action-btn delete-btn">
                                                <IconTrash size={18} />
                                            </button>
                                        </div>
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