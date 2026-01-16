import StudentBar from "./studentBar";
import TeacherBar from "./teacherBar";
import AdminBar from "./adminBar";
import UnloggedBar from "./unloggedBar";
import { useAuth } from "../../contexts/userRolContext";

/**
 * Component que determina quina barra de navegació mostrar segons el rol de l'usuari.
 * Si no hi ha rol, mostra la barra d'usuaris no loguejats.
 * @returns {JSX.Element}
 */
export default function SelectNavBar() {
    //const { role } = useAuth();
    let role = localStorage.getItem("role");
    console.log("ROLE EN NAVBAR:", role);
    if (!role) return <UnloggedBar />;
    if (role === "student") return <StudentBar />;
    if (role === "teacher") return <TeacherBar />;
    if (role === "admin") return <AdminBar />;

    return <UnloggedBar />;
}
