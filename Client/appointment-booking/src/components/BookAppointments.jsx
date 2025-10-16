import { useContext, useState, useEffect } from "react";
import { AppointmentContext } from "../context/AppointmentsContext";
import api from "../utils/api";

const BookAppointmentModal = ({ isOpen, service, onClose }) => {
  if (!isOpen || !service) return null;

  const { postAppointment } = useContext(AppointmentContext);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get array of day numbers (0-6) when service is available
  const getAvailableDayNumbers = () => {
    const dayMap = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 0,
    };

    return service?.daysOfWeek?.map((day) => dayMap[day]) || [];
  };

  const isDateAvailable = (dateString) => {
    const date = new Date(dateString);
    const dayNumber = date.getDay();
    const availableDays = getAvailableDayNumbers();
    return availableDays.includes(dayNumber);
  };

  // fetch available slots whenever service or date changes
  useEffect(() => {
    if (service?.id && date) {
      getSlots();
    }
  }, [service, date]);

  const confirmBooking = async () => {
    if (!date || !time) {
      alert("Please select date and time");
      return;
    }
    const appointmentDateTime = `${date}T${time}:00`;
    setLoading(true);
    try {
      console.log(service.id);
      const form = {
        serviceID: service.id,
        appointmentDateTime: appointmentDateTime,
      };
      console.log(form);

      const result = await postAppointment(form);
      if (result?.success) onClose();
    } catch (err) {
      console.error("Booking failed", err);
    } finally {
      setLoading(false);
    }
  };

  const getSlots = async () => {
    try {
      const res = await api.get(
        `/user/service/${service.id}/slots?date=${date}`
      );

      const available = Array.isArray(res.data?.data?.available)
        ? res.data.data.available
        : [];
      const booked = Array.isArray(res.data?.data?.booked)
        ? res.data.data.booked
        : [];
      console.log(available);

      const merged = [
        ...available.map((time) => ({ time, status: "available" })),
        ...booked.map((time) => ({ time, status: "booked" })),
      ].sort(
        (a, b) =>
          new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`)
      );

      setSlots(merged);
      console.log(res.data.data.available);
      console.log(slots);
    } catch (err) {
      console.error("Error fetching slots", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50 ">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="relative p-6 pb-4 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
          <p className="text-gray-500 mt-1">Schedule your service</p>
        </div>

        {/* Form Content */}
        <div className="px-6 pb-6 space-y-6 flex-1 overflow-y-auto scroll-smooth">
          {/* Service Card */}
          <div>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-3 border border-purple-100">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <svg
                    className="w-5 h-5 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    ></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {service.title}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm">
                    <span className="flex items-center text-gray-600">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      {service.durationMinutes}
                    </span>
                    <span className="font-semibold text-purple-600">
                      Rs. {service.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Available Days Info */}
          {service?.daysOfWeek && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Available on : </span>
                {service.daysOfWeek.join(", ")}
              </p>
            </div>
          )}

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Select Date
            </label>
            <input
              value={date}
              type="date"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              onInput={(e) => {
                  if (!isDateAvailable(e.target.value)) {
                      alert(`Service is not available on this day. Available days: ${service?.daysOfWeek?.join(", ")}`);
                      e.target.value = date;
                  }
              }}
            />
            {date && !isDateAvailable(date) && (
                <p className="text-red-500 text-sm mt-2">
                    This service is not available on the selected day.
                </p>
            )}
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Available Times
            </label>
            <div className="grid grid-cols-4 gap-2">
              {slots.map(({ time: slotTime, status }) => {
                const isSelected = slotTime === time;
                const isBooked = status === "booked"; // Mock booked slots

                return (
                  <button
                    key={slotTime}
                    onClick={() => setTime(slotTime)}
                    disabled={isBooked}
                    className={`
                      px-3 py-2.5 text-sm rounded-lg font-medium transition-all
                      ${
                        isBooked
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : isSelected
                          ? "bg-purple-600 text-white shadow-md"
                          : "bg-white border border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50"
                      }
                    `}
                  >
                    {slotTime}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 pt-2 pb-3 bg-gray-50 border-t border-gray-100 flex-shrink-0">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmBooking}
              className="flex-1 px-6 py-2 text-white bg-purple-600 rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium transition-colors shadow-md"
              disabled={loading}
            >
              Confirm Booking
            </button>
          </div>
          <div className=" pt-2 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">
                Selected: {date}, {time}{" "}
              </span>
              <span className="font-semibold text-purple-600">
                Total: Rs.{service.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentModal;
