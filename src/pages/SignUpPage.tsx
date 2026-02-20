import { useState } from 'react';
import './SignUpPage.scss';
import { getUserData, supabase } from '../supabase/supabase';
import { useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../api/user';

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false
    });


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userData, setUserData] = useState<any>()
    const navigate = useNavigate()


    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: (data) => {
            console.log("user created", data)
        },
        onError: (error) => {
            console.log(error)
        }
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const addUserInfo = (userInfo: { uid: string, name: string, familyName: string, email: string, phoneNumber: string }) => {
        mutation.mutate({
            ...userInfo
        })
    }

    const signUp = async (email: string, password: string, name: string, familyName: string, phoneNumber: string) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) return

        if (data) {
            setUserData(data)
        }

        addUserInfo({ uid: data.user?.id!, name: name, familyName: familyName, email: email, phoneNumber: phoneNumber })
        navigate({ to: '/dashboard/account' })
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Registering with', formData);
        signUp(
            formData.email,
            formData.password,
            formData.firstName,
            formData.lastName,
            formData.phone
        )
    };

    return (
        <div className="signup-page">
            <div className="signup-card">
                <div className="signup-header">
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
                    <h1>Créer un Compte</h1>
                    <p>Rejoignez-nous pour louer votre véhicule idéal</p>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">Prénom</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </span>
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder="Jean"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Nom</label>
                            <div className="input-wrapper">
                                {/* No icon for last name in design, or reuse user icon? I'll use text input without extra icon to keep it clean or same icon. Design shows text input. Let's use simple input for consistency or reuse icon. The image shows icons in both names? Hard to see. I will assume standard input or same icon. Let's use same icon for consistency. */}
                                {/* Actually, looking closely at the image provided in prompt, only First Name has an icon visible? Wait, no. I'll use standard inputs for names or add icons if I can. Let's use icons for consistency.*/}
                                {/* Wait, the prompt image for signup shows icons for Prénom but maybe not Nom? Hard to tell. I will put icons on both for consistency. */}
                                {/* Actually, let's look at the image again. "Prénom" has user icon. "Nom" doesn't seem to have one? Or maybe it does. I'll put it for both. */}
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder="Dupont"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    style={{ paddingLeft: '1rem' }} /* Override padding if no icon */
                                />
                            </div>
                        </div>
                    </div>

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
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Téléphone</label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </span>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="+33 1 23 45 67 89"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mot de Passe</label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="........"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                )}
                            </button>
                        </div>
                        <span className="helper-text">Minimum 8 caractères</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmer le Mot de Passe</label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            </span>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="........"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="form-group terms-group">
                        <label className="terms-label">
                            <input
                                type="checkbox"
                                id="termsAccepted"
                                checked={formData.termsAccepted}
                                onChange={handleChange}
                                required
                            />
                            <span>
                                J'accepte les <a href="#">conditions générales d'utilisation</a> et la <a href="#">politique de confidentialité</a>
                            </span>
                        </label>
                    </div>

                    <button type="submit" className="signup-btn">Créer mon Compte</button>
                </form>

                <div className="divider">
                    <span>Ou</span>
                </div>

                <button type="button" className="google-btn">
                    <svg className="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>
                    S'inscrire avec Google
                </button>

                <p className="login-link">
                    Vous avez déjà un compte ? <a href="/login">Se connecter</a>
                </p>

            </div>
        </div>
    );
}
