
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Title from "../subcomponents/Title";
import { useTranslation } from "react-i18next";

export default function UpdateMark() {
    const { t } = useTranslation();
    const { id } = useParams();
    const [markData, setMarkData] = useState({
        mark: "",
        module_id: "",
        student_id: ""
    });
    const [modules, setModules] = useState([]);

    useEffect(() => {
        if (!id) return;
        async function fetchMark() {
            const resp = await fetch(`http://localhost/api/marksById/${id}`, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    Accept: "application/json",
                },
            });

            if (resp.ok) {
                const data = await resp.json();
                setMarkData({
                    mark: data.mark,
                    module_id: data.module_id,
                    student_id: data.student_id,
                });
            } else {
                console.error("Nota no encontrada");
            }
        }

        async function fetchModules() {
            const resp = await fetch(`http://localhost/api/modules`, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    Accept: "application/json",
                },
            });

            if (resp.ok) {
                setModules(await resp.json());
            }
        }

        fetchModules();
        fetchMark();
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!id) return alert(t('updateMark.noMarkSelected'));

        const confirmation = window.confirm(t('updateMark.confirmMessage'));
        if (!confirmation) return;

        const response = await fetch(`http://localhost/api/marks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
                Accept: "application/json",
            },
            body: JSON.stringify({
                student_id: markData.student_id,
                module_id: markData.module_id,
                mark: markData.mark,
            }),
        });

        const messageEl = document.getElementById("message");
        if (response.ok) {
            messageEl.className = "bg-success text-white p-2";
            messageEl.innerHTML = t('updateMark.successMessage');
        } else {
            messageEl.className = "bg-danger text-white p-2";
            messageEl.innerHTML = t('updateMark.errorMessage');
        }
    };

    if (!id) {
        return <p className="text-center mt-5">{t('updateMark.noMarkSelected')}</p>;
    }

    return (
        <div>
            <Title title={t('updateMark.title')} subtitle={t('updateMark.subtitle')} />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body">
                                <h4 className="card-title mb-4 text-center">{t('updateMark.cardTitle')}</h4>

                                <form onSubmit={onSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">{t('updateMark.moduleLabel')}</label>
                                        <select
                                            className="form-select"
                                            value={markData.module_id}
                                            onChange={(e) =>
                                                setMarkData({ ...markData, module_id: e.target.value })
                                            }
                                            required
                                        >
                                            <option value="">{t('updateMark.modulePlaceholder')}</option>
                                            {modules.map((module) => (
                                                <option key={module.id} value={module.id}>
                                                    {module.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="mark" className="form-label">{t('updateMark.markLabel')}</label>
                                        <select
                                            id="mark"
                                            className="form-select"
                                            value={markData.mark}
                                            onChange={(e) =>
                                                setMarkData({ ...markData, mark: e.target.value })
                                            }
                                            required
                                        >
                                            <option value="">{t('updateMark.markPlaceholder')}</option>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100">
                                        {t('updateMark.submitButton')}
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