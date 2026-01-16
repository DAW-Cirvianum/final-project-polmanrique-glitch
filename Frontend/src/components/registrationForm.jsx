import { useState, useEffect } from "react";
import Title from "./subComponents/Title";
import { useTranslation } from "react-i18next";

export default function RegistrationForm() {
    const { t } = useTranslation();
    const [courses, setCourses] = useState([]);
    const [user_id, setUser_id] = useState(null);
    const [modules, setModules] = useState([]);

    const errorStyle = "mb-8 bg-red-100 border border-red-500 p-2 rounded-xl";
    const successStyle = "mb-8 bg-green-100 border border-green-500 p-2 rounded-xl";

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

        async function getUserLogged() {
            const token = localStorage.getItem("token");
            if (!token) return;

            const resp = await fetch("http://localhost/api/me", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Accept": "application/json",
                },
            });

            const data = await resp.json();
            setUser_id(data.id);
        }
        getUserLogged();
    }, []);

    const onClick = () => {
        async function onClick() {
            const course_id = parseInt(document.getElementById("course_id").value);

            const resp = await fetch("http://localhost/api/registrationByCourse", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id, course_id }),
            });

            const data = await resp.json();
            if (!resp.ok) {
                console.error("Error:", data);
                alert(t('registrationForm.errorMessage'));
                return;
            }
        }
        let conf = confirm(t('registrationForm.confirmEnrollment'));
        if (conf) {
            onClick();
            document.getElementById("message").className = successStyle;
            document.getElementById("message").innerHTML = t('registrationForm.successMessage');
        } else {
            document.getElementById("message").className = errorStyle;
            document.getElementById("message").innerHTML = t('registrationForm.errorMessage');
        }
    }

    const onChange = (id) => {
        async function fetchModulesByCourseId() {
            const course_id = parseInt(id);
            const resp = await fetch("http://localhost/api/courseModules/" + course_id, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });

            const data = await resp.json();
            setModules(data);
        }
        fetchModulesByCourseId();
    };


    return (
        <div>

            <Title title={t('registrationForm.title')} subtitle={t('registrationForm.subtitle')} />

            <div className="flex justify-center">
                <div className="m-5 max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-200">

                    <div className="mb-6 text-center">
                        <a href="/courses" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline">{t('registrationForm.backToCourses')}</a>
                    </div>

                    <div className="mb-8">
                        <label className="block text-gray-700 font-medium mb-3 text-lg" htmlFor="course_id">{t('label.courses')}</label>
                        <select onChange={(e) => onChange(e.target.value)} id="course_id" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-lime-500 focus:ring-2 focus:ring-lime-200 transition-all duration-200">
                            {courses.map(course => (
                                <option key={course.id} value={course.id} className="py-2">
                                    {course.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div id="message" className="">
                    </div>

                    <div className="text-center">
                        <button onClick={onClick} className="w-full py-3 px-6 bg-gradient-to-r from-lime-600 to-lime-700 text-white font-semibold rounded-xl shadow-md hover:from-lime-700 hover:to-lime-800 hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-md transition-all duration-200">
                            {t('registrationForm.enrollButton')}
                        </button>
                    </div>

                </div>

            </div>



            <div className=" bg-stone-100 p-5 rounded-2xl shadow-lg max-w-7xl mx-auto m-8">

                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">{t('title.modules')}</h2>

                <div className="grid grid-cols-1 bg-stone-100 p-5 rounded-2xl sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {modules.map((module) => (
                        <div key={module.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300" >
                            <p className="text-lg font-semibold text-gray-800">{module.name}</p>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
}