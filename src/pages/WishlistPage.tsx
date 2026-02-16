
import { useState } from 'react';
import './WishlistPage.scss';
import AccountSidebar from '../components/AccountSidebar';

export default function WishlistPage() {
    const [wishlistPoints, setWishlistPoints] = useState([
        {
            id: 1,
            name: "Porsche 911 Cabriolet",
            image: "https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=800",
            tag: "Sport",
            available: true,
            features: {
                transmission: "Automatique",
                fuel: "Essence",
                seats: "2 personnes",
                price: 250
            }
        },
        {
            id: 2,
            name: "Tesla Model 3",
            image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=800",
            tag: "Électrique",
            available: true,
            features: {
                transmission: "Automatique",
                fuel: "Électrique",
                seats: "5 personnes",
                price: 120
            }
        },
        {
            id: 3,
            name: "Range Rover Sport",
            image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=800",
            tag: "SUV",
            available: false,
            availabilityText: "Non disponible actuellement",
            features: {
                transmission: "Automatique",
                fuel: "Diesel",
                seats: "7 personnes",
                price: 180
            }
        }
    ]);

    const handleDelete = (id: number) => {
        setWishlistPoints(wishlistPoints.filter(item => item.id !== id));
    };

    return (
        <div className="wishlist-page">
            <div className="account-layout">
                <AccountSidebar />

                <main className="wishlist-content">
                    <header className="page-header">
                        <h1>Liste de Souhaits</h1>
                        <p>Retrouvez vos véhicules préférés et réservez-les facilement</p>
                    </header>

                    <div className="wishlist-items">
                        {wishlistPoints.map(item => (
                            <div key={item.id} className="wishlist-card">
                                <div className="card-image">
                                    <img src={item.image} alt={item.name} />
                                    <span className="tag">{item.tag}</span>
                                    <button className="favorite-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                    </button>
                                </div>

                                <div className="card-content">
                                    <button className="btn-delete" onClick={() => handleDelete(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </button>

                                    <div className="header">
                                        <h2>{item.name}</h2>
                                        <div className={`availability ${item.available ? 'available' : 'unavailable'}`}>
                                            {item.available ? 'Disponible' : (item.availabilityText || 'Indisponible')}
                                        </div>
                                    </div>

                                    <div className="price-section">
                                        <div className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                                        </div>
                                        <span className="price-val">€{item.features.price}</span>
                                        <span className="price-period">/ jour</span>
                                    </div>

                                    <div className="features">
                                        <div className="feature">
                                            <span className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                            </span>
                                            <span className="label">Transmission</span>
                                            {item.features.transmission}
                                        </div>
                                        <div className="feature">
                                            <span className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8"></path><path d="M5 12V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5"></path></svg>
                                            </span>
                                            <span className="label">Carburant</span>
                                            {item.features.fuel}
                                        </div>
                                        <div className="feature">
                                            <span className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                            </span>
                                            <span className="label">Places</span>
                                            {item.features.seats}
                                        </div>
                                    </div>

                                    <div className="actions">
                                        <button className="btn-reserve" disabled={!item.available}>
                                            {item.available ? 'Réserver Maintenant' : 'Indisponible'}
                                        </button>
                                        <button className="btn-details">
                                            Voir Détails
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}