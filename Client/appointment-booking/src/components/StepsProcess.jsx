const StepsProcess = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Simple 3-step setup process</h2>
        </div>

        {/* Steps Container */}
        <div className="space-y-16">
          {/* Step 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Step illustration */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="bg-purple-100 rounded-lg p-4">
                <div className="grid grid-cols-7 gap-1 mb-3">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-purple-700 py-1">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  <div className="bg-white rounded text-center py-2 text-xs">1</div>
                  <div className="bg-white rounded text-center py-2 text-xs">2</div>
                  <div className="bg-purple-500 rounded text-center py-2 text-xs text-white">3</div>
                  <div className="bg-white rounded text-center py-2 text-xs">4</div>
                  <div className="bg-white rounded text-center py-2 text-xs">5</div>
                  <div className="bg-white rounded text-center py-2 text-xs">6</div>
                  <div className="bg-white rounded text-center py-2 text-xs">7</div>
                </div>
              </div>
            </div>

            {/* Step content */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Set your availability</h3>
              </div>
              <p className="text-gray-600 text-lg">
                Enter your services and working hours. Add buffers and block-times to match your real schedule. No
                double bookings!
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Step content */}
            <div className="space-y-4 order-2 lg:order-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Share your booking link</h3>
              </div>
              <p className="text-gray-600 text-lg">
                Share your booking page URL with customers or embed the widget on your website and social media pages.
              </p>
            </div>

            {/* Step illustration */}
            <div className="bg-white rounded-xl shadow-lg p-6 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="bg-purple-100 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                  <div className="text-purple-700 font-medium">Share Link</div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1 bg-gray-100 rounded p-3">
                    <div className="w-full h-2 bg-gray-300 rounded mb-2"></div>
                    <div className="w-3/4 h-2 bg-gray-300 rounded"></div>
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded"></div>
                  <div className="w-8 h-8 bg-pink-500 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Step illustration */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-3">
                <div className="bg-green-100 rounded-lg p-3 text-center">
                  <div className="text-green-700 font-medium">Appointment Confirmed</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-green-500 text-white rounded py-2 text-sm font-medium">Confirm</button>
                  <button className="bg-red-500 text-white rounded py-2 text-sm font-medium">Cancel</button>
                </div>
                <button className="w-full bg-purple-500 text-white rounded py-2 text-sm font-medium">Reschedule</button>
              </div>
            </div>

            {/* Step content */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Accept bookings 24/7</h3>
              </div>
              <p className="text-gray-600 text-lg">
                Let customers schedule, cancel, and reschedule appointments anytime. Send automated reminders to reduce
                no-shows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StepsProcess
