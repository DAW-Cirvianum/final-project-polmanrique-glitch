import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TeacherBar() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    };

    const navItems = [
        { to: "/", label: t('navigation.home') },
        { to: "/courses", label: t('navigation.courses') },
        { to: "/modules", label: t('navigation.modules') },
        { to: "/profile", label: t('navigation.profile') },
        { to: "/register", label: t('navigation.register') },
        { to: "/myStudents", label: t('navigation.myStudents') },
    ];

    return (
        <nav className="bg-lime-500 text-stone-100">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold">Teacher</Link>

                    <div className="hidden md:flex space-x-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className="px-3 py-2 rounded hover:bg-lime-600 transition"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="px-3 py-2 rounded hover:bg-lime-600 transition cursor-pointer"
                        >
                            {t('navigation.logout')}
                        </button>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-2xl"
                    >
                        ☰
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className="block px-3 py-2 rounded hover:bg-lime-600 transition"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMenuOpen(false);
                                }}
                                className="text-left px-3 py-2 rounded hover:bg-lime-600 transition cursor-pointer"
                            >
                                {t('navigation.logout')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}