import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Title from "../subComponents/Title";

/**
 * Component per afegir un nou curs.
 * Permet a l'administrador crear un curs especificant el nom i l'any.
 * @returns {JSX.Element}
 */
export default function AddCourse() {
    const { t } = useTranslation();

    /**
     * Gestiona la creació del curs.
     * Envia les dades del formulari a l'API.
     * @param {Event} e - L'esdeveniment del formulari.
     */
    const addCourse = async (e) => {
        e.preventDefault()

        if (!document.getElementById("addCourseForm").checkValidity()) {
            document.getElementById("error").textContent = "Please fill in all fields"
            return
        } else if (document.getElementById("name").value === "" || document.getElementById("year").value === "") {
            document.getElementById("error").textContent = "Please fill in all fields"
            return
        }

        const resp = await fetch("http://localhost/api/course", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                name: document.getElementById("name").value,
                year: document.getElementById("year").value,
            }),
        })

        if (!resp.ok) {
            const errorText = await resp.text()
            console.error("Error response:", errorText)
            return
        }

        const data = await resp.json()
        console.log(data)


    }

    return (
        <div>
            <Title title={t('admin.addCourse.title')} subtitle={t('admin.addCourse.subtitle')} />

            <form id="addCourseForm" noValidate onSubmit={addCourse} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                        {t('admin.addCourse.form.name')}
                    </label>
                    <input id="name" className="border w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2" type="text" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="year">
                        {t('admin.addCourse.form.year')}
                    </label>
                    <input id="year" className="border w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2" type="text" />
                </div>

                <p id="error" className="text-red-500">{t('admin.addCourse.form.error')}</p>

                <button className="border w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition" type="submit">
                    {t('admin.addCourse.form.submitButton')}
                </button>
            </form>
        </div>
    );
}