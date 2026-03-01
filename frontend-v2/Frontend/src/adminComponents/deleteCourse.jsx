import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Title from "../subcomponents/Title"

export default function DeleteCourse() {
    const { t } = useTranslation();
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        const resp = await fetch("http://localhost/api/courses", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Accept": "application/json",
            },
        });
        const data = await resp.json();
        setCourses(data);
    };

    const onClick = async () => {
        const course_id = document.getElementById("course").value;

        if (!course_id) {
            setMessage({ type: "error", text: t('admin.deleteCourse.selectRequired') });
            return;
        }

        if (!window.confirm(t('admin.deleteCourse.confirmMessage'))) {
            return;
        }

        try {
            const resp = await fetch("http://localhost/api/course/" + course_id, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!resp.ok) {
                setMessage({ type: "error", text: t('admin.deleteCourse.errorMessage') });
                return;
            }

            setMessage({ type: "success", text: t('admin.deleteCourse.successMessage') });
            fetchCourses();
        } catch (error) {
            setMessage({ type: "error", text: t('admin.deleteCourse.errorMessage') });
        }
    }

    return (
        <div>
            <Title title={t('admin.deleteCourse.title')} subtitle={t('admin.deleteCourse.subtitle')} />

            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="mb-3">
                                    <select className="form-select" name="course" id="course">
                                        <option value="">{t('admin.deleteCourse.selectCourse')}</option>
                                        {courses.map((course) => (
                                            <option key={course.id} value={course.id}>
                                                {course.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {message.text && (
                                    <div className={`alert alert-${message.type === "success" ? "success" : "danger"} text-center mb-3`}>
                                        {message.text}
                                    </div>
                                )}

                                <div className="text-center">
                                    <button onClick={onClick} className="btn btn-warning px-4 py-2">
                                        {t('admin.deleteCourse.button')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}