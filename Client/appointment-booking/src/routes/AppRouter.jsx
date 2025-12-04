import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";

import Landing from "../pages/Landing.jsx";
import SignUpPage from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import Unauthorized from "../pages/Unauthorized"
import NotFound from "../pages/NotFound"

import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

// Landing Services imports / User Dashboard imports
import ServicesLayout from "../layouts/ServicesLayout";
import CategoriesPage from "../pages/Categories/CategoriesPage";
import ServiceOwnersPage from "../pages/services/ServiceOwnersPage";
import ServiceOwnerDetailsPage from "../pages/services/ServiceOwnerDetailsPage";
import AllServiceOwnersPage from "../pages/services/AllServiceOwnersPage";
import AllServicesPage from "../pages/services/AllServicesPage";

import MyAppointments from "../pages/user/MyAppointmentsPage";

// Admin imports
import AdminLayout from "../layouts/AdminLayout";
import AdminAppointments from "../pages/admin/AdminAppointments";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminServiceOwners from "../pages/admin/AdminServiceOwners";

// ServiceOwner imports
import ServiceOwnerLayout from "../layouts/ServiceOwnerLayout";
import OwnerAppointments from "../pages/ServiceOwner/OwnerAppointments";
import OwnerProfile from "../pages/ServiceOwner/OwnerProfile";
import CreateProfile from "../pages/ServiceOwner/CreateProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<Login />} />

      <Route element={<PublicRoute><ServicesLayout /></PublicRoute>}>
        {/* categories flow */}
        <Route path="/categories" element={<CategoriesPage />} />
        <Route
          path="/categories/:categoryId/owners"
          element={<ServiceOwnersPage />}
        />
        <Route
          path="/categories/:categoryId/owners/:ownerId"
          element={<ServiceOwnerDetailsPage />}
        />

        {/* all service owners */}
        <Route path="/serviceOwners" element={<AllServiceOwnersPage />} />
        <Route
          path="/serviceOwners/:ownerId"
          element={<ServiceOwnerDetailsPage />}
        />

        {/* all services */}
        <Route path="/allServices" element={<AllServicesPage />} />
        <Route
          path="/serviceOwners:ownerId"
          element={<ServiceOwnerDetailsPage />}
        />

        {/* my appointments (protected) */}
        <Route
          path="/myAppointments"
          element={
            <ProtectedRoute roles={["User"]}>
              <MyAppointments />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ERROR & FALLBACK ROUTES ========== */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* 404 - Catch all undefined routes */}
      <Route path="*" element={<NotFound />} />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="serviceOwners" element={<AdminServiceOwners />} />
        {/* Catch invalid admin subroutes */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>

      <Route
        path="/ServiceOwner"
        element={
          <ProtectedRoute roles={["ServiceProvider"]}>
            <ServiceOwnerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<OwnerProfile />} />
        <Route path="appointments" element={<OwnerAppointments />} />
        <Route path="createProfile" element={<CreateProfile/>} />
        {/* Catch invalid admin subroutes */}
        <Route path="*" element={<Navigate to="/ServiceOwner" replace />} />
      </Route>
    </>
  )
);

export default router;

// ============== AppRoutes.jsx ==============
// import React from 'react';
// import { createBrowserRouter, createRoutesFromElements, Route,Navigate } from 'react-router-dom';

// // Layouts
// import AdminLayout from '../layouts/AdminLayout';
// import ServiceOwnerLayout from '../layouts/ServiceOwnerLayout';
// import ServicesLayout from '../layouts/ServicesLayout';

// // Pages - Admin
// import AdminAppointments from '../pages/admin/AdminAppointments';
// import AdminUsers from '../pages/admin/AdminUsers';
// import AdminDashboard from '../pages/admin/AdminDashboard';
// import AdminServiceOwners from '../pages/admin/AdminServiceOwners';

// // Pages - Service Owner
// import OwnerAppointments from '../pages/ServiceOwner/OwnerAppointments';
// import OwnerProfile from '../pages/ServiceOwner/OwnerProfile';

