import React, { useContext, useEffect, useState } from "react";
import { MapPin, Star, Phone, Globe, Mail , Clock, Calendar,Plus,Edit2, Trash2} from "lucide-react";
import { ServiceOwnerContext } from "../../context/ServiceOwnerContext";
import AddServiceModal from "../../components/Modal/AddServiceModal";

const OwnerProfile = () => {
  const [loading, setLoading] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);

  const [addSModalOpen, setAddSModalOpen] =  useState(false);
  const [editSModalOpen, setEditSModalOpen] =  useState(false);
  const [editOwnerModalOpen, setEditOwnerModalOpen] =  useState(false);

  const {
    fetchServiceOwner,
    serviceOwner,
    ownerError,
    fetchServices,
    services,
    serviceError,
  } = useContext(ServiceOwnerContext);

  useEffect(() => {
    const loadServiceOwner = async () => {
      setLoading(true);
      try {
        await fetchServiceOwner();
      } finally {
        setLoading(false);
      }
    };
    loadServiceOwner();
  }, []);

  useEffect(() => {
    const loadServices = async () => {
      setLoadingServices(true);
      try {
        await fetchServices();
      } finally {
        setLoadingServices(false);
      }
    };
    loadServices();
  }, []);

  const addService = ()=>{

  }

  const ServiceCard = ({ service }) => {
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
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/* Show error */}
      {loading ? (
        <p className="text-red-600 text-center font-medium">Loading...</p>
      ) : ownerError ? (
        <p className="text-red-600 text-center font-medium">{ownerError}</p>
      ) : serviceOwner == null ? (
        <div className="p-6 text-center text-gray-500">No Profile</div>
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              {serviceOwner && (
                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                  <div className="flex items-start space-x-4">
                    <img
                      src={serviceOwner.image}
                      alt={serviceOwner.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-1">
                            {serviceOwner.name}
                          </h2>
                          <p className="text-gray-600 mb-2">
                            {serviceOwner.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              <span>
                                {serviceOwner.rating} ({serviceOwner.reviews}{" "}
                                reviews)
                              </span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{serviceOwner.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Phone className="w-4 h-4" />
                          </button>
                          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Mail className="w-4 h-4" />
                          </button>
                          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Globe className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Available Services
              </h3>
              <button 
              onClick={()=>setAddSModalOpen(true)}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium">
                <Plus className="w-4 h-4" />
                Add Service
              </button>
            </div>
            {serviceError ? (
              <p className="text-red-600 text-center font-medium">
                {serviceError}
              </p>
            ) : loadingServices ? (
              <p className="text-red-600 text-center font-medium">Loading...</p>
            ) : services == null ? (
              <div className="p-6 text-center text-gray-500">
                No Services found
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    
      <AddServiceModal isOpen={addSModalOpen} onClose={()=>setAddSModalOpen(false)}/>
    </>
  );
};

export default OwnerProfile;
