import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Landing from '../pages/landing';
import SignUpPage from '../pages/auth/SignUp';
import Login from '../pages/auth/Login';
import AdminLayout from '../layouts/AdminLayout';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Landing />}/>
            <Route path='/signup' element={<SignUpPage />} /> 
            <Route path='/login' element={<Login />} /> 
            
            <Route path="/admin" element={<AdminLayout />}/>
        </>
    )
)

export default router;