import { useState, useEffect } from "react";

/**
 * Componente que mostra las notas de un alumne
 * @param {number} studentId 
 * @returns {JSX.Element}
 */
export default function Marks({ studentId }) {

    const [marks, setMarks] = useState([]);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const respMarks = await fetch(`http://localhost/api/marksByStudent/${studentId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const marksData = await respMarks.json();

            const respModules = await fetch(`http://localhost/api/modules`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const modulesData = await respModules.json();

            setModules(modulesData);
            let marksWithModuleName = marksData.map(mark => {
                let module = modulesData.find(m => m.id == mark.module_id);

                let newMark = {};
                newMark.id = mark.id;
                newMark.student_id = mark.student_id;
                newMark.module_id = mark.module_id;
                newMark.mark = mark.mark;
                newMark.created_at = mark.created_at;
                newMark.updated_at = mark.updated_at;
                newMark.module_name = module ? module.name : "Desconocido";

                return newMark;
            });

            setMarks(marksWithModuleName);
            setLoading(false);
        }

        if (studentId) fetchData();
    }, [studentId]);

    return (
        <div className="container mt-4">
            {loading ? (
                <div className="text-center p-5">
                    <p className="text-secondary fs-5">Carregan...</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover shadow-sm">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">Mòdul</th>
                                <th scope="col">Nota</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marks.map((mark) => (
                                <tr key={mark.id}>
                                    <td>{mark.module_name}</td>
                                    <td>{mark.mark}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}