import { Clock, Calendar } from 'lucide-react';
import { useContext } from 'react';
import { AppointmentContext } from '../context/AppointmentsContext';

const AppointmentCard = ({ appointment, onEdit }) => {

  const {deleteAppointment} = useContext(AppointmentContext)

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
  const {date, time} = formatDateTime(appointment.appointmentDateTime);

  return(
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-purple-500 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{appointment.serviceTitle}</h4>
            <p className="text-purple-600 font-medium">{appointment.serviceOwnerName}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {appointment.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>{time}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button onClick={()=>{onEdit(appointment)}} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
            Reschedule
          </button>
          <button onClick={()=>{deleteAppointment(appointment.id)}} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm">
            Cancel
          </button>
          {/* <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
            View Details
          </button> */}
        </div>
      </div>
  );
};  

  export default AppointmentCard;