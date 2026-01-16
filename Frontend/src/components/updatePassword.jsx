import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function UpdatePassword() {
    const navigate = useNavigate();
    const { t } = useTranslation();
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
                setError(data.message || t('updatePassword.errors.updateFailed'));
                return;
            }

            setUser(data);
        }

        fetchUser();
    }, []);

    const updatePassword = async (event) => {
        event.preventDefault();

        if (!user) {
            setError(t('updatePassword.errors.noUser'));
            return;
        }

        const resp = await fetch(`http://localhost/api/updatePassword/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Accept": "application/json",
            },
            body: JSON.stringify({
                password: password,
            }),
        });

        const data = await resp.json();

        if (!resp.ok) {
            setError(data.message || t('updatePassword.errors.updateFailed'));
            return;
        }

        setError("");
        navigate("/profile");
    };

    return (
        <div>
            <h1>{t('updatePassword.title')}</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="flex justify-center mt-4">
                <div className="border border-stone-200 p-5 rounded-md">
                    <form onSubmit={updatePassword}>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            {t('updatePassword.newPassword')}
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder={t('updatePassword.newPassword')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mb-4 p-2 border rounded w-full"
                        />

                        <button
                            type="submit"
                            className="bg-lime-700 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            {t('updatePassword.updateButton')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
