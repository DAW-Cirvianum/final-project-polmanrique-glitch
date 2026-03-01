import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Title from "../subcomponents/Title";
import { useTranslation } from "react-i18next";

export default function UpdateIncidence() {
    const { t } = useTranslation();
    const { id } = useParams();
    const [incidence, setIncidence] = useState({
        student_id: "",
        module_id: "",
        grade: "",
        description: ""
    });

    const [modules, setModules] = useState([]);

    useEffect(() => {
        async function fetchIncidence() {
            if (!id) return;

            const resp = await fetch(`http://localhost/api/incidencesById/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    Accept: "application/json",
                },
            });

            if (resp.ok) {
                const data = await resp.json();
                setIncidence({
                    student_id: data.student_id,
                    module_id: data.module_id,
                    grade: data.grade,
                    description: data.description,
                });
            }
        }

        async function fetchModules() {
            const resp = await fetch(`http://localhost/api/modules`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    Accept: "application/json",
                },
            });

            if (resp.ok) {
                setModules(await resp.json());
            }
        }

        fetchIncidence();
        fetchModules();
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!window.confirm(t('updateIncidence.confirmMessage'))) return;

        const response = await fetch(`http://localhost/api/incidences/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
                Accept: "application/json",
            },
            body: JSON.stringify(incidence),
        });

        const messageEl = document.getElementById("message");
        if (response.ok) {
            messageEl.className = "bg-success text-white p-2 mt-2";
            messageEl.innerHTML = t('updateIncidence.successMessage');
        } else {
            messageEl.className = "bg-danger text-white p-2 mt-2";
            messageEl.innerHTML = t('updateIncidence.errorMessage');
        }
    };

    return (
        <div>
            <Title title={t('updateIncidence.title')} subtitle={t('updateIncidence.subtitle')} />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body">
                                <form onSubmit={onSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">{t('updateIncidence.moduleLabel')}</label>
                                        <select
                                            value={incidence.module_id}
                                            onChange={(e) =>
                                                setIncidence({ ...incidence, module_id: e.target.value })
                                            }
                                            className="form-select"
                                            required
                                        >
                                            <option value="">{t('updateIncidence.modulePlaceholder')}</option>
                                            {modules.map((module) => (
                                                <option key={module.id} value={module.id}>
                                                    {module.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">{t('updateIncidence.gradeLabel')}</label>
                                        <select
                                            value={incidence.grade}
                                            onChange={(e) =>
                                                setIncidence({ ...incidence, grade: e.target.value })
                                            }
                                            className="form-select"
                                            required
                                        >
                                            <option value="low">{t('updateIncidence.gradeLow')}</option>
                                            <option value="medium">{t('updateIncidence.gradeMedium')}</option>
                                            <option value="high">{t('updateIncidence.gradeHigh')}</option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label">{t('updateIncidence.descriptionLabel')}</label>
                                        <textarea
                                            value={incidence.description}
                                            onChange={(e) =>
                                                setIncidence({ ...incidence, description: e.target.value })
                                            }
                                            className="form-control"
                                            rows="3"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100">
                                        {t('updateIncidence.submitButton')}
                                    </button>

                                    <p id="message"></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}