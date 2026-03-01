
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Incidences from "../subcomponents/Incidences";
import Marks from "../subcomponents/Marks";
import Title from "../subcomponents/Title";
import { useTranslation } from "react-i18next";

export default function Profile() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [role, setRole] = useState(null);

    useEffect(() => {
        async function getUserLogged() {
            try {
                const resp = await fetch("http://localhost/api/me", {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        "Accept": "application/json",
                    },
                });

                if (!resp.ok) throw new Error("Error al obtener usuario");

                const data = await resp.json();
                setUser(data);
                setRole(localStorage.getItem("role"));

                const resp2 = await fetch(
                    "http://localhost/api/userLoggedModules/" + data.id,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                            "Accept": "application/json",
                        },
                    }
                );

                if (!resp2.ok) throw new Error("Error al obtener módulos");

                const data2 = await resp2.json();
                setRegistrations(data2);
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
                setRegistrations([]);
            }
        }

        getUserLogged();
    }, []);

    if (!user) return null;

    return (
        <div>
            <Title title={user.name.toUpperCase()} subtitle={t('profile.title')} />
            <div className="container my-5">

                <div className="card mb-4 shadow">
                    <div className="card-body">
                        <h4 className="card-title mb-3">{t('profile.userInfo')}</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <strong>{t('profile.name')}</strong> {user.name}
                            </li>
                            <li className="list-group-item">
                                <strong>{t('profile.email')}</strong> {user.email}
                            </li>
                        </ul>

                        <div className="mt-4 d-flex flex-wrap gap-2">
                            <button
                                onClick={() => navigate("/updateUsername")}
                                className="btn btn-success"
                            >
                                {t('profile.updateName')}
                            </button>
                            <button
                                onClick={() => navigate("/updateEmail")}
                                className="btn btn-success"
                            >
                                {t('profile.updateEmail')}
                            </button>
                            <button
                                onClick={() => navigate("/updatePassword")}
                                className="btn btn-success"
                            >
                                {t('profile.updatePassword')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Módulos inscritos */}
                <div className="card mb-4 shadow">
                    <div className="card-body">
                        <h4 className="card-title mb-3">{t('profile.enrolledModules')}</h4>
                        {registrations.length > 0 ? (
                            <ul className="list-group list-group-flush">
                                {registrations.map((registration) => (
                                    <li
                                        key={registration.id}
                                        className="list-group-item"
                                    >
                                        {registration.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted fst-italic">
                                {t('profile.noModules')}
                            </p>
                        )}
                    </div>
                </div>

                {/* Incidencias y notas (solo si no es profesor) */}
                {role !== "teacher" && (
                    <div className="card mb-4 shadow">
                        <div className="card-body">
                            <h4 className="card-title mb-3">{t('profile.incidences')}</h4>
                            <Incidences studentId={user.id} />
                        </div>
                    </div>
                )}

                {role !== "teacher" && (
                    <div className="card mb-5 shadow">
                        <div className="card-body">
                            <h4 className="card-title mb-3">{t('profile.marks')}</h4>
                            <Marks studentId={user.id} />
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}