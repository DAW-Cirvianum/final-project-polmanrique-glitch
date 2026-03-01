import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function UpdatePassword() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState("");

    useEffect(() => {
        async function fetchUser() {
            const resp = await fetch("http://localhost/api/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });

            const data = await resp.json();

            if (!resp.ok) {
                setError(data.message || t('updatePassword.errorLoad'));
                return;
            }

            setUser(data);
        }

        fetchUser();
    }, [t]);

    const updatePassword = async (event) => {
        event.preventDefault();

        if (!user) {
            setError(t('updatePassword.userNotFound'));
            return;
        }

        const resp = await fetch(
            `http://localhost/api/updatePassword/${user.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    password: password,
                }),
            }
        );

        const data = await resp.json();

        if (!resp.ok) {
            setError(data.message || t('updatePassword.errorUpdate'));
            return;
        }

        setError("");
        navigate("/");
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h4 className="card-title mb-4 text-center">
                                {t('updatePassword.title')}
                            </h4>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={updatePassword}>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        {t('updatePassword.passwordLabel')}
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        placeholder={t('updatePassword.passwordPlaceholder')}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                >
                                    {t('updatePassword.submitButton')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}