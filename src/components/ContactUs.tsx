import './ContactUs.scss';

export default function ContactUs() {
    return (
        <section className="contact-us-section" id="contact">
            <div className="section-header">
                <h2>Contactez-Nous</h2>
                <p>Une question ? Besoin d'informations ? Notre équipe est à votre disposition</p>
            </div>

            <div className="contact-container">
                <div className="contact-info">
                    <h3>Nos Coordonnées</h3>

                    <div className="info-item">
                        <div className="icon-box">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        </div>
                        <div className="info-text">
                            <h4>Téléphone</h4>
                            <p>+33 1 23 45 67 89</p>
                            <span className="sub-text">Lun - Dim : 24h/24</span>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="icon-box">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </div>
                        <div className="info-text">
                            <h4>Email</h4>
                            <p>contact@autolocation.fr</p>
                            <p>support@autolocation.fr</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="icon-box">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        </div>
                        <div className="info-text">
                            <h4>Adresse</h4>
                            <p>123 Avenue des Champs-Élysées</p>
                            <p>75008 Paris, France</p>
                        </div>
                    </div>

                    <div className="opening-hours">
                        <h4>Horaires d'Ouverture</h4>
                        <div className="hour-row">
                            <span>Lundi - Vendredi</span>
                            <span>08:00 - 20:00</span>
                        </div>
                        <div className="hour-row">
                            <span>Samedi</span>
                            <span>09:00 - 18:00</span>
                        </div>
                        <div className="hour-row">
                            <span>Dimanche</span>
                            <span>10:00 - 16:00</span>
                        </div>
                    </div>
                </div>

                <div className="contact-form-wrapper">
                    <h3>Envoyez-nous un Message</h3>

                    <form className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Nom Complet *</label>
                            <input type="text" id="name" placeholder="Votre nom" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input type="email" id="email" placeholder="votre.email@exemple.com" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Téléphone</label>
                            <input type="tel" id="phone" placeholder="+33 1 23 45 67 89" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message *</label>
                            <textarea id="message" rows={5} placeholder="Votre message..." required></textarea>
                        </div>

                        <button type="submit" className="submit-btn">
                            Envoyer le Message
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}