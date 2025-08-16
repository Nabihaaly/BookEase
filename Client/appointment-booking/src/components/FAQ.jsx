import React from 'react';
import { Element } from 'react-scroll';

function FAQ() {
    return ( 
        <Element name='FAQ'>
  <section className="py-20 bg-gray-50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-xl text-gray-600">Get answers to common questions</p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I reschedule an appointment?</h3>
          <p className="text-gray-600">You can easily reschedule your appointment through your dashboard. Simply go to "My Bookings", select the appointment you want to change, and choose a new available time slot.</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I cancel my appointment?</h3>
          <p className="text-gray-600">Yes, you can cancel your appointment up to 24 hours before the scheduled time. Cancellations made within 24 hours may be subject to a cancellation fee depending on the provider's policy.</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">What if the provider doesn't respond?</h3>
          <p className="text-gray-600">All our providers are required to respond within 2 hours during business hours. If you don't receive a response, our support team will help you find an alternative provider or resolve the issue.</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Is my payment information secure?</h3>
          <p className="text-gray-600">Absolutely. We use industry-standard encryption and work with trusted payment processors to ensure your financial information is completely secure.</p>
        </div>
      </div>
    </div>
  </section>
  </Element>
     );
}

export default FAQ;