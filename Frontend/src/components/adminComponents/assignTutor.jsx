import { useState, useEffect } from "react";
import Title from "../subComponents/Title";

/**
 * Component per assignar un tutor a un curs.
 * Permet seleccionar un professor i un curs per fer l'assignació.
 * @returns {JSX.Element}
 */
export default function AssignTutor() {

    const [tutors, setTutors] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchTutors() {
            const resp = await fetch("http://localhost/api/teachers", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setTutors(data);
        }
        fetchTutors();
    }, []);

    useEffect(() => {
        async function fetchCourses() {
            const resp = await fetch("http://localhost/api/courses", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json",
                },
            });
            const data = await resp.json();
            setCourses(data);
        }
        fetchCourses();
    }, []);

    /**
     * Gestiona l'assignació del tutor.
     * Envia la petició a l'API per vincular el professor amb el curs.
     */
    const onClick = () => {
        async function assignTutor() {
            const resp = await fetch("http://localhost/api/tutor", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: document.getElementById("teacher").value,
                    course_id: document.getElementById("course").value,
                }),
            });
            const data = await resp.json();
            console.log(data);
        }
        assignTutor();
    }


    return (
        <div>
            <Title title="Assign Tutor" subtitle="Assign Tutor" />

            <div className="flex justify-center">
                <div className="m-10">
                    <label className=" block" htmlFor="teacher">Teachers</label>
                    <select name="teacher" id="teacher" className=" min-w-100 border border-gray-300 rounded-md p-2">
                        {tutors.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                        ))}
                    </select>
                </div>

                <div className="m-10">
                    <label className=" block" htmlFor="course">Courses</label>
                    <select name="course" id="course" className="min-w-100 border border-gray-300 rounded-md p-2">
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>{course.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex justify-center">
                <button onClick={onClick} className=" m-10 bg-yellow-400 p-3 rounded-md" >Assign</button>
            </div>

        </div>
    );
}