
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Title from "../subcomponents/Title";

export default function AssignTutor() {
    const { t } = useTranslation();
    const [tutors, setTutors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        async function fetchTutors() {
            const resp = await fetch("http://localhost/api/teachers", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setTutors(data);
        }
        fetchTutors();
    }, []);

    useEffect(() => {
        async function fetchCourses() {
            const resp = await fetch("http://localhost/api/courses", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setCourses(data);
        }
        fetchCourses();
    }, []);

    const onClick = async () => {
        const teacherId = document.getElementById("teacher").value;
        const courseId = document.getElementById("course").value;

        if (!teacherId || !courseId) {
            setSuccessMessage(t('admin.assignTutor.selectRequired'));
            setTimeout(() => setSuccessMessage(""), 3000);
            return;
        }

        const resp = await fetch("http://localhost/api/tutor", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: teacherId,
                course_id: courseId,
            }),
        });

        if (resp.ok) {
            setSuccessMessage(t('admin.assignTutor.success'));
            setTimeout(() => setSuccessMessage(""), 3000);
        } else {
            setSuccessMessage(t('admin.assignTutor.error'));
            setTimeout(() => setSuccessMessage(""), 3000);
        }

        const data = await resp.json();
        console.log(data);
    }

    return (
        <div className="container py-4">
            <Title title={t('admin.assignTutor.title')} subtitle={t('admin.assignTutor.subtitle')} />

            {successMessage && (
                <div className="alert alert-success text-center">
                    {successMessage}
                </div>
            )}

            <div className="row justify-content-center">
                <div className="col-md-4 mb-3">
                    <label htmlFor="teacher" className="form-label">{t('admin.assignTutor.teacherLabel')}</label>
                    <select
                        name="teacher"
                        id="teacher"
                        className="form-select"
                    >
                        <option value="">{t('admin.assignTutor.teacherPlaceholder')}</option>
                        {tutors.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="course" className="form-label">{t('admin.assignTutor.courseLabel')}</label>
                    <select
                        name="course"
                        id="course"
                        className="form-select"
                    >
                        <option value="">{t('admin.assignTutor.coursePlaceholder')}</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>{course.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-auto">
                    <button
                        onClick={onClick}
                        className="btn btn-warning mt-3"
                    >
                        {t('admin.assignTutor.button')}
                    </button>
                </div>
            </div>
        </div>
    );
}