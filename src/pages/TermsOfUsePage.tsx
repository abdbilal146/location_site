import { Link } from '@tanstack/react-router';
import './TermsOfUsePage.scss';

export default function TermsOfUsePage() {
    return (
        <div className="terms-page">
            <div className="terms-container">
                <div className="terms-header">
                    <h1>Conditions Générales d'Utilisation</h1>
                    <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
                </div>
                <div className="terms-content">
                    <section>
                        <h2>1. Acceptation des conditions</h2>
                        <p>En accédant et en utilisant ce service, vous acceptez d'être lié par les présentes conditions générales d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme.</p>
                    </section>
                    <section>
                        <h2>2. Description du service</h2>
                        <p>Notre plateforme permet la location de véhicules entre utilisateurs. Nous nous efforçons de garantir la qualité et la sécurité de chaque transaction, bien que nous ne soyons pas responsables des agissements entre particuliers.</p>
                    </section>
                    <section>
                        <h2>3. Obligations de l'utilisateur</h2>
                        <p>Vous vous engagez à fournir des informations exactes lors de votre inscription et à respecter les règles de conduite sur la plateforme. Tout comportement abusif pourra entraîner la suspension de votre compte.</p>
                    </section>
                    <section>
                        <h2>4. Responsabilité</h2>
                        <p>Nous déclinons toute responsabilité en cas de dommages directs ou indirects résultant de l'utilisation de la plateforme ou de l'incapacité à y accéder.</p>
                    </section>
                    <section>
                        <h2>5. Modification des conditions</h2>
                        <p>Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entreront en vigueur dès leur publication sur cette page.</p>
                    </section>
                </div>
                <div className="terms-footer">
                    <Link to="/signup" className="back-btn">Retour à l'inscription</Link>
                </div>
            </div>
        </div>
    );
}
