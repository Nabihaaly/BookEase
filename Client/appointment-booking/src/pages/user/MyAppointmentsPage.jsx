import { Clock, Calendar } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { AppointmentContext } from "../../context/AppointmentsContext";
import AppointmentCard from "../../components/AppointmentCard";
import EditAppointmentModal from "../../components/EditAppointments";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const MyAppointments = () => {
  const { appointments, fetchAppointments, appointmentsError } =
    useContext(AppointmentContext);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      try {
        await fetchAppointments();
      } finally {
        setLoading(false);
      }
    };
    loadAppointments();
  }, []);

  const editAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          My Appointments
        </h2>
        <p className="text-gray-600">
          Manage your upcoming and past appointments
        </p>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Loading Appointments ...</p>
      ) : appointmentsError ? (
        <p className="text-red-600 text-center font-medium">
          {appointmentsError}
        </p>
      ) : !appointments || appointments.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No appointments yet
          </h3>
          <p className="text-gray-600 mb-4">
            Book your first appointment to get started
          </p>
          <button
            onClick={() => navigate("/categories")}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Browse Services
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onEdit={editAppointment}
            />
          ))}
        </div>
      )}

      <EditAppointmentModal
        isOpen={isModalOpen}
        appointment={selectedAppointment}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default MyAppointments;
