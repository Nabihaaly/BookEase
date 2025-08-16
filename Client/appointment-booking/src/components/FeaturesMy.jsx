import React from 'react';
import { Element } from 'react-scroll';

function FeaturesMy() {
  return (
    <Element name="features">
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Flexible booking settings allow you full control over your schedule
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              BookEase gives providers and users seamless, customizable booking features.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-light-purple rounded-2xl flex items-center justify-center group-hover:bg-medium-purple transition duration-300 transform group-hover:scale-105">
                {/* Clock Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-dark-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Business Hour Settings</h3>
              <p className="text-sm text-gray-600">
                Set business hours for staff and services individually.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-light-purple rounded-2xl flex items-center justify-center group-hover:bg-medium-purple transition duration-300 transform group-hover:scale-105">
                {/* Adjustments Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-dark-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Back to Back Bookings</h3>
              <p className="text-sm text-gray-600">
                Show only available time slots for combined services.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-light-purple rounded-2xl flex items-center justify-center group-hover:bg-medium-purple transition duration-300 transform group-hover:scale-105">
                {/* Calendar Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-dark-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10m-9 4h5m5-14H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Restrictions</h3>
              <p className="text-sm text-gray-600">
                Control booking windows, cancellations, and limits.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-light-purple rounded-2xl flex items-center justify-center group-hover:bg-medium-purple transition duration-300 transform group-hover:scale-105">
                {/* Users Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-dark-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-4-4h-1M7 20h10M4 18v-2a4 4 0 014-4h1m0 0a4 4 0 014-4h0a4 4 0 014 4m-4 0v1m0-1a4 4 0 00-4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Group Scheduling</h3>
              <p className="text-sm text-gray-600">
                Allow group bookings and single checkout.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-light-purple rounded-2xl flex items-center justify-center group-hover:bg-medium-purple transition duration-300 transform group-hover:scale-105">
                {/* Repeat Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-dark-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v6h6M20 20v-6h-6M20 4l-6 6m0 0l6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Recurring Bookings</h3>
              <p className="text-sm text-gray-600">
                Book multiple appointments in one go.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
}

export default FeaturesMy;
