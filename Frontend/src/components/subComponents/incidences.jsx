import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Componente que mostra les incidències d'un estudiant en concret
 * @param {number} studentId 
 * @returns {JSX.Element}
 */
export default function Incidences({ studentId }) {
    const { t } = useTranslation();
    const [incidences, setIncidences] = useState([]);
    const [loading, setLoading] = useState(true);

    /**
     * S'executa quan el component s'ha renderitzat
     * i busca les incidències d'un estudiant en concret
     */
    useEffect(() => {
        /**
         * Retorna tots els registres d'incidències d'un estudiant en concret
         */
        async function fetchIncidences() {
            const resp = await fetch(`http://localhost/api/incidentsByStudent/${studentId}`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setIncidences(data);
            setLoading(false);
        }

        fetchIncidences();
    }, [studentId]);

    return (
        <div>
            <div className="flex justify-center">
                {loading ? (
                    <div className="p-10 text-center">
                        <p className="text-gray-500 text-lg">{t('incidences.loading')}</p>
                    </div>
                ) : (
                    <table className="p-10 m-10 table-auto w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                                    {t('incidences.table.grade')}
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                                    {t('incidences.table.description')}
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 bg-white">
                            {incidences.map((incidence) => (
                                <tr key={incidence.id}>
                                    <td className="px-6 py-4 text-gray-800">
                                        {incidence.grade}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {incidence.description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}