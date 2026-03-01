import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function AddTeacher() {
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

        async function register() {
            const populationId = document.getElementById("population").value;

            const resp = await fetch("http://localhost/api/auth/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: document.getElementById("username").value,
                    surname: document.getElementById("surname").value,
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                    rol: "teacher",
                    population_id: populationId,
                }),
            });

            if (!resp.ok) {
                const errorText = await resp.text();
                setMessage(errorText || t('registerTeacher.error'));
                return;
            }

            setMessage(t('registerTeacher.success'));
        }

        register();
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "500px" }}>

                <h3 className="text-center mb-4">{t('registerTeacher.title')}</h3>

                <form onSubmit={onSubmit}>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="username" className="form-label">{t('registerTeacher.nameLabel')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder={t('registerTeacher.namePlaceholder')}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="surname" className="form-label">{t('registerTeacher.surnameLabel')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="surname"
                                placeholder={t('registerTeacher.surnamePlaceholder')}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">{t('registerTeacher.emailLabel')}</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder={t('registerTeacher.emailPlaceholder')}
                            required
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="password" className="form-label">{t('registerTeacher.passwordLabel')}</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder={t('registerTeacher.passwordPlaceholder')}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="repeatPassword" className="form-label">{t('registerTeacher.repeatPasswordLabel')}</label>
                            <input
                                type="password"
                                className="form-control"
                                id="repeatPassword"
                                placeholder={t('registerTeacher.repeatPasswordPlaceholder')}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="population" className="form-label">{t('registerTeacher.populationLabel')}</label>
                        <select id="population" className="form-select" required defaultValue="">
                            <option value="" disabled>{t('registerTeacher.populationPlaceholder')}</option>
                            {populations.map((p) => (
                                <option key={p.id} value={p.id}>{p.town}</option>
                            ))}
                        </select>
                    </div>

                    {message && (
                        <div className="alert alert-info text-center py-2">
                            {message}
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary w-100 mt-2">
                        {t('registerTeacher.submitButton')}
                    </button>

                </form>
            </div>
        </div>
    );
}