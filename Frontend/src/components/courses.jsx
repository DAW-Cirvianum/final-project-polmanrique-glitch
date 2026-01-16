import { useState, useEffect } from "react";
import Title from "./subComponents/Title";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Component per mostrar el catàleg de cursos disponibles.
 * Permet veure els detalls de cada curs.
 * @returns {JSX.Element}
 */
export default function Courses() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

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

    /**
     * Gestiona el clic en un curs.
     * Guarda la informació del curs i navega a la pàgina de detalls.
     * @param {Object} course - L'objecte del curs seleccionat.
     */
    const onClick = (course) => {
        navigate(`/courseDetails/${course.id}`);
        localStorage.setItem("course", JSON.stringify(course));
    }

    return (
        <div>
            <Title title={t('courses.title')} subtitle={t('courses.subtitle')} />
            <div className="max-w-7xl mx-auto mt-8 px-4">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">{t('courses.availableCourses')}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            onClick={() => onClick(course)}
                            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{course.name}</h3>
                            <p className="text-gray-600 text-sm">{course.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}