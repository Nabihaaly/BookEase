import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { User, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const { user, logout } = useContext(AuthContext);
  const isAdmin = user?.roles?.[0] === "Admin";
  const isOwner = user?.roles?.[0] === "ServiceProvider";
  const isLoggedIn = user !== null;

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false);
      setMobileOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getLogoLink = () => {
    if (isAdmin) return "/admin";
    if (isOwner) return "/ServiceOwner";
    return "/";
  };

  return (
    <header className="bg-purple-50 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <RouterLink to={getLogoLink()} className="flex items-center flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg mr-3"></div>
            <span className="text-xl md:text-2xl font-bold text-gray-900">
              BookEase
            </span>
          </RouterLink>

          {/* Desktop Nav - Only show for non-admin/owner users */}
          {!isAdmin && !isOwner && (
            <div className="hidden lg:flex items-center space-x-6">
              <Link
                to="home"
                smooth={true}
                duration={500}
                offset={-80}
                className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer"
              >
                Home
              </Link>
              <RouterLink
                to="/categories"
                className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors"
              >
                Service Categories
              </RouterLink>
              <Link
                to="features"
                smooth={true}
                duration={500}
                offset={-80}
                className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer"
              >
                Features
              </Link>
              <Link
                to="testimonial"
                smooth={true}
                duration={500}
                offset={-80}
                className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer"
              >
                Testimonials
              </Link>
              <Link
                to="FAQ"
                smooth={true}
                duration={500}
                offset={-80}
                className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer"
              >
                FAQ
              </Link>
            </div>
          )}

          {/* Right side - Auth & Menu */}
          <div className="flex items-center space-x-3">
            {!isLoggedIn ? (
              // Desktop Login/Signup buttons
              <div className="hidden lg:flex gap-3">
                <RouterLink to="/login">
                  <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
                    Login
                  </button>
                </RouterLink>
                <RouterLink to="/signup">
                  <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
                    Sign Up
                  </button>
                </RouterLink>
              </div>
            ) : (
              // Profile dropdown
              <div className="relative hidden lg:block" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm hover:shadow-md transition"
                >
                  <User className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {user?.name || user?.email || "User"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <RouterLink
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      Profile
                    </RouterLink>
                    <RouterLink
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      Settings
                    </RouterLink>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-purple-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setMobileOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* User Info (if logged in) */}
                {isLoggedIn && (
                  <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                {!isAdmin && !isOwner && (
                  <div className="mb-6 space-y-1">
                    <Link
                      to="home"
                      smooth={true}
                      duration={500}
                      offset={-80}
                      className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors cursor-pointer"
                      onClick={() => setMobileOpen(false)}
                    >
                      Home
                    </Link>
                    <RouterLink
                      to="/categories"
                      className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      Service Categories
                    </RouterLink>
                    <Link
                      to="features"
                      smooth={true}
                      duration={500}
                      offset={-80}
                      className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors cursor-pointer"
                      onClick={() => setMobileOpen(false)}
                    >
                      Features
                    </Link>
                    <Link
                      to="testimonial"
                      smooth={true}
                      duration={500}
                      offset={-80}
                      className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors cursor-pointer"
                      onClick={() => setMobileOpen(false)}
                    >
                      Testimonials
                    </Link>
                    <Link
                      to="FAQ"
                      smooth={true}
                      duration={500}
                      offset={-80}
                      className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors cursor-pointer"
                      onClick={() => setMobileOpen(false)}
                    >
                      FAQ
                    </Link>
                  </div>
                )}

                {/* Auth Section */}
                <div className="border-t border-gray-200 pt-6">
                  {!isLoggedIn ? (
                    <div className="space-y-3">
                      <RouterLink to="/login" className="block">
                        <button
                          className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                          onClick={() => setMobileOpen(false)}
                        >
                          Login
                        </button>
                      </RouterLink>
                      <RouterLink to="/signup" className="block">
                        <button
                          className="w-full border-2 border-purple-400 text-purple-600 px-6 py-3 rounded-lg text-sm font-medium hover:bg-purple-50 transition-all"
                          onClick={() => setMobileOpen(false)}
                        >
                          Sign Up
                        </button>
                      </RouterLink>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <RouterLink
                        to="/profile"
                        className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        Profile
                      </RouterLink>
                      <RouterLink
                        to="/settings"
                        className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        Settings
                      </RouterLink>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;