import './AboutUsSection.scss';

export default function AboutUsSection() {
    const features = [
        "Plus de 15 ans d'expérience dans la location de véhicules",
        "Flotte régulièrement entretenue et renouvelée",
        "Service client primé et reconnu",
        "Engagement environnemental avec des véhicules écologiques",
        "Processus de réservation simple et rapide",
        "Tarifs compétitifs et sans surprise"
    ];

    return (
        <section className="about-us-section">
            <div className="container">
                <div className="image-column">
                    <div className="image-wrapper">
                        {/* Placeholder for car interior image */}
                        <img
                            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1000&auto=format&fit=crop"
                            alt="Intérieur de voiture de luxe"
                        />
                    </div>
                </div>

                <div className="content-column">
                    <h2 className="section-title">À Propos de Nous</h2>

                    <p className="description">
                        Nous sommes une entreprise familiale passionnée par l'automobile et
                        dédiée à offrir le meilleur service de location de véhicules.
                    </p>

                    <p className="description">
                        Notre mission est de rendre la mobilité accessible à tous, avec des
                        véhicules de qualité, un service personnalisé et des prix transparents.
                        Chaque membre de notre équipe s'engage à vous offrir une expérience
                        exceptionnelle.
                    </p>

                    <ul className="features-list">
                        {features.map((feature, index) => (
                            <li key={index} className="feature-item">
                                <span className="icon-check">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button className="btn-learn-more">En Savoir Plus</button>
                </div>
            </div>
        </section>
    );
}