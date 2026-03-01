import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Title from "../subcomponents/Title";

export default function DeleteStudent() {
    const { t } = useTranslation();
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const resp = await fetch("http://localhost/api/students", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Accept": "application/json",
            },
        });
        const data = await resp.json();
        setStudents(data);
    };

    const onClick = async () => {
        const studentId = document.getElementById("student").value;

        if (!studentId) {
            setMessage({ type: "error", text: t('admin.deleteStudent.selectRequired') });
            return;
        }

        if (!window.confirm(t('admin.deleteStudent.confirmMessage'))) {
            return;
        }

        try {
            const resp = await fetch("http://localhost/api/user/" + studentId, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            });

            if (!resp.ok) {
                setMessage({ type: "error", text: t('admin.deleteStudent.errorMessage') });
                return;
            }

            setMessage({ type: "success", text: t('admin.deleteStudent.successMessage') });
            fetchStudents();
        } catch (error) {
            setMessage({ type: "error", text: t('admin.deleteStudent.errorMessage') });
        }
    }

    return (
        <div className="container py-4">
            <Title title={t('admin.deleteStudent.title')} subtitle={t('admin.deleteStudent.subtitle')} />

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm mt-4">
                        <div className="card-body p-4">
                            <div className="mb-4">
                                <label htmlFor="student" className="form-label fw-medium text-secondary">
                                    {t('admin.deleteStudent.selectStudent')}
                                </label>
                                <select name="student" id="student" className="form-select">
                                    <option value="">{t('admin.deleteStudent.selectStudent')}</option>
                                    {students.map((student) => (
                                        <option key={student.id} value={student.id}>{student.name}</option>
                                    ))}
                                </select>
                            </div>

                            {message.text && (
                                <div className={`alert alert-${message.type === "success" ? "success" : "danger"} text-center mb-3`}>
                                    {message.text}
                                </div>
                            )}

                            <div className="text-center">
                                <button onClick={onClick} className="btn btn-danger px-4">
                                    {t('admin.deleteStudent.button')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}