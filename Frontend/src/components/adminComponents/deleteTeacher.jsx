import { useState, useEffect } from "react";
import Title from "../subComponents/Title";
import { useTranslation } from "react-i18next";

/**
 * Component per eliminar un professor.
 * Permet seleccionar un professor de la llista i eliminar-lo.
 * @returns {JSX.Element}
 */
export default function DeleteTeacher() {
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

    /**
     * Gestiona l'eliminació del professor.
     * Envia una petició DELETE a l'API.
     */
    const onClick = () => {
        const teacherId = document.getElementById("teacher").value;
        fetch("http://localhost/api/user/" + teacherId, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Accept": "application/json",
            },
        })
    }

    return (
        <div className="p-6">
            <Title title={t('admin.deleteTeacher.title')} subtitle={t('admin.deleteTeacher.subtitle')} />

            <div className="flex flex-col items-center justify-center p-8 mt-4 bg-white rounded-lg shadow-md">
                <div className="w-full max-w-md">
                    <label htmlFor="teacher" className="block mb-2 font-medium text-gray-700">
                        {t('admin.deleteTeacher.selectTeacher')}
                    </label>
                    <select name="teacher" id="teacher" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors">
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mt-6">
                    <button
                        onClick={onClick}
                        className="px-6 py-3 font-medium text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        {t('admin.deleteTeacher.button')}
                    </button>
                </div>
            </div>
        </div>
    )
}