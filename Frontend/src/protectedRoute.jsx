import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles, fallbackPath = "/profile" }) {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    console.log("ProtectedRoute debug:", { token, rol, allowedRoles });

    if (!token) {
        console.log("No token, redirecting to login");
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(rol)) {
        console.log(`Access denied: Rol "${rol}" not in allowedRoles:`, allowedRoles);
        return <Navigate to={fallbackPath} replace />;
    }

    console.log("Access granted for role:", rol);
    return children;
}