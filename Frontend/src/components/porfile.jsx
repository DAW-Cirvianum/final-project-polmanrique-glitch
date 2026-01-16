import { useState, useEffect } from "react";
import Title from "./subComponents/Title";
import Incidences from "./subComponents/incidences";
import Marks from "./subComponents/marks";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    const { t } = useTranslation();
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

                if (!resp.ok) throw new Error("Failed to fetch user");

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

                if (!resp2.ok) throw new Error("Failed to fetch modules");

                const data2 = await resp2.json();
                setRegistrations(data2);
            } catch (error) {
                console.error("Error loading profile:", error);
                setRegistrations([]);
            }
        }

        getUserLogged();
    }, []);

    return (
        <div>
            {user && (
                <div className="min-h-screen bg-gray-50">
                    <Title
                        title={user.name.toUpperCase()}
                        subtitle={t("profile.title")}
                    />

                    <div className="max-w-5xl mx-auto px-6 mt-10 space-y-12">
                        <section className="bg-white rounded-2xl shadow-lg p-10">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                {t("profile.userInfo")}
                            </h2>

                            <ul className="divide-y">
                                <li className="py-4 text-lg text-gray-700">
                                    <span className="font-semibold">
                                        {t("profile.name")}:
                                    </span>{" "}
                                    {user.name}
                                </li>
                                <li className="py-4 text-lg text-gray-700">
                                    <span className="font-semibold">
                                        {t("profile.email")}:
                                    </span>{" "}
                                    {user.email}
                                </li>
                            </ul>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <button
                                    onClick={() => navigate("/updateUsername")}
                                    className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition"
                                >
                                    {t("profile.updateUsername")}
                                </button>
                                <button
                                    onClick={() => navigate("/updateEmail")}
                                    className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition"
                                >
                                    {t("profile.updateEmail")}
                                </button>
                                <button
                                    onClick={() => navigate("/updatePassword")}
                                    className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition"
                                >
                                    {t("profile.updatePassword")}
                                </button>
                            </div>
                        </section>

                        <section className="bg-white rounded-2xl shadow-lg p-10">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                {t("profile.enrolledModules")}
                            </h2>

                            {registrations.length > 0 ? (
                                <ul className="divide-y">
                                    {registrations.map((registration) => (
                                        <li
                                            key={registration.id}
                                            className="py-4 text-lg text-gray-700 hover:text-emerald-600 transition"
                                        >
                                            {registration.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 italic py-4">
                                    No estás matriculado en ningún módulo
                                </p>
                            )}
                        </section>

                        {role !== "teacher" && (
                            <section className="bg-white rounded-2xl shadow-lg p-10">
                                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                    {t("profile.incidences")}
                                </h2>
                                <Incidences studentId={user.id} />
                            </section>
                        )}

                        {role !== "teacher" && (
                            <section className="bg-white rounded-2xl shadow-lg p-10 mb-20">
                                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                    {t("profile.marks")}
                                </h2>
                                <Marks />
                            </section>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}