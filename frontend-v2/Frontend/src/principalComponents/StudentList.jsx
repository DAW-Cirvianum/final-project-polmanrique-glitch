import { useState, useEffect } from "react";
import Title from "../subcomponents/Title";
import { useTranslation } from "react-i18next";

export default function Students() {
    const { t } = useTranslation();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchStudents() {
            const resp = await fetch("http://localhost/api/students", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });

            const data = await resp.json();
            setStudents(data);
        }

        fetchStudents();
    }, []);

    return (
        <>
            <Title
                title={t('students.title')}
                subtitle={t('students.subtitle')}
            />

            <div className="container py-5">

                <div className="card shadow-sm border-0">
                    <div className="card-body">

                        <div className="table-responsive">
                            <table className="table table-striped table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>{t('students.tableHeaderName')}</th>
                                        <th>{t('students.tableHeaderSurname')}</th>
                                        <th>{t('students.tableHeaderEmail')}</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {students.map((student) => (
                                        <tr key={student.id}>
                                            <td className="fw-semibold">
                                                {student.name}
                                            </td>
                                            <td>
                                                {student.surname}
                                            </td>
                                            <td className="text-muted">
                                                {student.email}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}