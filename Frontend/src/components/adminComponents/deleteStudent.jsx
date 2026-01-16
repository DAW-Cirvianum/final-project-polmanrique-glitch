import { useState, useEffect } from "react";
import Title from "../subComponents/Title";
import { useTranslation } from "react-i18next";

/**
 * Component per eliminar un estudiant.
 * Permet seleccionar un estudiant de la llista i eliminar-lo.
 * @returns {JSX.Element}
 */
export default function DeleteStudent() {
    const { t } = useTranslation();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchStudents() {
            const resp = await fetch("http://localhost/api/students", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setStudents(data);
        }
        fetchStudents();
    }, []);

    /**
     * Gestiona l'eliminació de l'estudiant.
     * Envia una petició DELETE a l'API.
     */
    const onClick = () => {
        const studentId = document.getElementById("student").value;
        fetch("http://localhost/api/user/" + studentId, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Accept": "application/json",
            },
        })
    }

    return (
        <div className="p-6">
            <Title title={t('admin.deleteStudent.title')} subtitle={t('admin.deleteStudent.subtitle')} />

            <div className="flex flex-col items-center justify-center p-8 mt-4 bg-white rounded-lg shadow-md">
                <div className="w-full max-w-md">
                    <label htmlFor="student" className="block mb-2 font-medium text-gray-700">
                        {t('admin.deleteStudent.selectStudent')}
                    </label>
                    <select name="student" id="student" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors">
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>{student.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mt-6">
                    <button onClick={onClick} className="px-6 py-3 font-medium text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" >
                        {t('admin.deleteStudent.button')}
                    </button>
                </div>
            </div>
        </div>
    )
}