import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function UpdateUsername() {
    
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");

    // Obtener usuario logeado
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
                setError(data.message || "Error loading user");
                return;
            }

            setUser(data);
            setName(data.name); // nombre actual
        }

        fetchUser();
    }, []);

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
            setError(data.message || "Failed to update username");
            return;
        }

        navigate("/profile");
    };

    return (
        <div>
            <h1>{t("updateUsername.title")}</h1>

            {error && <p className="text-red-500">{error}</p>}

            {user && (
                <form onSubmit={updateUsername} className="mt-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border p-2 rounded w-full mb-4"
                    />

                    <button
                        type="submit"
                        className="bg-lime-700 hover:bg-lime-800 text-white py-2 px-4 rounded w-full"
                    >
                        {t("updateUsername.updateButton")}
                    </button>
                </form>
            )}
        </div>
    );
}
