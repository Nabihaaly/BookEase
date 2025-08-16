import React from 'react';
import { Element } from 'react-scroll';

const Services = () => {
  // Reduced services data array with only 8 industries
  const services = [
    {
      id: 1,
      title: "Salon & Beauty",
      icon: "✂️",
      description: "Hair, nails, skincare & beauty treatments"
    },
    {
      id: 2,
      title: "Barber Shop",
      icon: "💈",
      description: "Professional cuts & grooming services"
    },
    {
      id: 3,
      title: "Spa & Wellness",
      icon: "🧘‍♀️",
      description: "Massage, relaxation & therapeutic services"
    },
    {
      id: 4,
      title: "Health & Medical",
      icon: "🏥",
      description: "Healthcare appointments & consultations"
    },
    {
      id: 5,
      title: "Fitness & Sports",
      icon: "💪",
      description: "Personal training & fitness coaching"
    },
    {
      id: 6,
      title: "Professional Services",
      icon: "💼",
      description: "Consulting, legal & business services"
    },
    {
      id: 7,
      title: "Education & Tutoring",
      icon: "📚",
      description: "Learning sessions & skill development"
    },
    {
      id: 8,
      title: "Home Services",
      icon: "🏠",
      description: "Cleaning, repairs & maintenance"
    }
  ];

  return (
    <Element name='services'>
      <section className="relative bg-gray-50 py-16 overflow-hidden">
        {/* Simple background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gray-200 rounded-full opacity-30 blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gray-300 rounded-full opacity-20 blur-2xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Simplified Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 border border-gray-200 mb-4">
              <span className="text-gray-600 font-medium text-sm">Our Services</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              We Serve Every Industry
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From beauty salons to healthcare facilities, our platform adapts to 
              <span className="text-gray-800 font-medium"> any service-based business </span>
              with intelligent booking solutions.
            </p>
          </div>
          
          {/* Simplified Industry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="group relative"
              >
                {/* Card container */}
                <div className="relative bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 border border-gray-100">
                  
                  {/* Icon container */}
                  <div className="relative mb-4">
                    <div className="w-14 h-14 mx-auto bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                      <span className="text-2xl">
                        {service.icon}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Simple hover effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom CTA section */}
          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  Don't see your industry?
                </h3>
                <p className="text-gray-600">
                  Our platform works with any appointment-based business.
                </p>
              </div>
              <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Services;