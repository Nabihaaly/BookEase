import React from 'react';

function Footer() {
    return ( 
        // {/* FOOTER */}
      <footer className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Product */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">PRODUCT</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-purple-700 transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-700 transition-colors">Customers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-700 transition-colors">Contact us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-700 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-700 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-700 transition-colors">Sign Up</a></li>
              </ul>
            </div>
            
            {/* Column 2: Features */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">FEATURES</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-purple-700 transition-colors">Schedule online</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-700 transition-colors">Increase productivity</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-700 transition-colors">Attract customers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-700 transition-colors">Retain customers</a></li>
              </ul>
            </div>
            
            {/* Column 3: Support */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">SUPPORT</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-purple-700 transition-colors">Help</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-700 transition-colors">Screen sharing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-700 transition-colors">Affiliate Program</a></li>
              </ul>
              
              {/* Social Media */}
              <div className="mt-8">
                <h4 className="font-bold text-gray-900 mb-4">CONNECT WITH US</h4>
                <div className="flex space-x-4">
                  {/* Social icons placeholders - replace with actual social media icons */}
                  <a href="#" className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center hover:bg-purple-400 transition-colors">
                    <div className="w-5 h-5 bg-purple-700 rounded opacity-70"></div>
                  </a>
                  <a href="#" className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center hover:bg-purple-400 transition-colors">
                    <div className="w-5 h-5 bg-purple-700 rounded opacity-70"></div>
                  </a>
                  <a href="#" className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center hover:bg-purple-400 transition-colors">
                    <div className="w-5 h-5 bg-purple-700 rounded opacity-70"></div>
                  </a>
                  <a href="#" className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center hover:bg-purple-400 transition-colors">
                    <div className="w-5 h-5 bg-purple-700 rounded opacity-70"></div>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Column 4: Contact */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">CONTACT US</h3>
              <div className="space-y-3 text-gray-600">
                <div>
                  <div className="font-semibold text-gray-900">BookingPro Software Inc.</div>
                  <div>123 Business Avenue</div>
                  <div>New York, NY 10001</div>
                  <div>USA</div>
                </div>
                <div>
                  <a href="mailto:contact@bookingpro.com" className="hover:text-purple-700 transition-colors">contact@bookingpro.com</a>
                </div>
                <div className="pt-4 space-y-2">
                  <a href="#" className="block text-gray-600 hover:text-purple-700 transition-colors">Privacy policy</a>
                  <a href="#" className="block text-gray-600 hover:text-purple-700 transition-colors">Terms of use</a>
                  <a href="#" className="block text-gray-600 hover:text-purple-700 transition-colors">GDPR</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-gray-500">
              Copyright 2024 © BookingPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
     );
}

export default Footer;