import React, { useState, useContext } from "react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { User, Menu, X } from "lucide-react"; // icons
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const isAdmin = user?.roles[0] === "Admin";
  const isOwner = user?.roles[0] === "ServiceProvider";

  // ✅ Determine if user is logged in based on user object
  const isLoggedIn = user !== null;

  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false); // Close dropdown after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-purple-50 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo Section - Responsive sizing */}
          <div className="flex items-center flex-shrink-0 min-w-0">
             { isAdmin? (
              <RouterLink to="/admin" className="flex items-center cursor-pointer">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg mr-2 sm:mr-3"></div>
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                  BookEase
                </span>
              </div>
            </RouterLink>
             ): isOwner? (
              <RouterLink to="/ServiceOwner" className="flex items-center cursor-pointer">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg mr-2 sm:mr-3"></div>
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                  BookEase
                </span>
              </div>
            </RouterLink>
             ) : 
             <RouterLink to="/" className="flex items-center cursor-pointer">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg mr-2 sm:mr-3"></div>
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                  BookEase
                </span>
              </div>
            </RouterLink>
             }
          </div>
          {/* (!false) && (!false) */}
          {/* Desktop Nav - Only show for non-admin users */}
          {!isAdmin && !isOwner && (
            <div className="hidden lg:block">
              <div className="ml-6 xl:ml-10 flex items-baseline space-x-4 xl:space-x-8">
                <Link
                  to="home"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="text-gray-700 hover:text-purple-700 px-2 xl:px-3 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  Home
                </Link>
                {/* <RouterLink to="/serviceCategories"offset={-80} className="text-gray-700 hover:text-purple-700 px-2 xl:px-3 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap">Service Categories</RouterLink> */}
                <RouterLink
                  to="/categories"
                  className="text-gray-700 hover:text-purple-700 px-2 xl:px-3 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  Service Categories
                </RouterLink>
                <Link
                  to="features"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="text-gray-700 hover:text-purple-700 px-2 xl:px-3 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  Features
                </Link>
                <Link
                  to="testimonial"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="text-gray-700 hover:text-purple-700 px-2 xl:px-3 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  Testimonials
                </Link>
                <Link
                  to="FAQ"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="text-gray-700 hover:text-purple-700 px-2 xl:px-3 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  FAQ
                </Link>
              </div>
            </div>
          )}

          {/* Right side - Responsive spacing and sizing */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {!isLoggedIn ? (
              // Login / Signup buttons - Responsive sizing
              <div className="hidden lg:flex gap-2">
                <RouterLink to="/login">
                  <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 whitespace-nowrap">
                    Login
                  </button>
                </RouterLink>
                <RouterLink to="/signup">
                  <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 whitespace-nowrap">
                    Sign Up
                  </button>
                </RouterLink>
              </div>
            ) : (
              // Profile dropdown - Responsive design
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-1 sm:space-x-2 bg-white rounded-full px-2 sm:px-3 py-1 shadow-sm hover:shadow-md transition max-w-[140px] sm:max-w-none"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                  <span className="hidden sm:block text-xs sm:text-sm font-medium text-gray-700 truncate">
                    {user?.name || user?.email || "User"}
                  </span>
                  <svg
                    className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transform transition-transform flex-shrink-0 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-100">
                    <div className="px-3 py-2 border-b border-gray-100 sm:hidden">
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <RouterLink
                      to="/profile"
                      className="block px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                    >
                      Profile
                    </RouterLink>
                    <RouterLink
                      to="/settings"
                      className="block px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                    >
                      Settings
                    </RouterLink>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-purple-50 hover:text-red-500 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button - Show on smaller screens */}
            <div className="lg:hidden ml-1 sm:ml-2">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-gray-700 hover:text-purple-700 focus:outline-none p-1"
              >
                {" "}
                {/* Mobile menu button show if mobileOpen else, menu open show ho*/}
                {mobileOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Enhanced responsive design */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden bg-white rounded-xl shadow-lg mx-2 sm:mx-3 mt-2 px-4 sm:px-5 py-3 sm:py-4 space-y-2 sm:space-y-3 border border-gray-100"
          >
            {!isAdmin && !isOwner && (
              <div className="space-y-1 sm:space-y-2">
                <Link
                  to="home"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="block text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer py-2 px-2 rounded-md hover:bg-purple-50"
                  onClick={() => setMobileOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="services"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="block text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer py-2 px-2 rounded-md hover:bg-purple-50"
                  onClick={() => setMobileOpen(false)}
                >
                  Services
                </Link>
                <Link
                  to="features"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="block text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer py-2 px-2 rounded-md hover:bg-purple-50"
                  onClick={() => setMobileOpen(false)}
                >
                  Features
                </Link>
                <Link
                  to="testimonial"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="block text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer py-2 px-2 rounded-md hover:bg-purple-50"
                  onClick={() => setMobileOpen(false)}
                >
                  Testimonials
                </Link>
                <Link
                  to="FAQ"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="block text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer py-2 px-2 rounded-md hover:bg-purple-50"
                  onClick={() => setMobileOpen(false)}
                >
                  FAQ
                </Link>
              </div>
            )}

            {/* Auth section with better spacing */}
            <div
              className={`${!isAdmin ? "border-t border-gray-200 pt-3" : ""}`}
            >
              {!isLoggedIn ? (
                <div className="flex flex-col gap-2 sm:gap-3">
                  <RouterLink to="/login">
                    <button
                      className="w-full max-w-xs bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium hover:shadow-md hover:scale-[1.02] transition-all"
                      onClick={() => setMobileOpen(false)}
                    >
                      Login
                    </button>
                  </RouterLink>
                  <RouterLink to="/signup">
                    <button
                      className="w-full max-w-xs bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium hover:shadow-md hover:scale-[1.02] transition-all"
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign Up
                    </button>
                  </RouterLink>
                </div>
              ) : (
                <div className="space-y-1 sm:space-y-2">
                  <div className="px-2 py-1 text-xs text-gray-500 border-b border-gray-200 pb-2 mb-2">
                    {user?.name || user?.email || "User"}
                  </div>
                  <RouterLink
                    to="/profile"
                    className="block text-gray-700 hover:text-purple-600 font-medium py-2 px-2 rounded-md hover:bg-purple-50 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Profile
                  </RouterLink>
                  <RouterLink
                    to="/settings"
                    className="block text-gray-700 hover:text-purple-600 font-medium py-2 px-2 rounded-md hover:bg-purple-50 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Settings
                  </RouterLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="w-full text-left block text-gray-700 hover:text-red-500 font-medium transition-colors py-2 px-2 rounded-md hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
