import { useNavigate } from '@tanstack/react-router';
import './HeroSection.scss';

export default function HeroSection() {

    const navigate = useNavigate()
    const goToSignUpPage = () => {
        navigate({ to: '/signup' })
    }
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">
                    Location de Voitures <br />
                    <span className="highlight">Simple et Rapide</span>
                </h1>
                <p className="hero-description">
                    Découvrez notre flotte de véhicules premium pour tous vos besoins.
                    Réservez en ligne et profitez d'un service client exceptionnel.
                </p>

                <div className="hero-buttons">
                    <button className="btn btn-primary">
                        Voir les Véhicules
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                    <button onClick={goToSignUpPage} className="btn btn-secondary">Créer un Compte</button>
                </div>

                <div className="hero-stats">
                    <div className="stat-item">
                        <span className="stat-value">500+</span>
                        <span className="stat-label">Véhicules</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">10K+</span>
                        <span className="stat-label">Clients</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">24/7</span>
                        <span className="stat-label">Support</span>
                    </div>
                </div>
            </div>

            <div className="hero-image">
                <div className="image-wrapper">
                    {/* Using a high-quality Unsplash image as placeholder since I cannot modify assets folder */}
                    <img
                        src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1000&auto=format&fit=crop"
                        alt="Premium Car"
                    />
                    <div className="image-overlay"></div>
                </div>
            </div>
        </section>
    );
}