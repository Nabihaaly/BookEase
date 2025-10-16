// Prevents authenticated role-users from accessing public routes

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
 const {user } = useContext(AuthContext);

  // Role-based users cannot access public routes
  if (user?.roles.includes('Admin')) {
    return <Navigate to="/admin" replace />;
  }
  if (user?.roles.includes('ServiceProvider')) {
    return <Navigate to="/ServiceOwner" replace />;
  }

  // Regular users can access public routes
  return children;
};

export default PublicRoute;