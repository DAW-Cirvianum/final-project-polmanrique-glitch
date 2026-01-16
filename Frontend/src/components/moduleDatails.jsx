import { useState, useEffect } from "react";
import Title from "./subComponents/Title";
import { useTranslation } from "react-i18next";

/**
 * Component per mostrar els detalls d'un mòdul específic.
 * Mostra informació com el codi, hores, curs i llista d'estudiants matriculats.
 * @returns {JSX.Element}
 */
export default function ModuleDetails() {
  const { t } = useTranslation();
  const [module, setModule] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const module = JSON.parse(localStorage.getItem("module"));
    const registration = JSON.parse(localStorage.getItem("registration"));
    setModule(module);
    setStudents(registration);
  }, []);

  return (
    <div>
      {module && (
        <div className="min-h-screen bg-gray-50">
          <Title title={module.name.toUpperCase()} subtitle={t('moduleDetails.title')} />

          <div className="max-w-5xl mx-auto px-6 -mt-16">
            <div className="bg-white rounded-2xl shadow-xl p-10 text-center mb-16">
              <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-2">{t('moduleDetails.code')}</h2>
              <p className="text-5xl font-bold text-gray-800">{module.code}</p>
            </div>

            <div className="flex justify-center min-w-100 mb-16">
              <div className="min-w-100 bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition">
                <h3 className="text-lg text-gray-400 mb-2">{t('moduleDetails.hours')}</h3>
                <p className="text-4xl font-bold text-emerald-600">{module.hours}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-10 mb-20">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('moduleDetails.enrolledStudents')}</h2>
              <ul className="divide-y">
                {students.map((student, index) => (
                  <li key={index} className="py-4 text-lg text-gray-700 hover:text-emerald-600 transition">{student.student_name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}