import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children, roles})=>{
    const {user, loading} = useContext(AuthContext);

    if (loading) return <div>Loading...</div>

    if (!user) return <Navigate to="/login"/>

    if (roles && (!user.roles || !roles.some((role) => user.roles.includes(role)))) {
        return <div>Unauthorized (Role mismatch)</div>;
    }

    return children;
};

export default ProtectedRoute;