import { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AddVehicleModal from '../components/AddVehicleModal';
import { IconSearch, IconPencil, IconTrash, IconPlus } from '@tabler/icons-react';
import './Vehicules.scss';
import { useQuery } from '@tanstack/react-query';
import { getAllCars } from '../api/car';



export default function Vehicules() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState<any>(null);

    const { error, data, isLoading } = useQuery({
        queryKey: ["cars"],
        queryFn: getAllCars
    })


    if (isLoading) return <>Is Loading...</>;

    if (error) return <>Is Error...</>;

    if (data) {
        console.log("data is ", data)
    }



    return (
        <div className="vehicules-wrapper">
            <AdminSidebar activeTab="vehicules" />
            <main className="vehicles-content">
                <header className="vehicles-header">
                    <div className="vehicles-header__title-section">
                        <h1 className="vehicles-header__title">Gestion des Véhicules</h1>
                        <p className="vehicles-header__subtitle">3 véhicules au total</p>
                    </div>
                    <button className="vehicles-header__add-button" onClick={() => { setSelectedCar(null); setIsModalOpen(true); }}>
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
                            {data.map((veh: any) => (
                                <tr key={veh.id}>
                                    <td>
                                        <div className="vehicle-info">
                                            <img src={veh.imageUrl} alt={veh.model} className="vehicle-image" />
                                            <span className="vehicle-name">{veh.model}</span>
                                        </div>
                                    </td>
                                    <td>{veh.category}</td>
                                    <td className="vehicle-price"><strong>{veh.rentPrice}</strong></td>
                                    <td>{veh.transmission}</td>
                                    <td>{veh.fuel}</td>
                                    <td>{veh.numberOfSeats}</td>
                                    <td>
                                        <span className="status-badge available">
                                            {veh.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="vehicle-actions">
                                            <button className="action-btn edit-btn" onClick={() => { setSelectedCar(veh); setIsModalOpen(true); }}>
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

                <AddVehicleModal
                    isOpen={isModalOpen}
                    onClose={() => { setIsModalOpen(false); setSelectedCar(null); }}
                    initialData={selectedCar}
                />
            </main>
        </div>
    );
}