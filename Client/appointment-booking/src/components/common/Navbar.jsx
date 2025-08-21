import React, { useState } from "react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { User, Menu, X } from "lucide-react"; // icons
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  // TODO: replace with real auth check
  const isLoggedIn = true; // set true if logged in
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="bg-purple-50 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <RouterLink to="/" className="flex items-center cursor-pointer">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg mr-3"></div>
                <span className="text-2xl font-bold text-gray-900">BookingPro</span>
              </div>
            </RouterLink>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="home" smooth={true} duration={500} offset={-80} className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">Home</Link>
              <Link to="services" smooth={true} duration={500} offset={-80} className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">Services</Link>
              <Link to="features" smooth={true} duration={500} offset={-80} className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">Features</Link>
              <Link to="testimonial" smooth={true} duration={500} offset={-80} className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">Testimonials</Link>
              <Link to="FAQ" smooth={true} duration={500} offset={-80} className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">FAQ</Link>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              // Login / Signup buttons
              <div className="hidden sm:flex gap-3">
                <RouterLink to="/login">
                  <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
                    Login
                  </button>
                </RouterLink>
                <RouterLink to="/signup">
                  <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
                    Sign Up
                  </button>
                </RouterLink>
              </div>
            ) : (
              // Profile dropdown
              <div className="hidden sm:block relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 bg-white rounded-full px-3 py-1 shadow-sm hover:shadow-md transition"
                >
                  <User className="w-5 h-5 text-purple-600" />
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    John Doe
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transform transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
                    <RouterLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                      Profile
                    </RouterLink>
                    <RouterLink to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                      Settings
                    </RouterLink>
                    <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-700 hover:text-purple-700 focus:outline-none"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

{/* Mobile Menu */}
<AnimatePresence>
  {mobileOpen && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="md:hidden bg-white rounded-xl shadow-lg mx-3 mt-2 px-5 py-4 space-y-3 border border-gray-100"
    >
      <Link
        to="home"
        smooth={true}
        duration={500}
        offset={-80}
        className="block text-gray-700 hover:text-purple-600 font-medium transition-colors"
      >
        Home
      </Link>
      <Link
        to="services"
        smooth={true}
        duration={500}
        offset={-80}
        className="block text-gray-700 hover:text-purple-600 font-medium transition-colors"
      >
        Services
      </Link>
      <Link
        to="features"
        smooth={true}
        duration={500}
        offset={-80}
        className="block text-gray-700 hover:text-purple-600 font-medium transition-colors"
      >
        Features
      </Link>
      <Link
        to="testimonial"
        smooth={true}
        duration={500}
        offset={-80}
        className="block text-gray-700 hover:text-purple-600 font-medium transition-colors"
      >
        Testimonials
      </Link>
      <Link
        to="FAQ"
        smooth={true}
        duration={500}
        offset={-80}
        className="block text-gray-700 hover:text-purple-600 font-medium transition-colors"
      >
        FAQ
      </Link>

      {!isLoggedIn ? (
        <div className="flex flex-col gap-2 pt-3">
          <RouterLink to="/login">
            <button className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-md hover:scale-[1.02] transition-all">
              Login
            </button>
          </RouterLink>
          <RouterLink to="/signup">
            <button className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-md hover:scale-[1.02] transition-all">
              Sign Up
            </button>
          </RouterLink>
        </div>
      ) : (
        <div className="flex flex-col gap-2 pt-3">
          <RouterLink
            to="/profile"
            className="block text-gray-700 hover:text-purple-600 font-medium"
          >
            Profile
          </RouterLink>
          <RouterLink
            to="/settings"
            className="block text-gray-700 hover:text-purple-600 font-medium"
          >
            Settings
          </RouterLink>
          <button className="text-left block text-gray-700 hover:text-red-500 font-medium transition-colors">
            Logout
          </button>
        </div>
      )}
    </motion.div>
  )}
</AnimatePresence>

    </header>
  );
}

export default Navbar;
