
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function UpdateUsername() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");


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
                setError(data.message || t('updateUsername.errorLoad'));
                return;
            }

            setUser(data);
            setName(data.name);
        }

        fetchUser();
    }, [t]);

    const updateUsername = async (e) => {
        e.preventDefault();

        const resp = await fetch(
            `http://localhost/api/updateUsername/${user.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
                body: JSON.stringify({ name }),
            }
        );

        const data = await resp.json();

        if (!resp.ok) {
            setError(data.message || t('updateUsername.errorUpdate'));
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
                                {t('updateUsername.title')}
                            </h4>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            {user && (
                                <form onSubmit={updateUsername}>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            {t('updateUsername.nameLabel')}
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-success w-100"
                                    >
                                        {t('updateUsername.submitButton')}
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