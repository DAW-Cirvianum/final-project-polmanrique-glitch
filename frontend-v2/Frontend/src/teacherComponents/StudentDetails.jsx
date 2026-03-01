import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../subcomponents/Title";
import { useTranslation } from "react-i18next";

export default function StudentDetails() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [marks, setMarks] = useState([]);
    const [incidences, setIncidences] = useState([]);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        async function fetchData() {
            // Alumno
            const respStudent = await fetch(`http://localhost/api/student/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    Accept: "application/json",
                },
            });
            const studentData = await respStudent.json();
            setStudent(studentData);

            // Notas
            const respMarks = await fetch(`http://localhost/api/marksByStudent/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    Accept: "application/json",
                },
            });
            const marksData = await respMarks.json();

            // Módulos
            const respModules = await fetch(`http://localhost/api/modules`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    Accept: "application/json",
                },
            });
            const modulesData = await respModules.json();
            setModules(modulesData);

            // Añadir nombre del módulo a cada nota
            const marksWithModuleName = marksData.map(mark => {
                const module = modulesData.find(m => m.id === mark.module_id);
                return {
                    ...mark,
                    module_name: module ? module.name : t('studentDetails.unknownModule')
                };
            });
            setMarks(marksWithModuleName);

            // Incidencias
            const respIncidences = await fetch(`http://localhost/api/incidentsByStudent/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    Accept: "application/json",
                },
            });
            const incidencesData = await respIncidences.json();
            setIncidences(incidencesData);

            setLoading(false);
        }

        fetchData();
    }, [id, t]);

    if (!student || loading) {
        return <p>{t('studentDetails.loading')}</p>;
    }

    const deleteMark = async (markId) => {
        if (!window.confirm(t('studentDetails.deleteMarkConfirm'))) return;

        const resp = await fetch(`http://localhost/api/marks/${markId}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                Accept: "application/json",
            },
        });

        if (resp.ok) {
            setMarks(marks.filter((mark) => mark.id !== markId));
        }
    };

    const updateMark = (markId) => {
        navigate(`/teacher/updateMark/${markId}`);
    };

    const deleteIncidence = async (incId) => {
        if (!window.confirm(t('studentDetails.deleteIncidenceConfirm'))) return;

        const resp = await fetch(`http://localhost/api/incidences/${incId}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                Accept: "application/json",
            },
        });

        if (resp.ok) {
            setIncidences(incidences.filter((inc) => inc.id !== incId));
        }
    };

    const updateIncidence = (incId) => {
        navigate(`/teacher/updateIncidence/${incId}`);
    };

    return (
        <div>
            <Title title={student.name} subtitle={student.email} />

            <div className="container mt-5">

                {/* Taula de notes */}
                <div className="table-responsive my-4">
                    <h4>{t('studentDetails.marksTitle')}</h4>
                    <table className="table table-striped table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th>{t('studentDetails.tableHeaderModule')}</th>
                                <th>{t('studentDetails.tableHeaderMark')}</th>
                                <th>{t('studentDetails.tableHeaderEdit')}</th>
                                <th>{t('studentDetails.tableHeaderDelete')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marks.map((mark) => (
                                <tr key={mark.id}>
                                    <td>{mark.module_name}</td>
                                    <td>{mark.mark}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => updateMark(mark.id)}
                                        >
                                            {t('studentDetails.editButton')}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteMark(mark.id)}
                                        >
                                            {t('studentDetails.deleteButton')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Taula d'incidències */}
                <div className="table-responsive my-4">
                    <h4>{t('studentDetails.incidencesTitle')}</h4>
                    <table className="table table-striped table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th>{t('studentDetails.tableHeaderDescription')}</th>
                                <th>{t('studentDetails.tableHeaderGrade')}</th>
                                <th>{t('studentDetails.tableHeaderEdit')}</th>
                                <th>{t('studentDetails.tableHeaderDelete')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incidences.map((incidence) => (
                                <tr key={incidence.id}>
                                    <td>{incidence.description}</td>
                                    <td>{incidence.grade}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => updateIncidence(incidence.id)}
                                        >
                                            {t('studentDetails.editButton')}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteIncidence(incidence.id)}
                                        >
                                            {t('studentDetails.deleteButton')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}