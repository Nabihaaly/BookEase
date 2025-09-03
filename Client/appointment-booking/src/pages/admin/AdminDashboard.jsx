import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

// AdminDashboard.jsx
const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get("/admin/dashboard");
        console.log(res);
        if (res.data.status) {
          // Backend returned success (200 OK with status=true)
          setStats(res.data.data);
          console.log(stats);
        }
      } catch (err) {
        console.error("Axios error:", err); 
        // Axios threw an error (network error OR 4xx/5xx response)
        if (err.response)
          // Backend returned error response (e.g., 400, 401, 500)
          setError(
            err.response.data?.statusMessage ||
              "Server error while fetching stats."
          );
        else if (err.request)
          // Request made but no response (network issue, server down)
          setError("Network error. Please check your internet connection.");
        // Something else (bug in code, timeout, etc.)
        else setError("Unexpected error occurred.");
        
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  // Handle delete appointment
  const handleDelete = (appointmentId) => {
  };

  // Format date and time
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return{
      date: date.toLocaleDateString('en-PK',{
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-PK', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };
  }
  return (
    <>
      {/* Main Content */}
      <div className="space-y-6">
        {/* Dashboard Stats */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Dashboard Overview
          </h1>

          {/* Show loading */}
          {loading && (
            <p className="text-gray-500">Loading Dashboard Stats...</p>
          )}

          {/* Show error */}
          {error && <p className="text-red-600 font-medium">{error}</p>}

          {/* Show stats only if available */}
          {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-full bg-blue-100 text-blue-600">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {stats.totalUsers}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Total Users
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-full bg-green-100 text-green-600">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                     {stats.totalAppointments}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Total Appointments
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-full bg-purple-100 text-purple-600">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {stats.totalServiceOwners}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Service Providers
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {stats.todaysAppointments}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Today's Appointments
                  </p>
                </div>
              </div>
            </div>
          </div>
          )}
          </div>

        {/* Recent Appointments - Similar structure */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Appointments
              </h2>
              <Link 
                to="/admin/appointments" 
                className="text-purple-600 hover:text-purple-700 text-sm self-start sm:self-auto"
              >
                View All
              </Link>
            </div>
          </div>

          {stats?.recentAppointments == null ? (
            <div className="p-6 text-center text-gray-500">
              No appointments found
            </div>):(
              <>  
          {/* Mobile Card View */}
          <div className="sm:hidden">
            <div className="divide-y divide-gray-200">
              {stats.recentAppointments.map((appointment, index)=>{
                const {date, time} = formatDateTime(appointment.appointmentDateTime)
                return(
              <div key={appointment.id || index} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {appointment.userName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.email}
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {appointment.status}
                  </span>
                </div>
                <div className="text-sm text-gray-900 mb-1">
                  {appointment.serviceTitle} • {appointment.serviceOwner}
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  {date} {time}
                </div>
              </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.recentAppointments.map((appointment, index)=>{
                   const { date, time } = formatDateTime(appointment.appointmentDateTime);
                  return (
                <tr key={appointment.id || index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{date}</div>
                  <div className="text-sm text-gray-500">{time}</div>
                </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.userName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.serviceTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.serviceOwner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {appointment.status}
                    </span>
                  </td>
                </tr>
                );
              })}
              </tbody>
            </table>
          </div>
          </>
            )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
