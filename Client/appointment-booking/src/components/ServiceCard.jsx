import { useState } from "react";
import { Clock, Calendar } from "lucide-react";

const ServiceCard = ({ service, showOwner = false , onBook}) => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="relative h-40">
          <img
            src={service.coverImageUrl}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <span className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm font-semibold text-purple-600">
              ${service.price}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-lg font-semibold text-gray-900 leading-tight">
              {service.title}
            </h4>
          </div>

          {showOwner && (
            <p className="text-purple-600 text-sm font-medium mb-1">
              {service.serviceOwnerName}
            </p>
          )}

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {service.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{service.durationMinutes} min</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
            </div>
          </div>

          <button
            // onClick={}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            Book Appointment
          </button>
          
        </div>
      </div>

      
    </>
  );
};

export default ServiceCard;
