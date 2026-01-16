import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Title from "./subComponents/Title";

export default function UpdateMark() {
    const { t } = useTranslation();
    const [markData, setMarkData] = useState({ mark: "", module_id: "" });
    const [modules, setModules] = useState([]);

    useEffect(() => {
        async function fetchMark() {
            const resp = await fetch(`http://localhost/api/marksById/${localStorage.getItem("markId")}`, {
                method: "get",
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
                    student_id: data.student_id
                });
            }
        }

        async function fetchModules() {
            const resp = await fetch(`http://localhost/api/modules`, {
                method: "get",
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
    }, []);



    const onSubmit = async (e) => {
        e.preventDefault();

        const confirmation = window.confirm("Are you sure you want to update this mark?");
        if (!confirmation) {
            alert("Mark not updated");
            return;
        }


        const response = await fetch(`http://localhost/api/marks/${localStorage.getItem("markId")}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Accept": "application/json",
            },
            body: JSON.stringify({
                student_id: markData.student_id,
                module_id: markData.module_id,
                mark: markData.mark,
            }),
        });

        if (response.ok) {
            alert("Mark updated successfully");
        }
    };

    return (
        <div>
            <Title title={t("addMark.title")} subtitle={t("addMark.subtitle")} />
            <div className="flex justify-center m-10">
                <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-6">
                    <h2 className="text-2xl font-semibold text-center text-gray-800">{t('addMark.title')}</h2>

                    <div>
                        <select id="module_id" value={markData.module_id} className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {modules.map((module) => (
                                <option key={module.id} value={module.id}>{module.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="mark" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('addMark.form.mark')}
                        </label>
                        <select id="mark" value={markData.mark} className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                            <option value="1">{t('addMark.marks.1')}</option>
                            <option value="2">{t('addMark.marks.2')}</option>
                            <option value="3">{t('addMark.marks.3')}</option>
                            <option value="4">{t('addMark.marks.4')}</option>
                            <option value="5">{t('addMark.marks.5')}</option>
                            <option value="6">{t('addMark.marks.6')}</option>
                            <option value="7">{t('addMark.marks.7')}</option>
                            <option value="8">{t('addMark.marks.8')}</option>
                            <option value="9">{t('addMark.marks.9')}</option>
                            <option value="10">{t('addMark.marks.10')}</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold py-2.5 rounded-lg shadow-md">
                        {t('addMark.form.submitButton')}
                    </button>
                </form>
            </div>
        </div>
    );
}