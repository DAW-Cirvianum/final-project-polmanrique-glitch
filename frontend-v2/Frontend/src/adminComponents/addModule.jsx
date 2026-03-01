import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Title from "../subcomponents/Title";


export default function AddModule() {
    const { t } = useTranslation();
    const [teacher, setTeacher] = useState([]);
    const [scope, setScope] = useState([]);
    const [course, setCourse] = useState([]);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({ type: "", text: "" });

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
        setMessage({ type: "", text: "" });

        if (!window.confirm(t('admin.addModule.confirmMessage'))) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const resp = await fetch("http://localhost/api/module", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!resp.ok) {
                setMessage({ type: "error", text: t('admin.addModule.errorMessage') });
                return;
            }

            setMessage({ type: "success", text: t('admin.addModule.successMessage') });
            document.getElementById("addModuleForm").reset();
        } catch (error) {
            setMessage({ type: "error", text: t('admin.addModule.errorMessage') });
        }
    };

    return (
        <div>
            <Title title={t('admin.addModule.title')} subtitle={t('admin.addModule.subtitle')} />

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body">
                                <form id="addModuleForm" onSubmit={onSubmit}>

                                    {message.text && (
                                        <div className={`alert alert-${message.type === "success" ? "success" : "danger"} text-center`}>
                                            {message.text}
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            {t('admin.addModule.form.name')}
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="code" className="form-label">
                                            {t('admin.addModule.form.code')}
                                        </label>
                                        <input
                                            id="code"
                                            type="text"
                                            className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                                        />
                                        {errors.code && <div className="invalid-feedback">{errors.code}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="hours" className="form-label">
                                            {t('admin.addModule.form.hours')}
                                        </label>
                                        <input
                                            id="hours"
                                            type="number"
                                            min="1"
                                            className={`form-control ${errors.hours ? 'is-invalid' : ''}`}
                                        />
                                        {errors.hours && <div className="invalid-feedback">{errors.hours}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="teacher" className="form-label">
                                            {t('admin.addModule.form.teacher')}
                                        </label>
                                        <select
                                            id="teacher"
                                            className={`form-select ${errors.teacher_id ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">{t('common.selectOption')}</option>
                                            {teacher.map((teacher) => (
                                                <option key={teacher.id} value={teacher.id}>
                                                    {teacher.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.teacher_id && <div className="invalid-feedback">{errors.teacher_id}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="scope" className="form-label">
                                            {t('admin.addModule.form.scope')}
                                        </label>
                                        <select
                                            id="scope"
                                            className={`form-select ${errors.scope_id ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">{t('common.selectOption')}</option>
                                            {scope.map((scope) => (
                                                <option key={scope.id} value={scope.id}>
                                                    {scope.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.scope_id && <div className="invalid-feedback">{errors.scope_id}</div>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="course" className="form-label">
                                            {t('admin.addModule.form.course')}
                                        </label>
                                        <select
                                            id="course"
                                            className={`form-select ${errors.course_id ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">{t('common.selectOption')}</option>
                                            {course.map((course) => (
                                                <option key={course.id} value={course.id}>
                                                    {course.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.course_id && <div className="invalid-feedback">{errors.course_id}</div>}
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100">
                                        {t('admin.addModule.form.submitButton')}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}