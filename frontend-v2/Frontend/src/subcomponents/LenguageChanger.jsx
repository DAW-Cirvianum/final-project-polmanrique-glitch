import { useTranslation } from "react-i18next";

export default function LanguageChanger() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className="navbar navbar-dark bg-dark py-1">
            <div className="container-fluid">
                <span className="navbar-text text-white-50 small">
                    Idioma / Language
                </span>
                <div className="d-flex">
                    <button onClick={() => changeLanguage("ca")}
                        className={`btn btn-sm ${i18n.language === "ca" ? "btn-primary": "btn-outline-light"} me-2`}>
                        Català
                    </button>
                    <button onClick={() => changeLanguage("en")}
                        className={`btn btn-sm ${i18n.language === "en"? "btn-primary": "btn-outline-light"}`}>
                        English
                    </button>
                </div>
            </div>
        </nav>
    );
}