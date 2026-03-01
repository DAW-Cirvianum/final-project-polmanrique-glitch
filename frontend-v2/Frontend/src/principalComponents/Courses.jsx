import { useState, useEffect } from "react";
import Title from "../subcomponents/Title";
import { useTranslation } from "react-i18next";

export default function Courses() {
    const { t } = useTranslation();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchCourses() {
            const resp = await fetch("http://localhost/api/courses", {
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

    return (
        <>
            <Title
                title={t('courses.title')}
                subtitle={t('courses.subtitle')}
            />

            <div className="container py-5">

                <div className="text-center mb-5">
                    <h2 className="fw-bold">{t('courses.exploreTitle')}</h2>
                    <p className="text-muted">
                        {t('courses.exploreSubtitle')}
                    </p>
                </div>

                <div className="row g-4">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="col-12 col-sm-6 col-md-4 col-xl-3"
                        >
                            <div
                                className="card h-100 border-0 shadow-sm course-card"
                            >
                                <div className="card-body d-flex flex-column">

                                    <h5 className="fw-bold mb-3">
                                        {course.name}
                                    </h5>

                                    <p className="text-muted small flex-grow-1">
                                        {course.description}
                                    </p>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}