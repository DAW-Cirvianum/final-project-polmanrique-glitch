// Login.jsx
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Login() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        async function login() {
            const resp = await fetch("http://localhost/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                }),
            });

            if (!resp.ok) {
                const error = await resp.json();
                console.error("Error del backend:", error);
                document.getElementById("error").textContent = t('login.error');
                return;
            }

            const data = await resp.json();
            console.log(data);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            const role = data.user.rol;

            if (role === "student") {
                navigate("/student");
            } else if (role === "admin") {
                navigate("/admin");
            } else if (role === "teacher") {
                navigate("/teacher");
            }
        }

        login();
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "400px" }}>

                <h3 className="text-center mb-4">{t('login.title')}</h3>

                <form onSubmit={onSubmit}>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">{t('login.emailLabel')}</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder={t('login.emailPlaceholder')} />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">{t('login.passwordLabel')}</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder={t('login.passwordPlaceholder')} />
                    </div>

                    <a href="/register" className="btn btn-link">{t('login.registerLink')}</a>
                    <a href="/resetPassword" className="btn btn-link">{t('login.forgotPasswordLink')}</a>

                    <p id="error" className="text-danger"></p>

                    <button type="submit" className="btn btn-primary w-100">
                        {t('login.submitButton')}
                    </button>

                </form>
            </div>
        </div>
    );
}