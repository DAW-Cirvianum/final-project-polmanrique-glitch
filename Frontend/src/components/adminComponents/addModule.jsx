import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Title from "../subComponents/Title";

export default function AddModule() {
    const { t } = useTranslation();
    const [teacher, setTeacher] = useState([]);
    const [scope, setScope] = useState([]);
    const [course, setCourse] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function fetchTeachers() {
            const resp = await fetch("http://localhost/api/teachers", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setTeacher(data);
        }

        async function fetchScopes() {
            const resp = await fetch("http://localhost/api/scopes", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setScope(data);
        }

        async function fetchCourses() {
            const resp = await fetch("http://localhost/api/courses", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setCourse(data);
        }

        fetchTeachers();
        fetchScopes();
        fetchCourses();
    }, []);

    const validateForm = (formData) => {
        const newErrors = {};

        if (!formData.name || formData.name.trim() === "") {
            newErrors.name = t('validation.required');
        }

        if (!formData.code || formData.code.trim() === "") {
            newErrors.code = t('validation.required');
        }

        if (!formData.hours) {
            newErrors.hours = t('validation.required');
        } else if (isNaN(formData.hours) || formData.hours <= 0) {
            newErrors.hours = t('validation.positiveNumber');
        }

        if (!formData.teacher_id) {
            newErrors.teacher_id = t('validation.required');
        }

        if (!formData.scope_id) {
            newErrors.scope_id = t('validation.required');
        }

        if (!formData.course_id) {
            newErrors.course_id = t('validation.required');
        }

        return newErrors;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            code: document.getElementById("code").value,
            hours: document.getElementById("hours").value,
            teacher_id: document.getElementById("teacher").value,
            scope_id: document.getElementById("scope").value,
            course_id: document.getElementById("course").value,
        };

        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        const token = localStorage.getItem('token');

        const resp = await fetch("http://localhost/api/module", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        })

        const data = await resp.json()
        console.log(data)
    }

    return (
        <div>
            <Title title={t('admin.addModule.title')} subtitle={t('admin.addModule.subtitle')} />

            <div className="flex justify-center m-10" >
                <form id="addModuleForm" onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.addModule.form.name')}</label>
                        <input id="name" type="text" className={`border w-full rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-blue-500`} />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.addModule.form.code')}</label>
                        <input id="code" type="text" className={`border w-full rounded-md ${errors.code ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-blue-500`} />
                        {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.addModule.form.hours')}</label>
                        <input id="hours" type="number" min="1" className={`border w-full rounded-md ${errors.hours ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-blue-500`} />
                        {errors.hours && <p className="text-red-500 text-sm mt-1">{errors.hours}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.addModule.form.teacher')}</label>
                        <select id="teacher" className={`border w-full rounded-md ${errors.teacher_id ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-blue-500`}>
                            <option value="">{t('common.selectOption')}</option>
                            {teacher.map((teacher) => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.name}
                                </option>
                            ))}
                        </select>
                        {errors.teacher_id && <p className="text-red-500 text-sm mt-1">{errors.teacher_id}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.addModule.form.scope')}</label>
                        <select id="scope" className={`border w-full rounded-md ${errors.scope_id ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-blue-500`} >
                            <option value="">{t('common.selectOption')}</option>
                            {scope.map((scope) => (
                                <option key={scope.id} value={scope.id}>
                                    {scope.name}
                                </option>
                            ))}
                        </select>
                        {errors.scope_id && <p className="text-red-500 text-sm mt-1">{errors.scope_id}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.addModule.form.course')}</label>
                        <select id="course" className={`border w-full rounded-md ${errors.course_id ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-blue-500`} >
                            <option value="">{t('common.selectOption')}</option>
                            {course.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                        {errors.course_id && <p className="text-red-500 text-sm mt-1">{errors.course_id}</p>}
                    </div>

                    <button type="submit" className="border w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                        {t('admin.addModule.form.submitButton')}
                    </button>
                </form>
            </div>
        </div>
    )
}