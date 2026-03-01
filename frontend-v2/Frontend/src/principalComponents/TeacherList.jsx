import { useState, useEffect } from "react";
import Title from "../subcomponents/Title";
import { useTranslation } from "react-i18next";

export default function Teachers() {
    const { t } = useTranslation();
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        async function fetchTeachers() {
            const resp = await fetch("http://localhost/api/teachers", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });

            const data = await resp.json();
            setTeachers(data);
        }

        fetchTeachers();
    }, []);

    return (
        <>
            <Title title={t('teachers.title')}subtitle={t('teachers.subtitle')}/>

            <div className="container py-5">

                <div className="card shadow-sm border-0">
                    <div className="card-body">

                        <div className="table-responsive">
                            <table className="table table-striped table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>{t('teachers.tableHeaderName')}</th>
                                        <th>{t('teachers.tableHeaderEmail')}</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {teachers.map((teacher) => (
                                        <tr key={teacher.id}>
                                            <td className="fw-semibold">
                                                {teacher.name}
                                            </td>
                                            <td>
                                                {teacher.email}
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