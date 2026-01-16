import Title from './subComponents/Title';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/userRolContext';
import { useTranslation } from "react-i18next";

/**
 * Component per a la pàgina d'inici de sessió.
 * Permet als usuaris entrar a l'aplicació amb el seu correu i contrasenya.
 * @returns {JSX.Element}
 */
export default function Login() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [error, setError] = useState("");


    const { login: loginContext } = useAuth();

    /**
     * Gestiona l'enviament del formulari de login.
     * @param {Event} event - L'esdeveniment del formulari.
     */
    const login = (event) => {
        event.preventDefault();

        const form = document.getElementById("loginForm");

        async function fetchLogIn() {
            const resp = await fetch("http://localhost/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value
                }),
            });

            const data = await resp.json();

            if (!resp.ok) {
                setError(data.message || t('login.errors.loginFailed'));
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.rol);
            loginContext(data.user.rol);

            setError("");
            navigate("/profile");
        }

        if (
            document.getElementById("email").value === "" ||
            document.getElementById("password").value === ""
        ) {
            setError(t('login.errors.requiredFields'));
        } else if (form.checkValidity()) {
            fetchLogIn();
        } else {
            setError(t('login.errors.invalidCredentials'));
        }
    };

    /**
     * Gestiona el restabliment de la contrasenya de l'usuari.
     */
    const resetPassword = async () => {
        const confirmation = window.confirm("Are you sure you want to reset your password?");
        if (!confirmation) {
            alert("Password reset cancelled");
            return;
        }

        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("User not found");
            return;
        }

        try {
            const resp = await fetch(`http://localhost/api/reset-password/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
                body: JSON.stringify({ user_id: userId })
            });

            if (!resp.ok) {
                const errData = await resp.json();
                throw new Error(errData.message || "Error resetting password");
            }

            const data = await resp.json();
            alert(`Password reset successfully. ${data.message || ""}`);
            console.log("Reset response:", data);
            window.location.reload();

        } catch (error) {
            console.error("Reset password error:", error);
            alert("Error resetting password: " + error.message);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">
            <div>
                <Title title={t('login.title')} subtitle={t('login.subtitle')} />
            </div>

            <div className="flex justify-center -mt-24 p-4">
                <form id="loginForm" onSubmit={login} noValidate className="min-w-100 min-h-100">
                    <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl">
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('loginForm.form.email')}
                            </label>
                            <input className='w-full p-1 border border-gray-300 rounded' type="email" id="email" required />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('loginForm.form.password')}
                            </label>
                            <input className='w-full p-1 border border-gray-300 rounded' type="password" id="password" required />
                        </div>

                        <p className="m-3 text-red-500">{error}</p>

                        <a className='text-blue-600' href="" onClick={() => window.open("http://localhost/passwordRecovery", "_blank")} >{t('loginForm.form.resetPassword')}</a>

                        <button type="submit" className="mt-10 w-full bg-emerald-600 text-white p-2 rounded">
                            {t('loginForm.form.submitButton')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}