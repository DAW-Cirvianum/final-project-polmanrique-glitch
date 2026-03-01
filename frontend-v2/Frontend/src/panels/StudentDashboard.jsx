import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function StudentDashboard() {
    const { t } = useTranslation();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/student">{t('studentDashboard.title')}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#studentNavbar" aria-controls="studentNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="studentNavbar">
                        <div className="navbar-nav">
                            <Link className="nav-link" to="students">{t('studentDashboard.students')}</Link>
                            <Link className="nav-link" to="courses">{t('studentDashboard.courses')}</Link>
                            <Link className="nav-link" to="modules">{t('studentDashboard.modules')}</Link>
                            <Link className="nav-link" to="teachers">{t('studentDashboard.teachers')}</Link>
                            <Link className="nav-link" to="registrationByCourse">{t('studentDashboard.courseRegistration')}</Link>
                            <Link className="nav-link" to="undoRegistration">{t('studentDashboard.undoRegistration')}</Link>
                            <Link className="nav-link" to="profile">{t('studentDashboard.profile')}</Link>
                            <a href="/" onClick={() => localStorage.clear()} className="nav-link">{t('studentDashboard.logout')}</a>
                        </div>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    );
}