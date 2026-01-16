import { useTranslation } from "react-i18next";

/**
 * Component de la pàgina d'inici (Landing Page).
 * Presenta informació general sobre l'aplicació i opcions per registrar-se o iniciar sessió.
 * @returns {JSX.Element}
 */
export default function Landing() {
    const { t } = useTranslation();

    return (
        <div className="bg-gray-50">

            <section className="bg-gradient-to-r from-lime-500 to-green-600 text-white">
                <div className="max-w-6xl mx-auto px-6 py-24 text-center">
                    <h1 className="text-5xl font-bold mb-6">{t('landing.title')}</h1>
                    <p className="text-xl mb-10 max-w-3xl mx-auto">
                        {t('landing.subtitle')}
                    </p>

                    <div className="flex justify-center gap-6">
                        <a href="/register" className="bg-white text-green-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition">{t('landing.registerButton')}</a>
                        <a href="/login" className="border border-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-green-700 transition">{t('login')}</a>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-20">
                <h2 className="text-3xl font-semibold text-center mb-14">{t('landing.features.title')}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-medium mb-4">{t('landing.features.enrollments.title')}</h3>
                        <p className="text-gray-600">
                            {t('landing.features.enrollments.description')}
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-medium mb-4">{t('landing.features.courses.title')}</h3>
                        <p className="text-gray-600">
                            {t('landing.features.courses.description')}
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-medium mb-4">{t('landing.features.teachers.title')}</h3>
                        <p className="text-gray-600">
                            {t('landing.features.teachers.description')}
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
}