import React from 'react';
import { Element } from 'react-scroll';
import { Link } from 'react-router-dom';

function HeroSection() {
    return ( 
        // {/* HERO SECTION */}
        <Element name='home'>
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-3xl lg:text-6xl font-bold text-gray-900 leading-tight">
                All-in-one appointment scheduling software
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed"> 
                BookingPro's appointment booking software saves you time by automating appointment scheduling, client management, marketing, payments, and much more!
              </p>
              
              {/* CTA Section */}
              <div className="space-y-4">
                <Link to="/signup">
                <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Get started now!
                </button>
                </Link>
                <p className="text-gray-500 text-sm">
                  No credit card required! Our free plan is free forever.
                </p>
              </div>
            </div>
            
            {/* Right Illustration */}
            <div className="relative">
              {/* Main illustration container - you can replace this with your actual illustration */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                {/* Booking interface mockup */}
                <div className="space-y-4">
                  <div className="bg-purple-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-purple-700 font-semibold">Book a service</span>
                      <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-white rounded p-2">
                        <div className="w-8 h-2 bg-gray-300 rounded"></div>
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded p-2">
                        <div className="w-8 h-2 bg-gray-300 rounded"></div>
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded p-2">
                        <div className="w-8 h-2 bg-gray-300 rounded"></div>
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Upcoming appointments widget */}
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="text-pink-500 text-sm font-semibold mb-2">Upcoming Appointments</div>
                    <div className="space-y-1">
                      <div className="bg-white rounded p-2 text-xs">9:30 AM - Client A</div>
                      <div className="bg-white rounded p-2 text-xs">12:00 PM - Client B</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements for visual appeal */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-purple-200 to-purple-400 rounded-full opacity-70 animate-bounce"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-400 rounded-full opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
      </Element>
    );
}

export default HeroSection;