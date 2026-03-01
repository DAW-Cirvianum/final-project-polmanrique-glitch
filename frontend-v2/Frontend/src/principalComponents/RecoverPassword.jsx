
import { useState } from "react";
import Title from "../subcomponents/Title";
import { useTranslation } from "react-i18next";

export default function ResetPassword() {
    const { t } = useTranslation();
    const [message, setMessage] = useState("");

    const resetPassword = async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;

        if (!email) {
            setMessage(t('resetPassword.emailRequired'));
            return;
        }

        try {
            const resp = await fetch("http://localhost/send-reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });


            let data;
            try {
                data = await resp.json();
            } catch {
                data = {};
            }

            if (resp.ok) {
                setMessage(data.message || t('resetPassword.successMessage'));
            } else {
                setMessage(data.message || t('resetPassword.userNotFound'));
            }
        } catch (error) {
            console.error(error);
            setMessage(t('resetPassword.serverError'));
        }
    };

    return (
        <div>
            <Title title={t('resetPassword.title')} subtitle={t('resetPassword.subtitle')} />
            <div className="container my-5">

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="card p-4 shadow" onSubmit={resetPassword}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    {t('resetPassword.emailLabel')}
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    required
                                />
                            </div>

                            <a href="/" className="m-2">{t('resetPassword.loginLink')}</a>

                            <button type="submit" className="btn btn-success w-100">
                                {t('resetPassword.submitButton')}
                            </button>

                        </form>

                        {message && (
                            <div className="alert alert-info mt-3" role="alert">
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}