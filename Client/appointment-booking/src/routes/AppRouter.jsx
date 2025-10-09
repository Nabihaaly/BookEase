    import React from 'react';
    import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
    import Landing from '../pages/landing';
    import SignUpPage from '../pages/auth/SignUp';
    import Login from '../pages/auth/Login';
    import ServiceCategories from '../components/ServiceCategories';

    import ProtectedRoute from '../components/ProtectedRoute';

    // Landing Services imports / User Dashboard imports
    import ServicesLayout from '../layouts/ServicesLayout';
    import CategoriesPage from '../pages/Categories/CategoriesPage';
    import ServiceOwnersPage from '../pages/services/ServiceOwnersPage';
    import ServiceOwnerDetailsPage from '../pages/services/ServiceOwnerDetailsPage';
    import AllServiceOwnersPage from '../pages/services/AllServiceOwnersPage';
    import AllServicesPage from '../pages/services/AllServicesPage';
    
    import MyAppointments from '../pages/user/MyAppointmentsPage';

    // Admin imports
    import AdminLayout from '../layouts/AdminLayout';
    import AdminAppointments from '../pages/admin/AdminAppointments';
    import AdminUsers from '../pages/admin/AdminUsers';
    import AdminDashboard from '../pages/admin/AdminDashboard';
    import AdminServiceOwners from '../pages/admin/AdminServiceOwners';

    // ServiceOwner imports 
    import ServiceOwnerLayout from '../layouts/ServiceOwnerLayout';
    import OwnerAppointments from '../pages/ServiceOwner/OwnerAppointments';
    import OwnerProfile from '../pages/ServiceOwner/OwnerProfile';

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Landing />}/>
                <Route path='/signup' element={<SignUpPage />} /> 
                <Route path='/login' element={<Login />} /> 
                <Route path='/ServiceCategories' element={<ServiceCategories />} /> 

                <Route element={<ServicesLayout />}>

                    {/* categories flow */}
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/categories/:categoryId/owners" element={<ServiceOwnersPage />} />
                    <Route path="/categories/:categoryId/owners/:ownerId" element={<ServiceOwnerDetailsPage />} />

                    {/* all service owners */}
                    <Route path="/serviceOwners" element={<AllServiceOwnersPage />}/>
                    <Route path="/serviceOwners/:ownerId" element={<ServiceOwnerDetailsPage />} />

                    {/* all services */}
                    <Route path="/allServices" element={<AllServicesPage />} />
                    <Route path="/serviceOwners:ownerId" element={<ServiceOwnerDetailsPage />} />

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
                        <ProtectedRoute roles={["ServiceProvider"]}>
                            <ServiceOwnerLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<OwnerProfile/>}/>
                    <Route path='appointments' element={<OwnerAppointments/>}/>
                </Route>
                <Route 
                    path="/User" 
                    element={
                        <ProtectedRoute roles={["User"]}>
                            <ServicesLayout />
                        </ProtectedRoute>
                    }
                />
            </>
        )
    )

    export default router;
