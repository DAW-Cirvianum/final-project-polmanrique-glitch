import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./subComponents/Title";

/**
 * Tauler de control de l'administrador.
 * Proporciona accessos directes per gestionar mòduls, cursos, professors i estudiants.
 * @returns {JSX.Element}
 */
export default function AdminDashboard() {

    const navigate = useNavigate();

    return (
        <div>
            <Title title="Admin Dashboard" subtitle="Dashboard" />

            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">


                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center">
                        <h1 className="text-xl font-semibold mb-6">Add Module</h1>
                        <button onClick={() => navigate("/admin/addModule")} className="px-6 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 font-medium transition">+</button>
                    </div>


                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center">
                        <h1 className="text-xl font-semibold mb-6">Add New Course</h1>
                        <button onClick={() => navigate("/admin/addCourse")} className="px-6 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 font-medium transition">+</button>
                    </div>


                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center">
                        <h1 className="text-xl font-semibold mb-6">Register Teacher</h1>
                        <button onClick={() => navigate("/admin/addTeacher")} className="px-6 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 font-medium transition">Register</button>
                    </div>


                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center">
                        <h1 className="text-xl font-semibold mb-6">Assign Tutor</h1>
                        <button onClick={() => navigate("/assignTutor")} className="px-6 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 font-medium transition">Go</button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center">
                        <h1 className="text-xl font-semibold mb-6">Delete Module</h1>
                        <button onClick={() => navigate("/deleteModule")} className="px-6 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 font-medium transition">Go</button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center">
                        <h1 className="text-xl font-semibold mb-6">Delete Course</h1>
                        <button onClick={() => navigate("/deleteCourse")} className="px-6 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 font-medium transition">Go</button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center">
                        <h1 className="text-xl font-semibold mb-6">Delete Teacher</h1>
                        <button onClick={() => navigate("/deleteTeacher")} className="px-6 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 font-medium transition">Go</button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center">
                        <h1 className="text-xl font-semibold mb-6">Delete Student</h1>
                        <button onClick={() => navigate("/deleteStudent")} className="px-6 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 font-medium transition">Go</button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center">
                        <h1 className="text-xl font-semibold mb-6">new admin</h1>
                        <a href="http://localhost/asignar-admin" target="_blank" className="px-6 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 font-medium transition inline-block">Go</a>
                    </div>



                </div>
            </div>
        </div>

    );

}