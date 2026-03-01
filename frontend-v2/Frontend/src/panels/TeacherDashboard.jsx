// TeacherDashboard.jsx
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function TeacherDashboard() {
    const { t } = useTranslation();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/teacher">{t('teacherDashboard.title')}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#teacherNavbar" aria-controls="teacherNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="teacherNavbar">
                        <div className="navbar-nav">
                            <Link className="nav-link" to="students">{t('teacherDashboard.students')}</Link>
                            <Link className="nav-link" to="courses">{t('teacherDashboard.courses')}</Link>
                            <Link className="nav-link" to="modules">{t('teacherDashboard.modules')}</Link>
                            <Link className="nav-link" to="teachers">{t('teacherDashboard.teachers')}</Link>
                            <Link className="nav-link" to="profile">{t('teacherDashboard.profile')}</Link>
                            <Link className="nav-link" to="myStudents">{t('teacherDashboard.myStudents')}</Link>
                            <Link className="nav-link" to="addMark">{t('teacherDashboard.addMark')}</Link>
                            <Link className="nav-link" to="addIncidence">{t('teacherDashboard.addIncidence')}</Link>
                            <a href="/" onClick={() => localStorage.clear()} className="nav-link">{t('teacherDashboard.logout')}</a>
                        </div>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    );
}