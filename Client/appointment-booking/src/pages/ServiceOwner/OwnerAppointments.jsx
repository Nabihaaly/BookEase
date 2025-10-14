import { useContext, useEffect, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { ServiceOwnerContext } from "../../context/ServiceOwnerContext";

export default function OwnerAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editStatus, setEditStatus] = useState("");
  const [editingId, setEditingId] = useState(null);
  const statusOptions = {
    "Pending": ["Confirmed","Cancelled"],
    "Confirmed": ["Completed", "Cancelled"]
  }

  const { services, fetchServices, serviceError } =
    useContext(ServiceOwnerContext);

  // Filter states
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const [service, setService] = useState("");

  useEffect(() => {
    async function fetchServicesIn() {
      const res = await fetchServices();
      if (res?.success === false) {
        console.log(error);
      }
    }
    fetchServicesIn();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      // const res = api.get("/admin/appointments",{fromDate, toDate, status, serviceId, serviceName, serviceOwnerName })
      const res = await api.get("/ServiceOwner/appointments", {
        params: {
          fromDate,
          toDate,
          status,
          serviceName: service,
        },
      });
      console.log(res);
      if (res.data.status) {
        setAppointments(res.data.data);
        setLoading(false);
        console.log(appointments);
      }
    } catch (err) {
      if (err.response) {
        toast.error(
          err.response.data?.statusMessage ||
            "Server error while fetching appointments."
        );
      } else if (err.request) {
        toast.error("Network error. Please check your internet connection.");
      } else toast.error("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this appointment?"
      );
      if (!confirmDelete) return;

      const res = await api.delete(`/ServiceOwner/appointment/${id}`);
      if (res.data.status) {
        setAppointments((prev) => prev.filter((app) => app.id !== id));
        toast.success("Appointment deleted successfully!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      if (err.response) {
        console.error("Error while deleting appointment:", err.response.data);
      } else {
        console.error("Unexpected error while deleting appointment:", err);
      }
    }
  };

  const editAppointment = async () => {
    try {
      const res = await api.put(`/ServiceOwner/appointment/${editingId}`, { status: editStatus });
      if (res.data.status) {
        setAppointments((prev)=>{
            prev.map((app)=>
                app.id == editingId ? {...app,status: editStatus} : app
            )
        })
        fetchAppointments();
        toast.success("Appointment status updated successfully!");
        setEditingId(null);      
      }
    } catch (err) {
      toast.error("Something went wrong!");
      if (err.response) {
        console.error("Error while updating status:", err.response.data);
      } else {
        console.error("Unexpected error while updating status:", err);
      }
    }
  };

  // Format date and time
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString("en-PK", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-PK", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };
  // Load on first render
  useEffect(() => {
    fetchAppointments();
  }, [fromDate, toDate, status, service]);

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Appointments Management
          </h1>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">
              Total: {appointments.length} appointments
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
            <button
              onClick={() => {
                setFromDate("");
                setToDate("");
                setStatus("");
                setService("");
              }}
              className="text-sm text-purple-600 hover:text-purple-700 self-start sm:self-auto"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 items-end">
            {/* From Date */}
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* To Date */}
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Status Filter */}
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Service Filter */}
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {serviceError ? (
                  <option disabled>{serviceError}</option>
                ) : (
                  <>
                    <option value="">All Services</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            {/* Filter Button */}
            {/* <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1">
            <button
              type="submit"
              onClick={fetchAppointments}
              disabled={loading}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
              {loading? "Loading..." : "Filter"}
            </button>
          </div> */}
          </div>
        </div>

        {loading ? (
          <div className="p-6 text-center text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4">Loading appointments...</p>
          </div>
        ): appointments.length === 0  ? (
          <div className="p-6 text-center text-gray-500">
            No appointments found
          </div>
        ) : (
          <>
            {/* Appointments Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">
                    All Appointments
                  </h2>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden">
                <div className="divide-y divide-gray-200">
                  {appointments.map((appointment) => {
                    const { date, time } = formatDateTime(
                      appointment.appointmentDateTime
                    );
                    return (
                      <div key={appointment.id} className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm font-medium text-gray-700">
                                {appointment.userName
                                  ?.split(" ") // split full name into words
                                  .map((word) => word[0]) // take first letter of each word
                                  .join("") // join them together
                                  .toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {appointment.userName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {appointment.userEmail}
                              </div>
                            </div>
                          </div>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {appointment.status}
                          </span>
                        </div>
                        <div className="space-y-1 mb-3">
                          <div className="text-sm text-gray-900">
                            {appointment.serviceTitle} •{" "}
                            {appointment.serviceOwnerName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {date} at {time}
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            PKR. {appointment.price}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                            <Edit2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => {
                              deleteAppointment(appointment.id);
                            }}
                            className="text-red-600 hover:text-red-900 text-sm"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
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
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((appointment) => {
                      const { date, time } = formatDateTime(
                        appointment.appointmentDateTime
                      );
                      return (
                        <tr key={appointment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{date}</div>{" "}
                            {/* Aug 28, 2025*/}
                            <div className="text-sm text-gray-500">
                              {time}
                            </div>{" "}
                            {/* 10:30 AM*/}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                  {appointment.userName
                                    ?.split(" ") // split full name into words
                                    .map((word) => word[0]) // take first letter of each word
                                    .join("") // join them together
                                    .toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {appointment.userName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {appointment.userEmail}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {appointment.serviceTitle}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              PKR. {appointment.servicePrice}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {editingId === appointment.id && statusOptions[appointment.status] ? (
                                <select
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value)}
                                    onBlur={() => editAppointment()}
                                    className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none"
                                >
                                    {statusOptions[appointment.status].map((opt)=>
                                        <option key={opt} value={opt}>{opt}</option>
                                    )}
                                </select>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {appointment.status}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                            {statusOptions[appointment.status] && 
                                <button 
                              onClick={()=>{
                                setEditingId(appointment.id);
                                setEditStatus(appointment.status);
                                }}
                              className="p-2 hover:bg-gray-100 rounded-lg transition">
                                <Edit2 className="w-4 h-4 text-gray-600" />
                              </button>
                            }                              
                              <button
                                onClick={() => {
                                  deleteAppointment(appointment.id);
                                }}
                                className="text-red-600 hover:text-red-900 text-sm"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
