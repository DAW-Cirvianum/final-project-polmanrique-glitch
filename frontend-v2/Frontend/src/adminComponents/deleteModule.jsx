import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Title from "../subcomponents/Title";

export default function DeleteModule() {
    const { t } = useTranslation();
    const [modules, setModules] = useState([]);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async () => {
        const resp = await fetch("http://localhost/api/modules", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Accept": "application/json",
            },
        });
        const data = await resp.json();
        setModules(data);
    };

    const onClick = async () => {
        const moduleId = document.getElementById("module").value;

        if (!moduleId) {
            setMessage({ type: "error", text: t('admin.deleteModule.selectRequired') });
            return;
        }

        if (!window.confirm(t('admin.deleteModule.confirmMessage'))) {
            return;
        }

        try {
            const resp = await fetch("http://localhost/api/module/" + moduleId, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            });

            if (!resp.ok) {
                setMessage({ type: "error", text: t('admin.deleteModule.errorMessage') });
                return;
            }

            setMessage({ type: "success", text: t('admin.deleteModule.successMessage') });
            fetchModules();
        } catch (error) {
            setMessage({ type: "error", text: t('admin.deleteModule.errorMessage') });
        }
    }

    return (
        <div>
            <Title title={t('admin.deleteModule.title')} subtitle={t('admin.deleteModule.subtitle')} />

            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="mb-3">
                                    <select className="form-select" name="module" id="module">
                                        <option value="">{t('admin.deleteModule.selectModule')}</option>
                                        {modules.map((module) => (
                                            <option key={module.id} value={module.id}>
                                                {module.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {message.text && (
                                    <div className={`alert alert-${message.type === "success" ? "success" : "danger"} text-center mb-3`}>
                                        {message.text}
                                    </div>
                                )}

                                <div className="text-center">
                                    <button onClick={onClick} className="btn btn-warning px-4 py-2">
                                        {t('admin.deleteModule.button')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}