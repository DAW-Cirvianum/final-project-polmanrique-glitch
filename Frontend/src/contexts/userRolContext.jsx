// userRolContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

/**
 * Proveïdor del context d'autenticació per gestionar el rol de l'usuari.
 * @param {Object} props - Les propietats del component.
 * @param {React.ReactNode} props.children - Els components fills.
 * @returns {JSX.Element}
 */
export function AuthProvider({ children }) {
    const [role, setRole] = useState(null);

    const login = (userRole) => {
        setRole(userRole);
    };

    const logout = () => {
        setRole(null);
    };

    console.log("ROLE EN CONTEXTO:", role);

    return (
        <AuthContext.Provider value={{ role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


/**
 * Hook per accedir al context d'autenticació.
 * @returns {Object} El context d'autenticació amb role, login i logout.
 */
export function useAuth() {
    return useContext(AuthContext);
}
