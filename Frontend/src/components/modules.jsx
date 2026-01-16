import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./subComponents/Title";
import { useTranslation } from "react-i18next";

/**
 * Component per mostrar la llista de mòduls disponibles.
 * Permet filtrar per curs i veure el detall de cada mòdul.
 * @returns {JSX.Element}
 */
export default function Modules() {
    const { t } = useTranslation();
    const [modules, setModules] = useState([]);
    const [registration, setRegistration] = useState([]);
    const [scopes, setScopes] = useState([]);
    const navigate = useNavigate();

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

            const resp2 = await fetch("http://localhost/api/scopes", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data2 = await resp2.json();

            setScopes(data2);
            setModules(data);
        }
        fetchModules();
    }, []);

    /**
     * Gestiona el clic en un mòdul.
     * Guarda la informació del mòdul i navega a la seva pàgina de detalls.
     * @param {Object} module - L'objecte del mòdul seleccionat.
     */
    const onClickModule = async (module) => {
        const resp = await fetch(`http://localhost/api/modulesByRegistration/${module.id}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Accept": "application/json",
            },
        });
        const data = await resp.json();

        localStorage.setItem("registration", JSON.stringify(data));
        localStorage.setItem("module", JSON.stringify(module));

        navigate(`/modules/${module.id}`);
    };

    /**
     * Gestiona el canvi en el filtre de cursos.
     * Actualitza la llista de mòduls segons el curs seleccionat.
     * @param {string} scopeId - L'ID del curs seleccionat.
     */
    const onChangeScope = async (scopeId) => {
        if (scopeId === "") {
            const resp = await fetch("http://localhost/api/modules", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setModules(data);
            return;
        }
        const resp = await fetch(`http://localhost/api/filterByScope/${scopeId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Accept": "application/json",
            },
        });
        const data = await resp.json();
        setModules(data);
    };

    return (
        <div className="">
            <Title title={t('modules.title')} subtitle={t('modules.subtitle')} />

            <div className="flex flex-col items-center m-5">
                <label htmlFor="scopes" className="mb-2 text-lg font-medium text-gray-700">
                    {t('modules.filter.courses')}
                </label>
                <select id="scopes" className="w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" onChange={(e) => onChangeScope(e.target.value)} >
                    <option value="">
                        {t('modules.filter.selectCourse')}
                    </option>
                    {scopes.map((scope) => (
                        <option key={scope.id} value={scope.id}>
                            {scope.name}
                        </option>
                    ))}
                </select>
            </div>

            <hr />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {modules.map((module) => (
                    <div
                        key={module.id}
                        onClick={() => onClickModule(module)}
                        className="bg-white border rounded-lg shadow-md p-6 text-left
                               hover:shadow-xl 
                               transition-all duration-200 m-5">
                        <p className="text-xl font-medium mb-2">
                            {module.name}
                        </p>

                        <p className="text-sm text-gray-500">
                            {t('modules.filter.code')}: {module.code}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}