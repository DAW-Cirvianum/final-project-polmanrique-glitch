import { useState, useEffect } from "react";
import Title from "../subComponents/Title";
import { useTranslation } from "react-i18next";

/**
 * Component per eliminar un mòdul.
 * Permet seleccionar un mòdul de la llista i eliminar-lo.
 * @returns {JSX.Element}
 */
export default function DeleteModule() {
    const { t } = useTranslation();
    const [modules, setModules] = useState([]);

    useEffect(() => {
        async function fetchModules() {
            const resp = await fetch("http://localhost/api/modules", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setModules(data);
        }
        fetchModules();
    }, []);

    /**
     * Gestiona l'eliminació del mòdul.
     * Envia una petició DELETE a l'API.
     */
    const onClick = () => {
        async function remove() {
            const resp = await fetch("http://localhost/api/module/" + document.getElementById("module").value, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            console.log(data);
        }
        remove();
    }

    return (
        <div>
            <Title title={t('admin.deleteModule.title')} subtitle={t('admin.deleteModule.subtitle')} />

            <div className="flex justify-center m-10">
                <select className="min-w-100 border border-gray-300 rounded-md p-2" name="module" id="module">
                    <option value="">{t('admin.deleteModule.selectModule')}</option>
                    {modules.map((module) => (
                        <option key={module.id} value={module.id}>
                            {module.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-center">
                <button onClick={onClick} className="bg-yellow-400 p-3 rounded-md m-10">
                    {t('admin.deleteModule.button')}
                </button>
            </div>
        </div>
    );
}