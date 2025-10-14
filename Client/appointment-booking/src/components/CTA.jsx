import React from 'react';
import { Link } from 'react-router-dom';

function CTA () {
    return ( 
      <>
        // {/* FINAL CTA SECTION */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Try BookEase's online booking software. Get your free account now!
          </h2>
          
          <div className="space-y-6">
            <Link to='/signup'>
              <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-10 py-4 rounded-full text-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Sign up now! →
              </button>
              </Link>
            <p className="text-gray-500 text-lg">
              Our free plan is free forever. No credit card required!
            </p>
          </div>
        </div>
      </section>
      </>
     );
}

export default CTA ;