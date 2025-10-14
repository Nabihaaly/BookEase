import React, { useCallback, useContext, useState } from 'react';
import { NavLink, Outlet, Link as RouterLink } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop'
import { Search, MapPin, Heart } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const ServicesLayout = () => {
  const navLinkClass = ({ isActive }) =>
  `px-4 py-2 rounded-lg font-low transition-colors ${
    isActive ? "text-purple-700" : "text-gray-700 hover:bg-gray-100"
  }`;
  const {user} = useContext(AuthContext);

  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <RouterLink  to="/" >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                BookEase
              </h1>
            </RouterLink>
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/categories" className={navLinkClass}>
                Categories
              </NavLink>
              <NavLink to="/serviceOwners" className={navLinkClass}>
                Service Owners
              </NavLink>
              <NavLink to="/allServices" className={navLinkClass}>
                Services
              </NavLink>
              {user?.roles.includes("User") && (
                  <NavLink to="/myAppointments" className={navLinkClass}>
                    My Appointments
                  </NavLink>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search services..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Heart className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 text-gray-700">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Karachi, PK</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  return (
      <div className="min-h-screen bg-gray-50">
        <ScrollToTop />
        <Header />
        <Outlet/>
      </div>
  );
};

export default ServicesLayout;