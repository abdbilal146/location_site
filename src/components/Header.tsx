import { useNavigate } from '@tanstack/react-router';
import './Header.scss';

export default function Header() {
    const navigate = useNavigate();

    const navigateToLoginPage = () => {
        navigate({ to: '/login' })
    }

    return (
        <header className="header">
            <div className="logo-container">
                <div className="logo-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                        <circle cx="7" cy="17" r="2" />
                        <path d="M9 17h6" />
                        <circle cx="17" cy="17" r="2" />
                    </svg>
                </div>
                <span className="logo-text">AutoLocation</span>
            </div>

            <nav className="navigation">
                <ul>
                    <li><a href="#home">Accueil</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">À Propos</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>

            <div className="cta-container">
                <button onClick={navigateToLoginPage} className="login-btn">Se Connecter</button>
            </div>
        </header>
    );
}