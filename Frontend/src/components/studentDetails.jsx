import { useState, useEffect } from "react";
import Title from "./subComponents/Title";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function StudentDetails() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const id = localStorage.getItem("studentId");
    const [student, setStudent] = useState(null);
    const [marks, setMarks] = useState([]);
    const [incidences, setIncidences] = useState([]);

    useEffect(() => {
        if (!id) return;

        async function fetchStudent() {
            const resp = await fetch(`http://localhost/api/student/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    Accept: "application/json",
                },
            });
            const data = await resp.json();
            setStudent(data);
        }

        async function fetchMarks() {
            const resp = await fetch(`http://localhost/api/marksByStudent/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    Accept: "application/json",
                },
            });
            const data = await resp.json();
            setMarks(data);
        }

        async function fetchIncidences() {
            const resp = await fetch(`http://localhost/api/incidentsByStudent/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    Accept: "application/json",
                },
            });
            const data = await resp.json();
            setIncidences(data);
        }

        fetchStudent();
        fetchMarks();
        fetchIncidences();
        console.log(marks);
    }, [id]);

    if (!student) {
        return <p>{t("students.loading")}</p>;
    }

    const deleteMark = async (id) => {

        let confirmation = window.confirm("Are you sure you want to delete this mark?");
        if (!confirmation) {
            return;
        }

        const resp = await fetch(`http://localhost/api/marks/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                Accept: "application/json",
            },
        });
        if (resp.ok) {
            setMarks(marks.filter((mark) => mark.id !== id));
        }
    };

    const updateMark = (id) => {
        localStorage.setItem("markId", id);
        navigate(`/updateMark/${id}`);
    };

    const updateIncidence = (id) => {
        localStorage.setItem("incidenceId", id);
        navigate(`/updateIncidence/${id}`);
    };

    const deleteIncidence = async (id) => {

        let confirmation = window.confirm("Are you sure you want to delete this incidence?");
        if (!confirmation) {
            return;
        }

        const resp = await fetch(`http://localhost/api/incidences/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                Accept: "application/json",
            },
        });
        if (resp.ok) {
            setIncidences(incidences.filter((incidence) => incidence.id !== id));
        }
    };

    return (
        <div>
            <Title
                title={student.name}
                subtitle={student.email} />

            {/* Marks */}
            <div className="flex justify-center">
                <table className="p-10 m-10 table-auto w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                                {t("marks.table.subject")}
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                                {t("marks.table.mark")}
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                                {t("buttons.edit")}
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                                {t("buttons.delete")}
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 bg-white">
                        {marks.map((mark) => (
                            <tr key={mark.id}>
                                <td className="px-6 py-4 text-gray-800">
                                    {mark.subject}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {mark.mark}
                                </td>
                                <td>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => updateMark(mark.id)}>
                                        {t("buttons.edit")}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => deleteMark(mark.id)} >
                                        {t("buttons.delete")}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center">
                <table className="p-10 m-10 table-auto w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                                {t("incidences.table.description")}
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                                {t("incidences.table.grade")}
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                                {t("buttons.edit")}
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                                {t("buttons.delete")}
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 bg-white">
                        {incidences.map((incidence) => (
                            <tr key={incidence.id}>
                                <td className="px-6 py-4 text-gray-800">
                                    {incidence.description}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {incidence.grade}
                                </td>
                                <td>
                                    <button
                                        onClick={() => updateIncidence(incidence.id)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        {t("buttons.edit")}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => deleteIncidence(incidence.id)}
                                    >
                                        {t("buttons.delete")}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
