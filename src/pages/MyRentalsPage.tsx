import './MyRentalPage.scss';
import AccountSidebar from '../components/AccountSidebar';

export default function MyRentalsPage() {

    // Mock data for the rentals
    const activeRentals = [
        {
            id: 1,
            carName: "BMW Serie 5",
            ref: "BK-2026-001",
            image: "https://images.unsplash.com/photo-1555215695-3004980adade?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            startDate: "15 Fév 2026",
            endDate: "22 Fév 2026",
            location: "Paris, France",
            price: 450,
            status: "active"
        }
    ];

    const rentalHistory = [
        {
            id: 2,
            carName: "Mercedes-Benz Classe C",
            ref: "BK-2026-002",
            image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            startDate: "01 Jan 2026",
            endDate: "05 Jan 2026",
            location: "Lyon, France",
            price: 320,
            status: "completed"
        },
        {
            id: 3,
            carName: "Audi Q5",
            ref: "BK-2025-045",
            image: "https://images.unsplash.com/photo-1629897048514-34fd5dfc690c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            startDate: "10 Déc 2025",
            endDate: "15 Déc 2025",
            location: "Marseille, France",
            price: 380,
            status: "completed"
        }
    ];

    return (
        <div className="my-rental-page">
            <div className="account-layout">
                {/* Sidebar - Duplicated from AccountPage but with active state changed */}
                <AccountSidebar />

                <main className="rentals-content">
                    <header className="page-header">
                        <h1>Mes Locations</h1>
                        <p>Gérez vos locations en cours et consultez votre historique</p>
                    </header>

                    <section>
                        <h2>Locations Actives</h2>
                        {activeRentals.map(rental => (
                            <div key={rental.id} className="rental-card">
                                <div className="car-image">
                                    <img src={rental.image} alt={rental.carName} />
                                </div>
                                <div className="rental-details">
                                    <div className="header">
                                        <div className="title-info">
                                            <h3>{rental.carName}</h3>
                                            <span className="ref">Réf: {rental.ref}</span>
                                        </div>
                                        <span className="status-badge active">En cours</span>
                                    </div>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                                            <div>
                                                <span className="label">Début</span>
                                                <span className="value">{rental.startDate}</span>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                                            <div>
                                                <span className="label">Fin</span>
                                                <span className="value">{rental.endDate}</span>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></span>
                                            <div>
                                                <span className="label">Lieu</span>
                                                <span className="value">{rental.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer">
                                        <div className="price">
                                            €{rental.price} <span>/ location</span>
                                        </div>
                                        <div className="actions">
                                            <button className="btn btn-outline">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                Facture
                                            </button>
                                            <button className="btn btn-success">
                                                Détails
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2>Historique des Locations</h2>
                        {rentalHistory.map(rental => (
                            <div key={rental.id} className="rental-card">
                                <div className="car-image">
                                    <img src={rental.image} alt={rental.carName} />
                                </div>
                                <div className="rental-details">
                                    <div className="header">
                                        <div className="title-info">
                                            <h3>{rental.carName}</h3>
                                            <span className="ref">Réf: {rental.ref}</span>
                                        </div>
                                        <span className="status-badge completed">Terminée</span>
                                    </div>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                                            <div>
                                                <span className="label">Début</span>
                                                <span className="value">{rental.startDate}</span>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                                            <div>
                                                <span className="label">Fin</span>
                                                <span className="value">{rental.endDate}</span>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></span>
                                            <div>
                                                <span className="label">Lieu</span>
                                                <span className="value">{rental.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer">
                                        <div className="price">
                                            €{rental.price} <span>/ location</span>
                                        </div>
                                        <div className="actions">
                                            <button className="btn btn-outline">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                Facture
                                            </button>
                                            <button className="btn btn-success">
                                                Relouer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                </main>
            </div>
        </div>
    );
}