// // Pages - Public
// import Landing from '../pages/landing';
// import SignUpPage from '../pages/auth/SignUp';
// import Login from '../pages/auth/Login';

// // Landing Services imports / User Dashboard imports
// import CategoriesPage from '../pages/Categories/CategoriesPage';
// import ServiceOwnersPage from '../pages/services/ServiceOwnersPage';
// import ServiceOwnerDetailsPage from '../pages/services/ServiceOwnerDetailsPage';
// import AllServiceOwnersPage from '../pages/services/AllServiceOwnersPage';
// import AllServicesPage from '../pages/services/AllServicesPage';
// import NotFound from '../pages/NotFound';
// import Unauthorized from '../pages/Unauthorized';

// import MyAppointments from '../pages/user/MyAppointmentsPage';

// // ============== PROTECTED ROUTE COMPONENT ==============
// import ProtectedRoute from '../components/ProtectedRoute';

// // ============== PUBLIC ROUTE COMPONENT ==============
// // Prevents authenticated role-users from accessing public routes
// import PublicRoute from '../components/PublicRoute';

// // ============== MAIN APP ROUTES ==============
// const router = createBrowserRouter(
//     createRoutesFromElements(
//       <>
//         {/* ========== ADMIN ROUTES ========== */}
//         {/* Admin can only access /admin/* routes */}
//         <Route
//           path="/admin/*"
//           element={
//             <ProtectedRoute allowedRoles={['Admin']}>
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<AdminDashboard />} />
//           <Route path="appointments" element={<AdminAppointments />} />
//           <Route path="users" element={<AdminUsers />} />
//           <Route path="serviceOwners" element={<AdminServiceOwners />} />
//           {/* Catch invalid admin subroutes */}
//           <Route path="*" element={<Navigate to="/admin" replace />} />
//         </Route>

//         {/* ========== SERVICE OWNER ROUTES ========== */}
//         {/* ServiceProvider can only access /ServiceOwner/* routes */}
//         <Route
//           path="/ServiceOwner/*"
//           element={
//             <ProtectedRoute allowedRoles={['ServiceProvider']}>
//               <ServiceOwnerLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<OwnerProfile />} />
//           <Route path="appointments" element={<OwnerAppointments />} />
//           {/* Catch invalid service owner subroutes */}
//           <Route path="*" element={<Navigate to="/ServiceOwner" replace />} />
//         </Route>

//         {/* ========== PUBLIC ROUTES WITH LAYOUT ========== */}
//         <Route element={<ServicesLayout />}>
//           {/* Categories Flow */}
//           <Route path="/categories" element={<CategoriesPage />} />
//           <Route path="/categories/:categoryId/owners" element={<ServiceOwnersPage />} />
//           <Route path="/categories/:categoryId/owners/:ownerId" element={<ServiceOwnerDetailsPage />} />

//           {/* All Service Owners */}
//           <Route path="/serviceOwners" element={<AllServiceOwnersPage />} />
//           <Route path="/serviceOwners/:ownerId" element={<ServiceOwnerDetailsPage />} />

//           {/* All Services */}
//           <Route path="/allServices" element={<AllServicesPage />} />

//           {/* Protected User Route - Only Users can access */}
//           <Route
//             path="/myAppointments"
//             element={
//               <ProtectedRoute allowedRoles={['User']}>
//                 <MyAppointments />
//               </ProtectedRoute>
//             }
//           />
//         </Route>

//         {/* ========== LANDING & AUTH ROUTES ========== */}
//         {/* These routes block role-based users from accessing */}
//         <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
//         <Route path="/signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />
//         <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

//     {/* ========== ERROR & FALLBACK ROUTES ========== */}
//     <Route path="/unauthorized" element={<Unauthorized />} />

//     {/* 404 - Catch all undefined routes */}
//     <Route path="*" element={<NotFound />} />
//   </>
//     )
// )

// export default router;
