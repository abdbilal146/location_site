
import AdminSidebar from '../components/AdminSidebar';
import { IconGlobe, IconWorld, IconBell } from '@tabler/icons-react';
import './AdminParameter.scss';

export default function AdminParameter() {
    return (
        <div className="admin-parameter-wrapper">
            <AdminSidebar activeTab="parametres" />
            <main className="admin-parameter-content">
                <header className="admin-parameter-header">
                    <div className="admin-parameter-header__title-section">
                        <h1 className="admin-parameter-header__title">Paramètres</h1>
                        <p className="admin-parameter-header__subtitle">Configurez les paramètres de votre système</p>
                    </div>
                </header>

                <div className="admin-parameter-cards">
                    {/* Informations de l'Entreprise Card */}
                    <section className="parameter-card">
                        <h2 className="parameter-card__title">
                            <IconGlobe size={20} />
                            Informations de l'Entreprise
                        </h2>
                        <div className="parameter-card__content">
                            <div className="form-group full-width">
                                <label>Nom de l'Entreprise</label>
                                <input type="text" defaultValue="AutoLocation" />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" defaultValue="contact@autolocation.com" />
                                </div>
                                <div className="form-group">
                                    <label>Téléphone</label>
                                    <input type="tel" defaultValue="+33 1 23 45 67 89" />
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label>Adresse</label>
                                <input type="text" defaultValue="123 Rue de la Location, 75001 Paris" />
                            </div>
                        </div>
                    </section>

                    {/* Paramètres Régionaux Card */}
                    <section className="parameter-card">
                        <h2 className="parameter-card__title">
                            <IconWorld size={20} />
                            Paramètres Régionaux
                        </h2>
                        <div className="parameter-card__content">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Devise</label>
                                    <select defaultValue="EUR">
                                        <option value="EUR">Euro (€)</option>
                                        <option value="USD">US Dollar ($)</option>
                                        <option value="GBP">British Pound (£)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Langue</label>
                                    <select defaultValue="fr">
                                        <option value="fr">Français</option>
                                        <option value="en">English</option>
                                        <option value="es">Español</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Notifications Card */}
                    <section className="parameter-card">
                        <h2 className="parameter-card__title">
                            <IconBell size={20} />
                            Notifications
                        </h2>
                        <div className="parameter-card__content">
                            <div className="notification-options">

                                <div className="notification-item">
                                    <div className="notification-item__text">
                                        <span className="notification-label">Notifications Email</span>
                                        <span className="notification-desc">Recevoir des notifications par email</span>
                                    </div>
                                    <input type="checkbox" className="custom-checkbox" defaultChecked />
                                </div>

                                <div className="notification-item">
                                    <div className="notification-item__text">
                                        <span className="notification-label">Notifications SMS</span>
                                        <span className="notification-desc">Recevoir des notifications par SMS</span>
                                    </div>
                                    <input type="checkbox" className="custom-checkbox" />
                                </div>

                                <div className="notification-item">
                                    <div className="notification-item__text">
                                        <span className="notification-label">Confirmation de Réservation</span>
                                        <span className="notification-desc">Envoyer des confirmations automatiques</span>
                                    </div>
                                    <input type="checkbox" className="custom-checkbox" defaultChecked />
                                </div>

                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}