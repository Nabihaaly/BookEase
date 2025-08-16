function ServicesList() {
    return ( 
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Services</h2>
        <p className="text-xl text-gray-600">Book the services you need most</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-[#E4C1F9] rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">✂️</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Haircut</h3>
          <p className="text-gray-600 mb-4">Professional hair styling and cuts</p>
          <button className="w-full bg-[#C77DFF] hover:bg-[#9D4EDD] text-white py-2 rounded-lg font-medium transition-colors">
            Book Now
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-[#E4C1F9] rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">🦷</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Dental Checkup</h3>
          <p className="text-gray-600 mb-4">Complete dental examination and cleaning</p>
          <button className="w-full bg-[#C77DFF] hover:bg-[#9D4EDD] text-white py-2 rounded-lg font-medium transition-colors">
            Book Now
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-[#E4C1F9] rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">🧠</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Therapy Session</h3>
          <p className="text-gray-600 mb-4">Mental health and wellness support</p>
          <button className="w-full bg-[#C77DFF] hover:bg-[#9D4EDD] text-white py-2 rounded-lg font-medium transition-colors">
            Book Now
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-[#E4C1F9] rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">💼</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Consultation</h3>
          <p className="text-gray-600 mb-4">Expert freelance consultation services</p>
          <button className="w-full bg-[#C77DFF] hover:bg-[#9D4EDD] text-white py-2 rounded-lg font-medium transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  </section>
     );
}

export default ServicesList;