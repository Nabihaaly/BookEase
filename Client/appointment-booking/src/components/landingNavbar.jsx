import React from 'react';
import {Link} from 'react-scroll'

function LandingNavbar() {
    return ( 
        <>
        {/* Navigation Links (Desktop) */}
        <nav className="max-w-7xl mx-auto px-4 pt-4 sm:px-6 lg:px-8">
             <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to='home' smooth={true} duration={500} offset={-80} className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">Home</Link>
                <Link to='services' smooth={true} duration={500} offset={-80} className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">Services</Link>
                <Link to='features' smooth={true} duration={500} offset={-80} className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">Features</Link>
                <Link to='testimonial' smooth={true} duration={500} offset={-80} className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">Testimonials</Link>
                <Link to='FAQ' smooth={true} duration={500} offset={-80} className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">FAQ</Link>
              </div>
            </div> 
            </nav>
          </>  
     );
}

export default LandingNavbar;