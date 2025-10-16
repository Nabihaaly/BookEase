import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  const userRoles = user?.roles || [];

  // ✅ Additional safety: prevent Admin/ServiceOwner from typing wrong URLs
  if (userRoles.includes("Admin") && !location.pathname.startsWith("/admin")) {
    return <Navigate to="/admin" replace />;
  }

  if (
    roles &&
    (!userRoles || !roles.some((role) => userRoles.includes(role)))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
