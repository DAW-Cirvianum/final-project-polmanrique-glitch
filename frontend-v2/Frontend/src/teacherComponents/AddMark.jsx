import { useState, useEffect } from "react";
import Title from "../subcomponents/Title";
import { useTranslation } from "react-i18next";

/**
 * Component que mostra un formulari per afegir una nova nota
 * @returns {JSX.Element}
 */
export default function AddMark() {
    const { t } = useTranslation();
    const [students, setStudents] = useState([]);
    const [modules, setModules] = useState([]);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchStudents() {
            const resp = await fetch("http://localhost/api/students", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setStudents(data);
        }

        async function fetchModules() {
            const resp = await fetch("http://localhost/api/modules", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setModules(data);
        }

        fetchStudents();
        fetchModules();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const student = e.target.student.value;
        const module = e.target.module.value;
        const mark = e.target.mark.value;

        if (!student || !module || !mark) {
            setMessage(t('mark.fieldsRequired'));
            setIsError(true);
            return;
        }

        if (!window.confirm(t('mark.confirmMessage'))) {
            return;
        }

        async function addMark() {
            const resp = await fetch("http://localhost/api/marks", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    student_id: student,
                    module_id: module,
                    mark: mark,
                }),
            });

            const data = await resp.json();
            console.log(data);

            if (resp.ok) {
                setMessage(t('mark.successMessage'));
                setIsError(false);
            } else {
                setMessage(t('mark.errorMessage'));
                setIsError(true);
            }
        }

        addMark();
    };

    return (
        <div>
            <Title title={t('mark.title')} subtitle={t('mark.subtitle')} />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body">
                                <h4 className="card-title mb-4 text-center">
                                    {t('mark.cardTitle')}
                                </h4>

                                <form onSubmit={onSubmit} noValidate>
                                    <div className="mb-3">
                                        <label htmlFor="student" className="form-label">
                                            {t('mark.studentLabel')}
                                        </label>
                                        <select
                                            id="student"
                                            name="student"
                                            className="form-select"
                                            required
                                        >
                                            <option value="">{t('mark.studentPlaceholder')}</option>
                                            {students.map((student) => (
                                                <option key={student.id} value={student.id}>
                                                    {student.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="module" className="form-label">
                                            {t('mark.moduleLabel')}
                                        </label>
                                        <select
                                            id="module"
                                            name="module"
                                            className="form-select"
                                            required
                                        >
                                            <option value="">{t('mark.modulePlaceholder')}</option>
                                            {modules.map((module) => (
                                                <option key={module.id} value={module.id}>
                                                    {module.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="mark" className="form-label">
                                            {t('mark.markLabel')}
                                        </label>
                                        <select
                                            id="mark"
                                            name="mark"
                                            className="form-select"
                                            required
                                        >
                                            <option value="">{t('mark.markPlaceholder')}</option>
                                            {[...Array(10)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100">
                                        {t('mark.submitButton')}
                                    </button>
                                </form>

                                {message && (
                                    <div
                                        className={`text-center mt-3 p-2 rounded ${isError ? "bg-danger text-white" : "bg-success text-white"
                                            }`}
                                    >
                                        {message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}