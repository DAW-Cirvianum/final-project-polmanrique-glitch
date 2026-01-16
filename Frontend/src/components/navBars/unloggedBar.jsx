import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Barra de navegació per a usuaris no autenticats.
 * Mostra enllaços públics com Home, Login i Register.
 * @returns {JSX.Element}
 */
export default function UnloggedBar() {
    const { t } = useTranslation();

    return (
        <div>
            <nav className="flex justify-center bg-lime-500 p-5 text-stone-100">
                <ul className="flex gap-10">
                    <li><Link to="/">{t('navigation.home')}</Link></li>
                    <li><Link to="/login">{t('navigation.loginItem')}</Link></li>
                    <li><Link to="/register">{t('navigation.register')}</Link></li>
                </ul>
            </nav>
        </div>
    );
}