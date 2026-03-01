
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function UpdateMail() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");

    useEffect(() => {
        async function fetchUser() {
            const resp = await fetch("http://localhost/api/me", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });

            const data = await resp.json();

            if (!resp.ok) {
                setError(data.message || t('updateEmail.errorLoad'));
                return;
            }

            setUser(data);
            setEmail(data.email);
        }

        fetchUser();
    }, [t]);

    const updateEmail = async (e) => {
        e.preventDefault();

        const resp = await fetch(`http://localhost/api/updateMail/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Accept": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await resp.json();

        if (!resp.ok) {
            setError(data.message || t('updateEmail.errorUpdate'));
            return;
        }

        navigate("/");
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h4 className="card-title mb-4 text-center">
                                {t('updateEmail.title')}
                            </h4>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            {user && (
                                <form onSubmit={updateEmail}>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            {t('updateEmail.emailLabel')}
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-success w-100"
                                    >
                                        {t('updateEmail.submitButton')}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}