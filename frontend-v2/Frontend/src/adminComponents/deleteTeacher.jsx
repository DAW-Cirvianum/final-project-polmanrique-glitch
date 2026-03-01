import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Title from "../subcomponents/Title";

export default function DeleteTeacher() {
    const { t } = useTranslation();
    const [teachers, setTeachers] = useState([]);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        const resp = await fetch("http://localhost/api/teachers", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Accept": "application/json",
            },
        });
        const data = await resp.json();
        setTeachers(data);
    };

    const onClick = async () => {
        const teacherId = document.getElementById("teacher").value;

        if (!teacherId) {
            setMessage({ type: "error", text: t('admin.deleteTeacher.selectRequired') });
            return;
        }

        if (!window.confirm(t('admin.deleteTeacher.confirmMessage'))) {
            return;
        }

        try {
            const resp = await fetch("http://localhost/api/user/" + teacherId, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            });

            if (!resp.ok) {
                setMessage({ type: "error", text: t('admin.deleteTeacher.errorMessage') });
                return;
            }

            setMessage({ type: "success", text: t('admin.deleteTeacher.successMessage') });
            fetchTeachers();
        } catch (error) {
            setMessage({ type: "error", text: t('admin.deleteTeacher.errorMessage') });
        }
    }

    return (
        <div className="container py-4">
            <Title title={t('admin.deleteTeacher.title')} subtitle={t('admin.deleteTeacher.subtitle')} />

            <div className="row justify-content-center mt-4">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <div className="mb-3">
                                <label htmlFor="teacher" className="form-label fw-medium">
                                    {t('admin.deleteTeacher.selectTeacher')}
                                </label>
                                <select
                                    name="teacher"
                                    id="teacher"
                                    className="form-select"
                                >
                                    <option value="">{t('admin.deleteTeacher.selectPlaceholder')}</option>
                                    {teachers.map((teacher) => (
                                        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
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
                                    {t('admin.deleteTeacher.button')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}