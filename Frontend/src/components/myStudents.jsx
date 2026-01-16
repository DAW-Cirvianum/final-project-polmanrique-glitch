import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./subComponents/Title";
import { useTranslation } from "react-i18next";

export default function MyStudents() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserLogged() {
            const resp = await fetch("http://localhost/api/me", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setUser(data);
        }

        fetchUserLogged();
    }, []);

    useEffect(() => {
        async function fetchStudents() {
            const resp = await fetch(
                "http://localhost/api/tutor/students/" + user.id, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            }
            );
            const data = await resp.json();
            setStudents(data);
            setLoading(false);
        }

        fetchStudents();
    }, [user]);

    const onClick = (id) => {
        localStorage.setItem("studentId", id);
        navigate(`/student/${id}`);
    }

    return (
        <div>
            <Title title={t('myStudents.title')} subtitle={t('myStudents.subtitle')} />

            <div className="flex justify-center gap-4 m-10">
                <button onClick={() => navigate("/addMark")} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded min-w-100">
                    {t('myStudents.addMark')}
                </button>
                <button onClick={() => navigate("/addIncidence")} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded min-w-100">
                    {t('myStudents.addIncidence')}
                </button>
            </div>

            <div className="flex justify-center">
                {loading ? (
                    <div className="p-10 text-center">
                        <p className="text-gray-500 text-lg">{t('myStudents.loading')}</p>
                    </div>
                ) : (
                    <table className="p-10 m-10 table-auto w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                                    {t('myStudents.table.name')}
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                                    {t('myStudents.table.email')}
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                                    {t('myStudents.table.details')}
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 bg-white">
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 text-gray-800">
                                        {student.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {student.email}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <button
                                            onClick={() => onClick(student.id)}
                                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded min-w-100">
                                            {t('myStudents.details')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}