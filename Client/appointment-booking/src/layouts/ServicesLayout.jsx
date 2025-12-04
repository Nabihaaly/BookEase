import React, { useContext, useState } from 'react';
import { NavLink, Outlet, Link as RouterLink } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop'
import { Search, MapPin, Heart, Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const ServicesLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg font-low transition-colors ${
      isActive ? "text-purple-700" : "text-gray-700 hover:bg-gray-100"
    }`;
  
  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg font-low transition-colors ${
      isActive ? "text-purple-700 bg-purple-50" : "text-gray-700 hover:bg-gray-100"
    }`;
  
  const {user} = useContext(AuthContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <RouterLink to="/">
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
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search services..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-48 xl:w-64"
              />
            </div>
            <button className="hidden sm:block p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Heart className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center space-x-2 text-gray-700">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Karachi, PK</span>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <NavLink 
                to="/categories" 
                className={mobileNavLinkClass}
                onClick={closeMobileMenu}
              >
                Categories
              </NavLink>
              <NavLink 
                to="/serviceOwners" 
                className={mobileNavLinkClass}
                onClick={closeMobileMenu}
              >
                Service Owners
              </NavLink>
              <NavLink 
                to="/allServices" 
                className={mobileNavLinkClass}
                onClick={closeMobileMenu}
              >
                Services
              </NavLink>
              {user?.roles.includes("User") && (
                <NavLink 
                  to="/myAppointments" 
                  className={mobileNavLinkClass}
                  onClick={closeMobileMenu}
                >
                  My Appointments
                </NavLink>
              )}
              
              {/* Mobile Search */}
              <div className="pt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Mobile Location */}
              <div className="flex items-center space-x-2 text-gray-700 px-4 py-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Karachi, PK</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />
      <Header />
      <Outlet />
    </div>
  );
};

export default ServicesLayout;