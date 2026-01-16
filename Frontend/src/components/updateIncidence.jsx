import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Title from "./subComponents/Title";

export default function UpdateIncidence() {
    const { t } = useTranslation();
    const [incidence, setIncidence] = useState({
        student_id: "",
        module_id: "",
        grade: "",
        description: ""
    });
    const [modules, setModules] = useState([]);

    const incidenceId = localStorage.getItem("incidenceId");

    useEffect(() => {
        async function fetchIncidence() {
            if (!incidenceId) return;

            const resp = await fetch(
                `http://localhost/api/incidencesById/${incidenceId}`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        Accept: "application/json",
                    },
                }
            );

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
            const resp = await fetch(`http://localhost/api/modules`);
            if (resp.ok) {
                const data = await resp.json();
                setModules(data);
            }
        }

        fetchIncidence();
        fetchModules();
    }, [incidenceId]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const confirmation = window.confirm("Are you sure you want to update this incidence?");
        if (!confirmation) return;

        const response = await fetch(
            `http://localhost/api/incidences/${incidenceId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
                body: JSON.stringify(incidence),
            }
        );

        if (response.ok) {
            alert("Incidence updated successfully");
        } else {
            alert("Error updating incidence");
        }
    };

    return (
        <div>
            <Title title={t("incidence.updateIncidence")} subtitle={t("incidence.updateSubtitle")} />

            <div className="flex justify-center m-10">
                <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('incidence.form.module')}
                        </label>
                        <select
                            value={incidence.module_id}
                            onChange={(e) => setIncidence({ ...incidence, module_id: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-2"
                            required
                        >
                            <option value="">{t('incidence.form.selectModule')}</option>
                            {modules.map((module) => (
                                <option key={module.id} value={module.id}>
                                    {module.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('incidence.form.grade')}
                        </label>
                        <select
                            value={incidence.grade}
                            onChange={(e) => setIncidence({ ...incidence, grade: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-2"
                            required
                        >
                            <option value="low">{t('incidence.form.low')}</option>
                            <option value="medium">{t('incidence.form.medium')}</option>
                            <option value="high">{t('incidence.form.high')}</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('incidence.form.description')}
                        </label>
                        <textarea
                            value={incidence.description}
                            onChange={(e) => setIncidence({ ...incidence, description: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-2"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                    >
                        {t('incidence.form.updateButton')}
                    </button>
                </form>
            </div>
        </div>
    );
}