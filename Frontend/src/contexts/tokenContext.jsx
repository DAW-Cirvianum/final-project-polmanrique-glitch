import { createContext, useState, useContext, useEffect } from 'react';

const TokenContext = createContext();

/**
 * Proveïdor del context de token per a l'autenticació.
 * Gestiona l'estat del token i proporciona funcions per fer login i logout.
 * @param {Object} props - Les propietats del component.
 * @param {React.ReactNode} props.children - Els components fills que tindran accés al context.
 * @returns {JSX.Element}
 */
export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <TokenContext.Provider value={{ token, login, logout }}>
            {children}
        </TokenContext.Provider>
    );
};

/**
 * Hook personalitzat per accedir al context del token.
 * Retorna l'objecte del context amb el token i les funcions de gestió.
 * @returns {Object} El context del token.
 * @throws {Error} Si s'utilitza fora d'un TokenProvider.
 */
export const useToken = () => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
};
