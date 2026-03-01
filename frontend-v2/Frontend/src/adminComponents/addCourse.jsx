import { useState } from "react";
import { useTranslation } from "react-i18next";
import Title from "../subcomponents/Title"

export default function AddCourse() {
    const { t } = useTranslation();
    const [message, setMessage] = useState({ type: "", text: "" });

    const addCourse = async (e) => {
        e.preventDefault()

        const name = document.getElementById("name").value;
        const year = document.getElementById("year").value;

        if (!name || !year) {
            setMessage({ type: "error", text: t('admin.addCourse.form.error') });
            return;
        }

        if (!window.confirm(t('admin.addCourse.confirmMessage'))) {
            return;
        }

        try {
            const resp = await fetch("http://localhost/api/course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ name, year }),
            })

            if (!resp.ok) {
                setMessage({ type: "error", text: t('admin.addCourse.errorMessage') });
                return;
            }

            setMessage({ type: "success", text: t('admin.addCourse.successMessage') });
            document.getElementById("addCourseForm").reset();
        } catch (error) {
            setMessage({ type: "error", text: t('admin.addCourse.errorMessage') });
        }
    }

    return (
        <div>
            <Title title={t('admin.addCourse.title')} subtitle={t('admin.addCourse.subtitle')} />

            <form id="addCourseForm" noValidate onSubmit={addCourse} className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="name">
                                        {t('admin.addCourse.form.name')}
                                    </label>
                                    <input
                                        id="name"
                                        className="form-control"
                                        type="text"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="year">
                                        {t('admin.addCourse.form.year')}
                                    </label>
                                    <input
                                        id="year"
                                        className="form-control"
                                        type="text"
                                    />
                                </div>

                                {message.text && (
                                    <div className={`alert alert-${message.type === "success" ? "success" : "danger"} text-center`}>
                                        {message.text}
                                    </div>
                                )}

                                <button className="btn btn-primary w-100" type="submit">
                                    {t('admin.addCourse.form.submitButton')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}