import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
    const { t } = useTranslation();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/admin/options">
                        {t('adminDashboard.title')}
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#adminNavbar"
                        aria-controls="adminNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="adminNavbar">
                        <div className="navbar-nav">
                            <Link className="nav-link" to="profile">
                                {t('adminDashboard.profile')}
                            </Link>
                            <Link className="nav-link" to="students">
                                {t('adminDashboard.students')}
                            </Link>
                            <Link className="nav-link" to="courses">
                                {t('adminDashboard.courses')}
                            </Link>
                            <Link className="nav-link" to="modules">
                                {t('adminDashboard.modules')}
                            </Link>
                            <Link className="nav-link" to="teachers">
                                {t('adminDashboard.teachers')}
                            </Link>
                            <a
                                href="/"
                                onClick={() => localStorage.clear()}
                                className="nav-link"
                            >
                                {t('adminDashboard.logout')}
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    );
}