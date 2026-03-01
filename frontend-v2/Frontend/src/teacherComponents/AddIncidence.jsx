import { useState, useEffect } from "react";
import Title from "../subcomponents/Title";
import { useTranslation } from "react-i18next";

export default function AddIncidence() {
    const { t } = useTranslation();
    const [students, setStudents] = useState([]);
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
        fetchStudents();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");

        const student = e.target.student.value;
        const grade = e.target.incidence.value;
        const description = e.target.description.value;

        if (!student || !grade || !description) {
            setMessage(t('incidence.fieldsRequired'));
            setIsError(true);
            return;
        }

        if (!window.confirm(t('incidence.confirmMessage'))) {
            return;
        }

        async function addIncidence() {
            const resp = await fetch("http://localhost/api/incidence", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    student_id: student,
                    grade: grade,
                    description: description,
                }),
            });

            if (resp.ok) {
                setMessage(t('incidence.successMessage'));
                setIsError(false);
            } else {
                setMessage(t('incidence.errorMessage'));
                setIsError(true);
            }

            const data = await resp.json();
            console.log(data);
        }

        addIncidence();
    };

    return (
        <div>
            <Title title={t('incidence.title')} subtitle={t('incidence.subtitle')} />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body">
                                <h4 className="card-title mb-4 text-center">
                                    {t('incidence.cardTitle')}
                                </h4>

                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="mb-3">
                                        <label htmlFor="student" className="form-label">
                                            {t('incidence.studentLabel')}
                                        </label>
                                        <select
                                            className="form-select"
                                            name="student"
                                            id="student"
                                            required
                                        >
                                            <option value="">{t('incidence.studentPlaceholder')}</option>
                                            {students.map((student) => (
                                                <option key={student.id} value={student.id}>
                                                    {student.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="incidence" className="form-label">
                                            {t('incidence.gradeLabel')}
                                        </label>
                                        <select
                                            className="form-select"
                                            name="incidence"
                                            id="incidence"
                                            required
                                        >
                                            <option value="">{t('incidence.gradePlaceholder')}</option>
                                            <option value="low">{t('incidence.gradeLow')}</option>
                                            <option value="medium">{t('incidence.gradeMedium')}</option>
                                            <option value="high">{t('incidence.gradeHigh')}</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">
                                            {t('incidence.descriptionLabel')}
                                        </label>
                                        <textarea
                                            name="description"
                                            id="description"
                                            className="form-control"
                                            rows="3"
                                            required
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-success w-100">
                                        {t('incidence.submitButton')}
                                    </button>

                                    {message && (
                                        <div
                                            className={`text-center mt-3 p-2 rounded ${isError ? "bg-danger text-white" : "bg-success text-white"
                                                }`}
                                        >
                                            {message}
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}