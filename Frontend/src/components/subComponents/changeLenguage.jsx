

import { useTranslation } from "react-i18next";

/**
 * Componente que mostra  i executa el canvi de idioma
 * @returns {JSX.Element}
 */
export default function ChangeLenguage() {
    const { t, i18n } = useTranslation();

    return (
        <div className="flex gap-5 justify-center bg-yellow-500 p-2 text-stone-100">
            <button className="bg-yellow-500 rounded hover:bg-yellow-600 p-2" onClick={() => i18n.changeLanguage("en")}>English</button>
            <button className="bg-yellow-500 rounded hover:bg-yellow-600 p-2" onClick={() => i18n.changeLanguage("ca")}>Català</button>
        </div>
    );
}