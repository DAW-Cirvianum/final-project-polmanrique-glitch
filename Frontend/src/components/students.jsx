import { useState, useEffect } from "react";
import Title from "./subComponents/Title";
import { useTranslation } from "react-i18next";

/**
 * Component per llistar tots els estudiants.
 * Obté i mostra una taula amb les dades dels estudiants (nom, cognom, població, email).
 * @returns {JSX.Element}
 */
export default function Students() {
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

    return (
        <div>

            <Title title={t('students.title')} subtitle={t('students.subtitle')} />

            <div className="overflow-x-auto flex justify-center m-20">
                <table
                    className="table border table-striped w-full max-w-4xl border-collapse"
                    cellSpacing="0"
                >
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">{t('students.table.name')}</th>
                            <th className="border px-4 py-2">{t('students.table.surname')}</th>
                            <th className="border px-4 py-2">{t('students.table.email')}</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id} className="border-t">
                                <td className="border px-4 py-2">{student.name}</td>
                                <td className="border px-4 py-2">{student.surname}</td>
                                <td className="border px-4 py-2">{student.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}   