function UserDashboard() {
    return ( 
        <div className="min-h-screen bg-gray-50">
  {/* Dashboard Header */}
  <div className="bg-white shadow-sm border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div>
          <h1 className="text-2xl font-bold text-[#9D4EDD]">BookEase</h1>
          <p className="text-sm text-gray-600">User Dashboard</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Welcome, John!</span>
          <button className="text-gray-700 hover:text-[#F72585] px-3 py-2 rounded-md text-sm font-medium transition-colors">
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Quick Actions */}
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Book New Appointment</h2>
        <p className="mb-4 opacity-90">Find and book your next service</p>
        <button className="bg-white text-[#9D4EDD] px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Browse Services
        </button>
      </div>
      
      <div className="bg-gradient-to-r from-[#F72585] to-[#C77DFF] rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">My Bookings</h2>
        <p className="mb-4 opacity-90">View and manage your appointments</p>
        <button className="bg-white text-[#F72585] px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          View All
        </button>
      </div>
    </div>

    {/* Services List */}
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Available Services</h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-lg p-4 hover:border-[#C77DFF] transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-[#E4C1F9] rounded-lg flex items-center justify-center mb-3">
            <span className="text-2xl">✂️</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Hair & Beauty</h4>
          <p className="text-gray-600 text-sm mb-3">Professional styling services</p>
          <button className="text-[#C77DFF] font-medium text-sm hover:text-[#9D4EDD] transition-colors">
            Book Now →
          </button>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 hover:border-[#C77DFF] transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-[#E4C1F9] rounded-lg flex items-center justify-center mb-3">
            <span className="text-2xl">🏥</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Healthcare</h4>
          <p className="text-gray-600 text-sm mb-3">Medical consultations</p>
          <button className="text-[#C77DFF] font-medium text-sm hover:text-[#9D4EDD] transition-colors">
            Book Now →
          </button>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 hover:border-[#C77DFF] transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-[#E4C1F9] rounded-lg flex items-center justify-center mb-3">
            <span className="text-2xl">💼</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Consulting</h4>
          <p className="text-gray-600 text-sm mb-3">Professional advice</p>
          <button className="text-[#C77DFF] font-medium text-sm hover:text-[#9D4EDD] transition-colors">
            Book Now →
          </button>
        </div>
      </div>
    </div>

    {/* Recent Bookings */}
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Bookings</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-[#E4C1F9] rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">✂️</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Haircut with Mike Chen</h4>
              <p className="text-gray-600 text-sm">Tomorrow, 2:00 PM</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Confirmed</span>
            <button className="text-[#C77DFF] hover:text-[#9D4EDD] font-medium text-sm transition-colors">
              Reschedule
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-[#E4C1F9] rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">🦷</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Dental Checkup</h4>
              <p className="text-gray-600 text-sm">Jan 15, 10:00 AM</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Pending</span>
            <button className="text-[#F72585] hover:text-[#F72585]/80 font-medium text-sm transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

     );
}

export default UserDashboard;