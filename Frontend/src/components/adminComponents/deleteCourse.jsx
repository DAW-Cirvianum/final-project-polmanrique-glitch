import { useState, useEffect } from "react";
import Title from "../subComponents/Title";
import { useTranslation } from "react-i18next";

/**
 * Component per eliminar un curs.
 * Permet seleccionar un curs de la llista i eliminar-lo.
 * @returns {JSX.Element}
 */
export default function DeleteCourse() {
    const { t } = useTranslation();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchCourses() {
            const resp = await fetch("http://localhost/api/courses");
            const data = await resp.json();
            setCourses(data);
        }
        fetchCourses();
    }, []);

    /**
     * Gestiona l'eliminació del curs.
     * Envia una petició DELETE a l'API.
     */
    const onClick = async () => {
        const token = localStorage.getItem('token');

        const course_id = document.getElementById("course").value;

        const resp = await fetch("http://localhost/api/course/" + course_id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })

        const data = await resp.json()
        console.log(data)
    }

    return (
        <div>
            <Title title={t('admin.deleteCourse.title')} subtitle={t('admin.deleteCourse.subtitle')} />

            <div className="flex justify-center">
                <select className="min-w-100 border border-gray-300 rounded-md p-2" name="course" id="course">
                    <option value="">{t('admin.deleteCourse.selectCourse')}</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-center">
                <button onClick={onClick} className="bg-yellow-400 p-3 rounded-md m-10">
                    {t('admin.deleteCourse.button')}
                </button>
            </div>
        </div>
    )
}