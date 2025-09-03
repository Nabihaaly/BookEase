    import React from 'react';
    import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
    import Landing from '../pages/landing';
    import SignUpPage from '../pages/auth/SignUp';
    import Login from '../pages/auth/Login';

    // Admin imports
    import AdminLayout from '../layouts/AdminLayout';
    import AdminAppointments from '../pages/admin/AdminAppointments';
    import AdminUsers from '../pages/admin/AdminUsers';
    import AdminDashboard from '../pages/admin/AdminDashboard';
    import AdminServiceOwners from '../pages/admin/AdminServiceOwners';

    import ProtectedRoute from '../components/ProtectedRoute';

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Landing />}/>
                <Route path='/signup' element={<SignUpPage />} /> 
                <Route path='/login' element={<Login />} /> 
                
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
                </Route>
                    
                <Route 
                    path="/ServiceOwner" 
                    element={
                        <ProtectedRoute roles={["ServiceOwner"]}>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                />
                <Route 
                    path="/User" 
                    element={
                        <ProtectedRoute roles={["User"]}>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                />
            </>
        )
    )

    export default router;
