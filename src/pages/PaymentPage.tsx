import { useState } from 'react';
import './PaymentPage.scss';
import AccountSidebar from '../components/AccountSidebar';

export default function PaymentPage() {
    const [cards, setCards] = useState([
        { id: 1, type: 'Visa', last4: '4242', expiry: '12/2026', isDefault: true },
        { id: 2, type: 'Mastercard', last4: '5555', expiry: '08/2025', isDefault: false },
    ]);

    const [newCard, setNewCard] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: '',
        save: true
    });

    const handleNewCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setNewCard(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDelete = (id: number) => {
        setCards(cards.filter(card => card.id !== id));
    };

    const handleSetDefault = (id: number) => {
        setCards(cards.map(card => ({
            ...card,
            isDefault: card.id === id
        })));
    };

    return (
        <div className="payment-page">
            <div className="account-layout">
                <AccountSidebar />

                <main className="payment-content">
                    <header className="page-header">
                        <div className="header-info">
                            <h1>Moyens de Paiement</h1>
                            <p>Gérez vos cartes bancaires et méthodes de paiement</p>
                        </div>
                        <button className="btn-add-top">
                            + Ajouter
                        </button>
                    </header>

                    {/* Cards List */}
                    <div className="cards-list">
                        {cards.map(card => (
                            <div key={card.id} className="payment-card-item">
                                <div className="card-details">
                                    <div className="card-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                                    </div>
                                    <div className="card-info">
                                        <div className="card-title">
                                            {card.type}
                                            {card.isDefault && (
                                                <span className="default-badge">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    Par défaut
                                                </span>
                                            )}
                                        </div>
                                        <div className="card-number">•••• •••• {card.last4}</div>
                                        <div className="card-expiry">Expire le {card.expiry}</div>
                                    </div>
                                </div>
                                <div className="card-actions">
                                    {!card.isDefault && (
                                        <button className="btn-set-default" onClick={() => handleSetDefault(card.id)}>
                                            Définir par défaut
                                        </button>
                                    )}
                                    <button className="btn-delete" onClick={() => handleDelete(card.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add New Card Form */}
                    <section className="add-card-section">
                        <h2>Ajouter une Nouvelle Carte</h2>

                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label htmlFor="number">Numéro de Carte</label>
                                <input
                                    type="text"
                                    id="number"
                                    placeholder="1234 5678 9012 3456"
                                    value={newCard.number}
                                    onChange={handleNewCardChange}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Nom sur la Carte</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="JEAN DUPONT"
                                        value={newCard.name}
                                        onChange={handleNewCardChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="expiry">Date d'Expiration</label>
                                    <input
                                        type="text"
                                        id="expiry"
                                        placeholder="MM/AA"
                                        value={newCard.expiry}
                                        onChange={handleNewCardChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cvv">CVV</label>
                                    <input
                                        type="text"
                                        id="cvv"
                                        placeholder="123"
                                        value={newCard.cvv}
                                        onChange={handleNewCardChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="save"
                                checked={newCard.save}
                                onChange={handleNewCardChange}
                            />
                            <label htmlFor="save">Enregistrer cette carte pour les futurs paiements</label>
                        </div>

                        <button className="btn-submit">Ajouter la Carte</button>
                    </section>

                    <div className="security-note">
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </div>
                        <div>
                            <h3>Vos paiements sont sécurisés</h3>
                            <p>Toutes les transactions sont cryptées et sécurisées. Nous ne stockons jamais les détails complets de votre carte.</p>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}