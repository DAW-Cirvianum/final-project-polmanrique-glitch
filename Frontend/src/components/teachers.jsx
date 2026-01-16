import { useState, useEffect } from "react";
import Title from "./subComponents/Title";
import { useTranslation } from "react-i18next";

/**
 * Component per llistar els professors.
 * Mostra una taula amb la informació bàsica dels professors (ID, nom, email, població).
 * @returns {JSX.Element}
 */
export default function Teachers() {
    const { t } = useTranslation();

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        async function fetchTeachers() {
            const resp = await fetch("http://localhost/api/teachers", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setTeachers(data);
        }
        fetchTeachers();
    }, []);

    return (
        <div className="">

            <Title title={t('teachers.title')} subtitle={t('teachers.subtitle')} />

            <div className="overflow-x-auto mt-6">
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">{t('teachers.table.id')}</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">{t('teachers.table.name')}</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">{t('teachers.table.email')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {teachers.map((teacher) => (
                            <tr key={teacher.id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-3 text-sm text-gray-700">{teacher.id}</td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{teacher.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{teacher.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}