import { useState } from 'react';
import './AccountParametersPage.scss';
import AccountSidebar from '../components/AccountSidebar';

export default function AccountParameterPage() {
    const [settings, setSettings] = useState({
        // Notifications
        emailNotifications: true,
        reservationNotifications: true,
        promotionalOffers: false,
        newsletter: true,

        // Privacy
        publicProfile: false,
        browsingHistory: true,
        dataSharing: false,

        // Region
        language: 'fr',
        timezone: 'europe_paris',
        currency: 'eur'
    });

    const handleToggle = (key: keyof typeof settings) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target;
        setSettings(prev => ({
            ...prev,
            [id]: value
        }));
    };

    return (
        <div className="account-parameters-page">
            <div className="account-layout">
                <AccountSidebar />

                <main className="parameters-content">
                    <header className="page-header">
                        <h1>Paramètres</h1>
                        <p>Personnalisez vos préférences et paramètres de compte</p>
                    </header>

                    {/* Notifications Section */}
                    <section className="section-card">
                        <div className="section-header">
                            <div className="icon-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                            </div>
                            <h2>Notifications</h2>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h3>Notifications par Email</h3>
                                <p>Recevez des mises à jour par email</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={() => handleToggle('emailNotifications')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h3>Notifications de Réservation</h3>
                                <p>Alertes pour vos réservations</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.reservationNotifications}
                                    onChange={() => handleToggle('reservationNotifications')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h3>Offres Promotionnelles</h3>
                                <p>Recevez nos offres spéciales</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.promotionalOffers}
                                    onChange={() => handleToggle('promotionalOffers')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h3>Newsletter</h3>
                                <p>Actualités et conseils</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.newsletter}
                                    onChange={() => handleToggle('newsletter')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </section>

                    {/* Privacy Section */}
                    <section className="section-card">
                        <div className="section-header">
                            <div className="icon-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            </div>
                            <h2>Confidentialité</h2>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h3>Profil Public</h3>
                                <p>Rendre votre profil visible</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.publicProfile}
                                    onChange={() => handleToggle('publicProfile')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h3>Historique de Navigation</h3>
                                <p>Enregistrer votre historique</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.browsingHistory}
                                    onChange={() => handleToggle('browsingHistory')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h3>Partage de Données</h3>
                                <p>Autoriser le partage avec des partenaires</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.dataSharing}
                                    onChange={() => handleToggle('dataSharing')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </section>

                    {/* Region Section */}
                    <section className="section-card">
                        <div className="section-header">
                            <div className="icon-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                            </div>
                            <h2>Langue et Région</h2>
                        </div>

                        <div className="form-group">
                            <label htmlFor="language">Langue</label>
                            <div className="select-wrapper">
                                <select id="language" value={settings.language} onChange={handleChange}>
                                    <option value="fr">Français</option>
                                    <option value="en">English</option>
                                    <option value="es">Español</option>
                                    <option value="de">Deutsch</option>
                                </select>
                                <div className="select-arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="timezone">Fuseau Horaire</label>
                            <div className="select-wrapper">
                                <select id="timezone" value={settings.timezone} onChange={handleChange}>
                                    <option value="europe_paris">Europe/Paris (GMT+1)</option>
                                    <option value="europe_london">Europe/London (GMT+0)</option>
                                    <option value="america_new_york">America/New_York (GMT-5)</option>
                                    <option value="asia_tokyo">Asia/Tokyo (GMT+9)</option>
                                </select>
                                <div className="select-arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="currency">Devise</label>
                            <div className="select-wrapper">
                                <select id="currency" value={settings.currency} onChange={handleChange}>
                                    <option value="eur">EUR (€)</option>
                                    <option value="usd">USD ($)</option>
                                    <option value="gbp">GBP (£)</option>
                                    <option value="jpy">JPY (¥)</option>
                                </select>
                                <div className="select-arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="page-actions">
                        <button className="btn-save">Enregistrer les Paramètres</button>
                    </div>

                </main>
            </div>
        </div>
    );
}