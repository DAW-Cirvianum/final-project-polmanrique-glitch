import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Componente que mostra les notes d'un estudiant en concret
 * @param {number} studentId 
 * @returns {JSX.Element}
 */
export default function Marks({ studentId }) {
    const { t } = useTranslation();
    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(true);

    /**
     * S'executa quan el component s'ha renderitzat
     * i busca les notes d'un estudiant en concret
     */
    useEffect(() => {
        /**
         * Retorna tots els registres de notes d'un estudiant en concret
         */
        async function fetchMarks() {
            const resp = await fetch(`http://localhost/api/marksByStudent/${studentId}`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setMarks(data);
            setLoading(false);
        }

        fetchMarks();
    }, [studentId]);

    return (
        <div>
            <div className="flex justify-center">
                {loading ? (
                    <div className="p-10 text-center">
                        <p className="text-gray-500 text-lg">{t('marks.loading')}</p>
                    </div>
                ) : (
                    <table className="p-10 m-10 table-auto w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                                    {t('marks.table.module')}
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                                    {t('marks.table.mark')}
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 bg-white">
                            {marks.map((mark) => (
                                <tr key={mark.id}>
                                    <td className="px-6 py-4 text-gray-800">
                                        {mark.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {mark.mark}
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