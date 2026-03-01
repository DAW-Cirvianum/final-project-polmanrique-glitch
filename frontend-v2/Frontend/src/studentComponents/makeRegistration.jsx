
import { useState, useEffect } from "react";
import Title from "../subcomponents/Title";
import { useTranslation } from "react-i18next";

export default function RegistrationForm() {
    const { t } = useTranslation();
    const [courses, setCourses] = useState([]);
    const [modules, setModules] = useState([]);
    const [userId, setUserId] = useState(null);
    const [courseId, setCourseId] = useState("");
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const headers = {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Accept": "application/json",
        };

        async function fetchData() {
            const [coursesResp, userResp] = await Promise.all([
                fetch("http://localhost/api/courses", { headers }),
                fetch("http://localhost/api/me", { headers })
            ]);

            const coursesData = await coursesResp.json();
            const userData = await userResp.json();

            setCourses(coursesData);
            setUserId(userData.id);
        }

        fetchData();
    }, []);

    const handleCourseChange = async (id) => {
        setCourseId(id);

        const resp = await fetch(
            "http://localhost/api/courseModules/" + id,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            }
        );

        const data = await resp.json();
        setModules(data);
    };

    const handleSubmit = async () => {
        if (!courseId) return;

        const confirmEnrollment = window.confirm(t('registration.confirmMessage'));
        if (!confirmEnrollment) {
            setMessage({ type: "danger", text: t('registration.cancelledMessage') });
            return;
        }

        const resp = await fetch("http://localhost/api/registrationByCourse", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: userId,
                course_id: parseInt(courseId),
            }),
        });

        if (!resp.ok) {
            setMessage({ type: "danger", text: t('registration.errorMessage') });
            return;
        }

        setMessage({ type: "success", text: t('registration.successMessage') });
    };

    return (
        <>
            <Title title={t('registration.title')} subtitle={t('registration.subtitle')} />
            <div className="container py-5">


                <div className="row justify-content-center mb-5">
                    <div className="col-12 col-md-8 col-lg-5">
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-4">



                                <div className="mb-4">
                                    <label className="form-label fw-semibold">
                                        {t('registration.selectCourse')}
                                    </label>

                                    <select
                                        className="form-select"
                                        value={courseId}
                                        onChange={(e) => handleCourseChange(e.target.value)}
                                    >
                                        <option value="">{t('registration.selectPlaceholder')}</option>
                                        {courses.map(course => (
                                            <option key={course.id} value={course.id}>
                                                {course.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {message && (
                                    <div className={`alert alert-${message.type}`}>
                                        {message.text}
                                    </div>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    className="btn btn-success w-100"
                                    disabled={!courseId}
                                >
                                    {t('registration.submitButton')}
                                </button>

                            </div>
                        </div>
                    </div>
                </div>


                {modules.length > 0 && (
                    <div className="bg-light rounded-4 p-4 shadow-sm">
                        <h4 className="text-center mb-4">
                            {t('registration.modulesTitle')}
                        </h4>

                        <div className="row g-4">
                            {modules.map((module) => (
                                <div
                                    key={module.id}
                                    className="col-12 col-sm-6 col-md-4"
                                >
                                    <div className="card h-100 border-0 shadow-sm">
                                        <div className="card-body">
                                            <h6 className="fw-semibold mb-0">
                                                {module.name}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}