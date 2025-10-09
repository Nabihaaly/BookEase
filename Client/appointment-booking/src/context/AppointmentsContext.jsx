import { createContext, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppointmentContext = createContext();

const AppointmentProvider= ({children})=> {
    const [appointments, setAppointments] = useState([]);
    const [appointmentsError, setAppointmentsError] = useState(null);

    const fetchAppointments = async () => {
    try {
        setAppointmentsError(null); // reset error
        const res = await api.get("/user/appointments");
        if (res?.data.status) {
        setAppointments(res.data.data);
        console.log(appointments);
        return { success: true };
        }
    } catch (error) {
        console.error("error in fetching appointments:", error);
        const errorMessage =
        error.response?.data?.statusMessage ||
        error.response?.data?.message ||
        "Failed to load appointments";

        setAppointmentsError(errorMessage); // set error here
        toast.error(errorMessage);
        return { success: false, message: errorMessage };
    }
    };

    const postAppointment = async (appointment) => {
    try {
        const res = await api.post("/user/appointment",appointment);
        if (res?.data.status) {
            toast.success("Appointment Booked!")
            await fetchAppointments(); // Refresh appointments list
            return { success: true };
        }
    } catch (error) {
        console.error("error in posting appointment:", error);
        const errorMessage =
        error.response?.data?.statusMessage ||
        error.response?.data?.message ||
        "Failed to post appointment";

        toast.error(errorMessage);
        return { success: false, message: errorMessage };
    }
    };

    const editAppointment = async (id, appointmentDateTime) => {
        try {
            const res = await api.put(`/user/appointment/${id}`,{appointmentDateTime});
            if (res?.data.status) {
                toast.success("Appointment Rescheduled!")
                await fetchAppointments(); // Refresh appointments list
                return { success: true };
            }
        } catch (error) {
            console.error("error in rescheduling appointment:", error);
            const errorMessage =
            error.response?.data?.statusMessage ||
            error.response?.data?.message ||
            "Failed to post appointment";

            toast.error(errorMessage);
            return { success: false, message: errorMessage };
        }
    };

    const deleteAppointment = async (id) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to cancel this appointment?");
            if (!confirmDelete) return;

            const res = await api.delete(`/user/appointment/${id}`);
            if (res?.data.status) {
            toast.success("Appointment deleted successfully!");
            await fetchAppointments(); // Refresh list
            return { success: true };
            }
        } catch (error) {
            console.error("Error in deleting appointment:", error);
            const errorMessage =
            error.response?.data?.statusMessage ||
            error.response?.data?.message ||
            "Failed to delete appointment";

            toast.error(errorMessage);
            return { success: false, message: errorMessage };
        }
    };
    
    return (
        <AppointmentContext.Provider value={{ appointments, fetchAppointments, appointmentsError, postAppointment, editAppointment, deleteAppointment}}>
            {children}
        </AppointmentContext.Provider>
    );
};

export default AppointmentProvider ;