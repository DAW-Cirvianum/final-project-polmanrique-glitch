import { useState, useEffect } from "react";


/**
 * Componente que muestra las incidencias de un estudiante
 * @param {number} studentId 
 * @returns {JSX.Element}
 */
export default function Incidences({ studentId }) {
    
    const [incidences, setIncidences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        <div className="container mt-4">
            {loading ? (
                <div className="text-center p-5">
                    <p className="text-secondary fs-5">Carregant</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover shadow-sm">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">Grau</th>
                                <th scope="col">Descripcio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incidences.map((incidence) => (
                                <tr key={incidence.id}>
                                    <td>{incidence.grade}</td>
                                    <td>{incidence.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}