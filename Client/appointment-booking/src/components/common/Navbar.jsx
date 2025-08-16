import React from 'react';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="bg-purple-50 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center">
                {/* Logo placeholder - replace with your actual logo */}
                <RouterLink to="/" // or "hero", based on your <Element name="...">
                smooth={true}
                duration={500}
                className="flex items-center cursor-pointer" >
                  <div className="flex-shrink-0 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg mr-3"></div>
                      <span className="text-2xl font-bold text-gray-900">BookingPro</span>
                  </div>    
                </RouterLink> 
            </div>

            <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-8">
                            <Link to='home' smooth={true} duration={500} offset={-80} className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">Home</Link>
                            <Link to='services' smooth={true} duration={500} offset={-80} className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">Services</Link>
                            <Link to='features' smooth={true} duration={500} offset={-80} className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">Features</Link>
                            <Link to='testimonial' smooth={true} duration={500} offset={-80} className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">Testimonials</Link>
                            <Link to='FAQ' smooth={true} duration={500} offset={-80} className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">FAQ</Link>
                          </div>
                        </div> 

          {/* CTA Buttons */}
          <div className="flex gap-4">
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

          {/* profile */}
          {/* <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">John Doe</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div> */}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
