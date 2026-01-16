import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Title from "../subComponents/Title";

/**
 * Component de registre d'usuaris.
 * Permet als nous usuaris registrar-se a l'aplicació.
 * @returns {JSX.Element}
 */
export default function Register() {
    const { t } = useTranslation();
    const [error, setError] = useState("");
    const [populations, setPopulations] = useState([]);


    /**
     * Reb les poblacions de la base de dades.
     */
    useEffect(() => {
        async function fetchPopulations() {
            const resp = await fetch("http://localhost/api/populations");
            const data = await resp.json();
            setPopulations(data);
        }
        fetchPopulations();
    }, []);

    /**
     * Gestiona l'enviament del formulari de registre del professor.
     * @param {Event} e - L'esdeveniment del formulari.
     */
    const register = (e) => {
        e.preventDefault();

        async function fetchUsers() {
            const resp = await fetch("http://localhost/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: document.getElementById("nom").value,
                    surname: document.getElementById("cognom").value,
                    email: document.getElementById("email").value,
                    password: document.getElementById("contrassenya").value,
                    rol: "teacher",
                    population_id: document.getElementById("poblacio").value,
                }),
            });

            const data = await resp.json();

            if (!resp.ok) {
                alert(data.message || t('register.errors.registrationFailed'));
                return;
            }

            localStorage.setItem('token', data.token);
            setUser(data.user);
            setError("");
            navigate("/profile");
        }

        if (document.getElementById("nom").value === "" ||
            document.getElementById("cognom").value === "" ||
            document.getElementById("email").value === "" ||
            document.getElementById("contrassenya").value === "" ||
            document.getElementById("poblacio").value === "") {
            setError(t('register.errors.requiredFields'));
        } else if (!e.target.checkValidity()) {
            setError(t('register.errors.invalidData'));
        } else {
            fetchUsers();
        }
    }

    return (
        <div className="">

            <Title title={t('register.title')} subtitle={t('register.subtitle')} />

            <div className="flex justify-center">
                <form onSubmit={register} noValidate className="p-4 border m-10 w-100 text-stone-900 shadow-xl rounded-xl ">

                    <div className="grid grid-flow-col grid-cols-2">
                        <div className="mt-5 p-1">
                            <label className="block" htmlFor="nom">{t('register.form.name')}</label>
                            <input type="text" required className="rounded-md border bg-stone-50 text-stone-700 w-full" id="nom" />
                        </div>

                        <div className=" mt-5 p-1">
                            <label className="block" htmlFor="cognom">{t('register.form.surname')}</label>
                            <input type="text" required className="rounded-md border bg-stone-50 text-stone-700 w-full" id="cognom" />
                        </div>
                    </div>

                    <div className="mt-5 p-1">
                        <label className="block" htmlFor="email">{t('register.form.email')}</label>
                        <input type="email" required className="rounded-md border bg-stone-50 w-full text-stone-700" id="email" />
                    </div>

                    <div className="mt-5 p-1">
                        <label className="block" htmlFor="contrassenya">{t('register.form.password')}</label>
                        <input type="password" required className="rounded-md border bg-stone-50 w-full text-stone-700" id="contrassenya" />
                    </div>

                    <div className=" mt-5 p-1">
                        <label className="block" htmlFor="poblacio">{t('register.form.population')}</label>
                        <select required className="rounded-md border bg-stone-50 w-full text-stone-700" id="poblacio">
                            <option value="">{t('register.form.populationPlaceholder')}</option>
                            {populations.map((population) => (
                                <option key={population.id} value={population.id}>{population.town}</option>
                            ))}
                        </select>
                    </div>

                    <p id="error" className="m-3 text-red-500">{error}</p>

                    <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-lime-600 text-white py-2 rounded-md font-semibold hover:opacity-90 transition">
                        {t('register.form.submitButton')}
                    </button>
                </form>
            </div>
        </div>
    )
}