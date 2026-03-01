// Register.jsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Register() {
    const { t } = useTranslation();
    const [populations, setPopulations] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchPopulations() {
            try {
                const resp = await fetch("http://localhost/api/populations");
                const data = await resp.json();
                setPopulations(data);
            } catch (error) {
                console.error("Error fetching populations:", error);
            }
        }

        fetchPopulations();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        setMessage("");

        const name = document.getElementById("username").value.trim();
        const surname = document.getElementById("surname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const repeatPassword = document.getElementById("repeatPassword").value;
        const population = document.getElementById("population").value;

        if (!name && !surname && !email && !password && !repeatPassword && !population) {
            setMessage(t('register.fieldsRequired'));
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage(t('register.invalidEmail'));
            return;
        }

        if (password !== repeatPassword) {
            setMessage(t('register.passwordsDoNotMatch'));
            return;
        }

        async function register() {
            try {
                const resp = await fetch("http://localhost/api/auth/user", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name,
                        surname,
                        email,
                        password,
                        rol: "student",
                        population_id: population,
                    }),
                });

                if (!resp.ok) {
                    if (resp.status === 500) {
                        setMessage(t('register.emailAlreadyExists'));
                    } else {
                        const errorText = await resp.text();
                        setMessage(errorText || t('register.error'));
                    }
                    return;
                }

                setMessage(t('register.success'));
            } catch (error) {
                console.error(error);
                setMessage(t('register.connectionError'));
            }
        }
        register();
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "500px" }}>
                <h3 className="text-center mb-4">{t('register.title')}</h3>

                <form onSubmit={onSubmit} noValidate>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="username" className="form-label">{t('register.nameLabel')}</label>
                            <input type="text" className="form-control" id="username" placeholder={t('register.namePlaceholder')} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="surname" className="form-label">{t('register.surnameLabel')}</label>
                            <input type="text" className="form-control" id="surname" placeholder={t('register.surnamePlaceholder')} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">{t('register.emailLabel')}</label>
                        <input type="email" className="form-control" id="email" placeholder={t('register.emailPlaceholder')} />
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="password" className="form-label">{t('register.passwordLabel')}</label>
                            <input type="password" className="form-control" id="password" placeholder={t('register.passwordPlaceholder')} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="repeatPassword" className="form-label">{t('register.repeatPasswordLabel')}</label>
                            <input type="password" className="form-control" id="repeatPassword" placeholder={t('register.repeatPasswordPlaceholder')} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="population" className="form-label">{t('register.populationLabel')}</label>
                        <select id="population" className="form-select" defaultValue="">
                            <option value="" disabled>{t('register.populationPlaceholder')}</option>
                            {populations.map((p) => (
                                <option key={p.id} value={p.id}>{p.town}</option>
                            ))}
                        </select>
                    </div>

                    {message && <div className="alert alert-info text-center py-2">{message}</div>}

                    <button type="submit" className="btn btn-primary w-100 mt-2">{t('register.submitButton')}</button>
                </form>
            </div>
        </div>
    );
}