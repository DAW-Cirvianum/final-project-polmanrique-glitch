import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Componente que mostra un formulari per afegir una nova incidència
 * @returns {JSX.Element}
 */
export default function AddIncidence() {
    const { t } = useTranslation();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        /**
         * Retorna tots els registres d'estudiants
         */
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
     * Event que s'executa quan es fa el submit del formulari
     * i afegeix una nova incidència a la base de dades
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        /**
         * Afegeix una nova incidència a la base de dades
         */
        async function addIncidence() {
            const resp = await fetch("http://localhost/api/incidence", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    student_id: e.target.student.value,
                    grade: e.target.incidence.value,
                    description: e.target.description.value,
                }),
            });
            const data = await resp.json();
            console.log(data);
        }

        addIncidence();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 border border-gray-300 p-2 shadow-xl m-10">
                    <label htmlFor="student">{t('addIncidence.form.student')}</label>
                    <select className="border border-gray-300 p-2" name="student" id="student">
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="incidence">{t('addIncidence.form.incidenceGrade')}</label>
                    <select className="border border-gray-300 p-2" name="incidence" id="incidence">
                        <option value="">{t('addIncidence.form.selectIncidence')}</option>
                        <option value="low">{t('addIncidence.form.low')}</option>
                        <option value="medium">{t('addIncidence.form.medium')}</option>
                        <option value="high">{t('addIncidence.form.high')}</option>
                    </select>

                    <label htmlFor="description">{t('addIncidence.form.description')}</label>
                    <textarea name="description" id="description" className="border border-gray-300 p-2"></textarea>

                    <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded min-w-100">
                        {t('addIncidence.form.submitButton')}
                    </button>
                </div>
            </form>
        </div>
    );
}