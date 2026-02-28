import { useState } from 'react';
import './ResetPasswordPage.scss';
import { supabase } from '../supabase/supabase';

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{ email?: string; general?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const resetPassword = async (email: string) => {
        setIsLoading(true);
        // Supabase password reset logic
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/reset-password', // Update this based on actual callback route
        });

        setIsLoading(false);

        if (error) {
            setErrors({ general: "Une erreur est survenue lors de l'envoi de l'email de réinitialisation." });
            return;
        }

        setIsSuccess(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setIsSuccess(false);

        const newErrors: { email?: string; general?: string } = {};
        let isValid = true;

        if (!email.trim()) {
            newErrors.email = "L'adresse email est obligatoire";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Format d'email invalide";
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        console.log('Sending reset email to', email);
        await resetPassword(email);
    };

    return (
        <div className="reset-password-page">
            <div className="reset-card">
                <div className="reset-header">
                    <div className="logo">
                        <div className="logo-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                                <circle cx="7" cy="17" r="2" />
                                <path d="M9 17h6" />
                                <circle cx="17" cy="17" r="2" />
                            </svg>
                        </div>
                        <span className="logo-text">AutoLocation</span>
                    </div>
                    <h1>Mot de passe oublié</h1>
                    <p>Entrez votre e-mail pour réinitialiser votre mot de passe</p>
                </div>

                {!isSuccess ? (
                    <form className="reset-form" onSubmit={handleSubmit} noValidate>
                        {errors.general && (
                            <div className="general-error" style={{ backgroundColor: '#fff5f5', color: '#e53e3e', padding: '10px', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #fed7d7' }}>
                                {errors.general}
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="email">Adresse Email</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </span>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="votre.email@exemple.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errors.email) setErrors(prev => ({ ...prev, email: undefined, general: undefined }));
                                    }}
                                    className={errors.email ? 'error-input' : ''}
                                    required
                                />
                            </div>
                            {errors.email && <span className="error-message" style={{ color: '#e53e3e', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
                        </div>

                        <button type="submit" className="reset-btn" disabled={isLoading}>
                            {isLoading ? (
                                <span className="loader" style={{
                                    width: '18px',
                                    height: '18px',
                                    border: '2px solid #ffffff',
                                    borderBottomColor: 'transparent',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    boxSizing: 'border-box',
                                    animation: 'rotation 1s linear infinite'
                                }}></span>
                            ) : 'Réinitialiser le mot de passe'}
                        </button>
                    </form>
                ) : (
                    <div className="success-message" style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', marginBottom: '2rem', border: '1px solid #bbf7d0' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem display: block' }}>
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <h3 style={{ marginBottom: '0.5rem', color: '#15803d' }}>E-mail envoyé !</h3>
                        <p style={{ fontSize: '0.95rem', margin: 0 }}>Si un compte existe de cette adresse, vous recevrez un lien pour réinitialiser votre mot de passe.</p>
                    </div>
                )}

                <p className="login-link">
                    Vous vous souvenez de votre mot de passe ? <a href="/login">Se connecter</a>
                </p>

                <div className="back-home">
                    <a href="/">← Retour à l'accueil</a>
                </div>
            </div>
        </div>
    );
}
