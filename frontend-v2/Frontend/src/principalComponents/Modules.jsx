
import { useState, useEffect } from "react";
import Title from "../subcomponents/Title";
import { useTranslation } from "react-i18next";

export default function Modules() {
    const { t } = useTranslation();
    const [modules, setModules] = useState([]);
    const [scopes, setScopes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const headers = {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Accept": "application/json",
            };

            const [modulesResp, scopesResp] = await Promise.all([
                fetch("http://localhost/api/modules", { headers }),
                fetch("http://localhost/api/scopes", { headers })
            ]);

            setModules(await modulesResp.json());
            setScopes(await scopesResp.json());
        }

        fetchData();
    }, []);

    const onChangeScope = async (scopeId) => {
        const headers = {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Accept": "application/json",
        };

        const url = scopeId === ""
            ? "http://localhost/api/modules"
            : `http://localhost/api/filterByScope/${scopeId}`;

        const resp = await fetch(url, { headers });
        setModules(await resp.json());
    };

    return (
        <>
            <Title title={t('modules.title')} subtitle={t('modules.subtitle')}/>

            <div className="container py-5">

                
                <div className="row justify-content-center mb-5">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <label htmlFor="scopes" className="form-label fw-semibold">
                                    {t('modules.filterLabel')}
                                </label>
                                <select
                                    id="scopes"
                                    className="form-select"
                                    onChange={(e) => onChangeScope(e.target.value)}
                                >
                                    <option value="">{t('modules.allCourses')}</option>
                                    {scopes.map((scope) => (
                                        <option key={scope.id} value={scope.id}>
                                            {scope.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="row g-4">
                    {modules.map((module) => (
                        <div
                            key={module.id}
                            className="col-12 col-sm-6 col-md-4 col-xl-3"
                        >
                            <div
                                className="card h-100 border-0 shadow-sm module-card"
                            >
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold">
                                        {module.name}
                                    </h5>

                                    <p className="text-muted small mb-4">
                                        {t('modules.code')} {module.code}
                                    </p>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}