import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../subcomponents/Title";
import { useTranslation } from "react-i18next";

export default function MyStudents() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserLogged() {
            const resp = await fetch("http://localhost/api/me", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setUser(data);
        }
        fetchUserLogged();
    }, []);

    useEffect(() => {
        if (!user.id) return;

        async function fetchStudents() {
            const resp = await fetch(`http://localhost/api/tutor/students/${user.id}`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setStudents(data);
            setLoading(false);
        }
        fetchStudents();
    }, [user]);

    const onClick = (id) => {
        navigate(`/teacher/student/${id}`);
    };

    return (
        <div>
            <Title title={t('myStudents.title')} subtitle={t('myStudents.subtitle')} />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-12">
                        {loading ? (
                            <div className="text-center p-5">
                                <p className="text-muted fs-5">{t('myStudents.loading')}</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered">
                                    <thead className="table-light">
                                        <tr>
                                            <th>{t('myStudents.tableHeaderName')}</th>
                                            <th>{t('myStudents.tableHeaderEmail')}</th>
                                            <th>{t('myStudents.tableHeaderDetails')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student) => (
                                            <tr key={student.id}>
                                                <td>{student.name}</td>
                                                <td>{student.email}</td>
                                                <td>
                                                    <button
                                                        onClick={() => onClick(student.id)}
                                                        className="btn btn-success btn-sm"
                                                    >
                                                        {t('myStudents.viewDetailsButton')}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}