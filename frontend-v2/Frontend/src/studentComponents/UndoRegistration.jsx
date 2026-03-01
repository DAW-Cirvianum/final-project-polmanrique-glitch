import { useState, useEffect } from "react";
import Title from "../subcomponents/Title";
import { useTranslation } from "react-i18next";

export default function UndoRegistration() {
    const { t } = useTranslation();
    const [registrations, setRegistrations] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedCourseId, setSelectedCourseId] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const resp = await fetch("http://localhost/api/me", {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        "Accept": "application/json",
                    },
                });
                if (!resp.ok) throw new Error("No se pudo obtener el usuario");
                const data = await resp.json();
                setUser(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (!user) return;

        const fetchRegistrations = async () => {
            try {
                const resp = await fetch(`http://localhost/api/courses/${user.id}`, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        "Accept": "application/json",
                    },
                });
                if (!resp.ok) throw new Error("No se pudieron obtener las matrículas");
                const data = await resp.json();
                setRegistrations(data);

                if (data.length > 0) setSelectedCourseId(data[0].id.toString());
            } catch (err) {
                console.error(err);
            }
        };
        fetchRegistrations();
    }, [user]);

    const handleUndo = async () => {
        if (!user || !selectedCourseId) {
            alert(t('undoRegistration.selectCourseFirst'));
            return;
        }

        if (!window.confirm(t('undoRegistration.confirmMessage'))) return;

        try {
            const resp = await fetch(
                `http://localhost/api/registrations/student/${user.id}/course/${selectedCourseId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        "Accept": "application/json",
                    }
                }
            );

            if (!resp.ok) throw new Error("No se pudo eliminar la matrícula");

            document.getElementById("message").textContent = t('undoRegistration.successMessage');
        } catch (err) {
            console.error(err);
            document.getElementById("message").textContent = t('undoRegistration.errorMessage') + err.message;
        }
    };

    return (
        <>
            <Title
                title={t('undoRegistration.title')}
                subtitle={t('undoRegistration.subtitle')}
            />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card shadow-sm border-0 p-4">
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    {t('undoRegistration.courseLabel')}
                                </label>
                                <select
                                    className="form-select"
                                    value={selectedCourseId}
                                    onChange={(e) => setSelectedCourseId(e.target.value)}
                                >
                                    {registrations.map((reg) => (
                                        <option key={reg.id} value={reg.id}>
                                            {reg.name}
                                        </option>
                                    ))}
                                    {registrations.length === 0 && (
                                        <option value="">{t('undoRegistration.noCourses')}</option>
                                    )}
                                </select>
                            </div>

                            <button
                                className="btn btn-danger w-100"
                                onClick={handleUndo}
                                disabled={!selectedCourseId}
                            >
                                {t('undoRegistration.button')}
                            </button>
                            <p id="message" className="text-center mt-3 bg-success-subtle text-success rounded"></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}