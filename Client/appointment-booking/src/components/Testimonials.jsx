import React from 'react';
import { Element } from 'react-scroll';

function Testimonials() {
    return ( 
        // {/* TESTIMONIALS SECTION */}
        <Element name='testimonial'>
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              200,000+ customers trust BookEase for their appointment scheduling needs
            </h2>
          </div>
          
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 relative">
              {/* Quote mark */}
              <div className="absolute top-6 left-6 text-6xl text-pink-500 opacity-20 font-serif">"</div>
              <div className="pt-8">
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  I am extremely satisfied with BookEase. The client booking software makes it super easy for my clients to use and book appointments online with me. I especially love their customer service, they always respond in a timely manner at all hours.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Before the trial was even complete, I had clients scheduled for my service, pay me through Paypal (linked easily) and connect via Zoom (also linked easily).
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-gray-900">- Sarah M., Spa Therapist</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 relative">
              {/* Quote mark */}
              <div className="absolute top-6 left-6 text-6xl text-pink-500 opacity-20 font-serif">"</div>
              <div className="pt-8">
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Great software to market your appointments on multiple platforms. BookEase's online appointment booking app is easy to use and also available for free!
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  I loved the integrations with multiple platforms like Google analytics, adding a book now on Instagram and especially a schedule directly from Google My Business. Liked how BookEase easily automated my daily tasks by connecting to Zapier! I completely recommend BookEase.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-gray-900">- Michael R., Massage Therapist</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust Badges/Ratings */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {/* Rating 1 */}
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="text-2xl font-bold text-gray-900 mb-1">4.5/5</div>
                <div className="flex justify-center mb-2">
                  <div className="flex text-yellow-400">
                    <span>★★★★☆</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 font-semibold">MERCHANT MAVERICK</div>
              </div>
            </div>
            
            {/* Rating 2 */}
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="text-2xl font-bold text-gray-900 mb-1">4.5/5</div>
                <div className="flex justify-center mb-2">
                  <div className="flex text-yellow-400">
                    <span>★★★★☆</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 font-semibold">CAPTERRA</div>
              </div>
            </div>
            
            {/* Rating 3 */}
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="text-2xl font-bold text-gray-900 mb-1">4.6/5</div>
                <div className="flex justify-center mb-2">
                  <div className="flex text-yellow-400">
                    <span>★★★★☆</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 font-semibold">G2 CROWD</div>
              </div>
            </div>
            
            {/* Rating 4 */}
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="text-2xl font-bold text-gray-900 mb-1">5/5</div>
                <div className="flex justify-center mb-2">
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 font-semibold">GOOGLE</div>
              </div>
            </div>
          </div>
        </div>
      </section>
</Element>
     );
}

export default Testimonials;