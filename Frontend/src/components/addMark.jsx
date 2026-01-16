import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";


/**
 * Componente que mostra un formulari per afegir una nova nota
 * @returns {JSX.Element}
 */
export default function AddMark() {
    const { t } = useTranslation();
    const [students, setStudents] = useState([]);
    const [modules, setModules] = useState([]);

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

        /**
         * Retorna tots els registres de mòduls
         */
        async function fetchModules() {
            const resp = await fetch("http://localhost/api/modules", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });

            const data = await resp.json();
            setModules(data);
        }

        fetchModules();
        fetchStudents();
    }, []);

    /**
     * Event que s'executa quan es fa el submit del formulari
     * i afegeix una nova nota a la base de dades
     */
    const onSubmit = (e) => {
        e.preventDefault();
        async function addMark() {
            const resp = await fetch("http://localhost/api/marks", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    student_id: e.target.student.value,
                    module_id: e.target.module.value,
                    mark: e.target.mark.value,
                }),
            });

            const data = await resp.json();
            console.log(data);
        }
        addMark();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-6" onSubmit={onSubmit}>
                <h2 className="text-2xl font-semibold text-center text-gray-800">{t('addMark.title')}</h2>

                <div>
                    <label htmlFor="student" className="block text-sm font-medium text-gray-700 mb-1">{t('addMark.form.student')}</label>
                    <select id="student" name="student" className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {students.map(student => (
                            <option key={student.id} value={student.id}>{student.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="module" className="block text-sm font-medium text-gray-700 mb-1">{t('addMark.form.module')}</label>
                    <select id="module" name="module" className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {modules.map(module => (
                            <option key={module.id} value={module.id}>{module.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="mark" className="block text-sm font-medium text-gray-700 mb-1">{t('addMark.form.mark')}</label>
                    <select id="mark" name="mark" className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="1">{t('addMark.marks.1')}</option>
                        <option value="2">{t('addMark.marks.2')}</option>
                        <option value="3">{t('addMark.marks.3')}</option>
                        <option value="4">{t('addMark.marks.4')}</option>
                        <option value="5">{t('addMark.marks.5')}</option>
                        <option value="6">{t('addMark.marks.6')}</option>
                        <option value="7">{t('addMark.marks.7')}</option>
                        <option value="8">{t('addMark.marks.8')}</option>
                        <option value="9">{t('addMark.marks.9')}</option>
                        <option value="10">{t('addMark.marks.10')}</option>
                    </select>
                </div>

                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold py-2.5 rounded-lg shadow-md">
                    {t('addMark.form.submitButton')}
                </button>
            </form>
        </div>
    );
}