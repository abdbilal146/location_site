import { Link } from '@tanstack/react-router';
import './PrivacyPolicyPage.scss';

export default function PrivacyPolicyPage() {
    return (
        <div className="privacy-page">
            <div className="privacy-container">
                <div className="privacy-header">
                    <h1>Politique de Confidentialité</h1>
                    <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
                </div>
                <div className="privacy-content">
                    <section>
                        <h2>1. Collecte des données</h2>
                        <p>Nous collectons les informations que vous nous fournissez directement, notamment lors de la création de votre compte, de la modification de votre profil ou de l'utilisation de nos services.</p>
                    </section>
                    <section>
                        <h2>2. Utilisation de vos informations</h2>
                        <p>Les informations que nous recueillons sont utilisées pour fournir, maintenir et améliorer nos services, ainsi que pour communiquer avec vous et assurer la sécurité de notre plateforme.</p>
                    </section>
                    <section>
                        <h2>3. Partage des données</h2>
                        <p>Nous ne partageons vos informations personnelles qu'avec votre consentement explicite, ou lorsque cela est nécessaire pour répondre à des obligations légales. Vos données ne sont jamais vendues à des tiers.</p>
                    </section>
                    <section>
                        <h2>4. Sécurité</h2>
                        <p>Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre l'accès, la modification, la divulgation ou la destruction non autorisés.</p>
                    </section>
                    <section>
                        <h2>5. Vos droits</h2>
                        <p>Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification, de portabilité et de suppression de vos données personnelles.</p>
                    </section>
                </div>
                <div className="privacy-footer">
                    <Link to="/signup" className="back-btn">Retour à l'inscription</Link>
                </div>
            </div>
        </div>
    );
}
