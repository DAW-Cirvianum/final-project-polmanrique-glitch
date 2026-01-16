import { useState, useEffect } from "react";
import Title from "./subComponents/Title";
import { useTranslation } from "react-i18next";

export default function CourseDetails() {
    const { t } = useTranslation();
    const [modules, setModules] = useState([]);
    const [tutor, setTutor] = useState([]);
    const course = JSON.parse(localStorage.getItem("course"));

    useEffect(() => {
        async function fetchTutor() {
            const resp = await fetch(`http://localhost/api/tutors/${course.id}`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setTutor(data[0]);
        }

        async function fatchModulesByCourse() {
            const resp = await fetch("http://localhost/api/courseModules/" + course.id, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setModules(data);
        }

        fetchTutor();
        fatchModulesByCourse();
    }, [])

    return (
        <div>
            <Title title={course.name.toUpperCase()} subtitle="" />

            <div className="max-w-7xl mx-auto px-6 py-10">
                <section className="mt-8">
                    <h1 className="text-3xl font-semibold text-center mb-8">{t('courseDetails.tutor')}</h1>

                    <div className="flex justify-center">
                        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow max-w-md w-full text-center">
                            <h2 className="text-2xl  font-bold"> {tutor.name.toUpperCase()}</h2>
                            <p className="text-gray-600"> {tutor.email}</p>
                        </div>
                    </div>
                </section>

                <section className="mt-12">
                    <h1 className="text-3xl font-semibold text-center mb-8">{t('courseDetails.modules')}</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {modules.map((module) => (
                            <div
                                key={module.id}
                                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
                            >
                                <h2 className="text-xl font-bold mb-2">
                                    {module.name}
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    {module.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}