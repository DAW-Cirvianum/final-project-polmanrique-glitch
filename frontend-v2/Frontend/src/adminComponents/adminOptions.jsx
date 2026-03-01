
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../subcomponents/Title";
import { useTranslation } from "react-i18next";

/**
 * Tauler de control de l'administrador.
 * Proporciona accessos directes per gestionar mòduls, cursos, professors i estudiants.
 * @returns {JSX.Element}
 */
export default function AdminOptions() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div>
            <Title title={t('adminDashboard.title')} subtitle={t('adminDashboard.subtitle')} />

            <div className="container py-5">
                <div className="row g-4">
                    <div className="col-sm-6 col-lg-3">
                        <div className="card h-100 shadow-sm hover-shadow transition p-4 text-center">
                            <h1 className="h5 mb-4">{t('adminDashboard.addModule')}</h1>
                            <button onClick={() => navigate("/admin/addModule")} className="btn btn-warning rounded-pill px-4 py-2">{t('adminDashboard.addButton')}</button>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="card h-100 shadow-sm hover-shadow transition p-4 text-center">
                            <h1 className="h5 mb-4">{t('adminDashboard.addCourse')}</h1>
                            <button onClick={() => navigate("/admin/addCourse")} className="btn btn-warning rounded-pill px-4 py-2">{t('adminDashboard.addButton')}</button>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="card h-100 shadow-sm hover-shadow transition p-4 text-center">
                            <h1 className="h5 mb-4">{t('adminDashboard.registerTeacher')}</h1>
                            <button onClick={() => navigate("/admin/addTeacher")} className="btn btn-warning rounded-pill px-4 py-2">{t('adminDashboard.registerButton')}</button>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="card h-100 shadow-sm hover-shadow transition p-4 text-center">
                            <h1 className="h5 mb-4">{t('adminDashboard.assignTutor')}</h1>
                            <button onClick={() => navigate("/admin/assignTutor")} className="btn btn-warning rounded-pill px-4 py-2">{t('adminDashboard.goButton')}</button>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="card h-100 shadow-sm hover-shadow transition p-4 text-center">
                            <h1 className="h5 mb-4">{t('adminDashboard.deleteModule')}</h1>
                            <button onClick={() => navigate("/admin/deleteModule")} className="btn btn-warning rounded-pill px-4 py-2">{t('adminDashboard.goButton')}</button>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="card h-100 shadow-sm hover-shadow transition p-4 text-center">
                            <h1 className="h5 mb-4">{t('adminDashboard.deleteCourse')}</h1>
                            <button onClick={() => navigate("/admin/deleteCourse")} className="btn btn-warning rounded-pill px-4 py-2">{t('adminDashboard.goButton')}</button>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="card h-100 shadow-sm hover-shadow transition p-4 text-center">
                            <h1 className="h5 mb-4">{t('adminDashboard.deleteTeacher')}</h1>
                            <button onClick={() => navigate("/admin/deleteTeacher")} className="btn btn-warning rounded-pill px-4 py-2">{t('adminDashboard.goButton')}</button>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="card h-100 shadow-sm hover-shadow transition p-4 text-center">
                            <h1 className="h5 mb-4">{t('adminDashboard.deleteStudent')}</h1>
                            <button onClick={() => navigate("/admin/deleteStudent")} className="btn btn-warning rounded-pill px-4 py-2">{t('adminDashboard.goButton')}</button>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="card h-100 shadow-sm hover-shadow transition p-4 text-center">
                            <h1 className="h5 mb-4">{t('adminDashboard.newAdmin')}</h1>
                            <a href="http://localhost/login" target="_blank" rel="noopener noreferrer" className="btn btn-warning rounded-pill px-4 py-2">{t('adminDashboard.goButton')}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}