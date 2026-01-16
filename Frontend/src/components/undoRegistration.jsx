import { useTranslation } from "react-i18next";
import Title from "./subComponents/Title";
import { useState, useEffect } from "react";

export default function UndoRegistration() {
    const { t } = useTranslation();
    const [registrations, setRegistrations] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedCourseId, setSelectedCourseId] = useState("");

    useEffect(() => {
        async function fetchUser() {
            try {
                const resp = await fetch("http://localhost/api/me", {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        "Accept": "application/json",
                    },
                });

                if (!resp.ok) {
                    throw new Error("Failed to fetch user");
                }

                const data = await resp.json();
                setUser(data);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        if (!user) return;

        async function fetchRegistrations() {
            try {
                const resp = await fetch(`http://localhost/api/courses/${user.id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        "Accept": "application/json",
                    },
                });

                if (!resp.ok) {
                    throw new Error("Failed to fetch registrations");
                }

                const data = await resp.json();
                setRegistrations(data);

                if (data.length > 0) {
                    setSelectedCourseId(data[0].id);
                }
            } catch (err) {
                console.error("Error fetching registrations:", err);
            }
        }

        fetchRegistrations();
    }, [user]);

    const onClick = async () => {
        try {
            if (!user || !selectedCourseId) {
                alert("Selecciona un curso primero");
                return;
            }

            const confirmDelete = window.confirm(
                `¿Estás seguro de que quieres desmatricularte de este curso?`
            );

            if (!confirmDelete) return;

            const resp = await fetch(
                `http://localhost/api/registrations/student/${user.id}/course/${selectedCourseId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        "Accept": "application/json",
                    },
                }
            );

            if (!resp.ok) {
                const errorData = await resp.json().catch(() => ({}));
                throw new Error(errorData.message || `Error ${resp.status}: No se pudo eliminar la matrícula`);
            }

            setRegistrations((prev) =>
                prev.filter((registration) => registration.id !== parseInt(selectedCourseId))
            );

            if (registrations.length > 1) {
                const remainingCourses = registrations.filter(r => r.id !== parseInt(selectedCourseId));
                if (remainingCourses.length > 0) {
                    setSelectedCourseId(remainingCourses[0].id.toString());
                } else {
                    setSelectedCourseId("");
                }
            }

            alert("Matrícula eliminada exitosamente");

        } catch (error) {
            console.error("Error deleting registration:", error);
            alert("Error: " + error.message);
        }
    };

    return (
        <div>
            <Title
                title={t("undoRegistration.title")}
                subtitle={t("undoRegistration.subtitle")}
            />

            <div className="flex justify-center items-center h-64">
                <div className="border border-gray-200 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700">
                        {t("undoRegistration.label")}
                    </label>

                    <select
                        className="w-full p-2 border border-gray-200 rounded-lg"
                        value={selectedCourseId}
                        onChange={(e) => setSelectedCourseId(e.target.value)}
                    >
                        {registrations.map((registration) => (
                            <option key={registration.id} value={registration.id}>
                                {registration.name}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={onClick}
                        className="w-full p-2 bg-blue-500 text-white rounded-lg"
                    >
                        {t("undoRegistration.button")}
                    </button>
                </div>
            </div>
        </div>
    );
}
