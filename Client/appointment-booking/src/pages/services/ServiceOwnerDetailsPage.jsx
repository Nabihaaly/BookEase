import React, { useContext, useEffect, useState } from "react";
import { ServicesContext } from "../../context/ServicesContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate , useParams} from "react-router-dom";
import {  MapPin, Star,Phone,Globe, Mail } from 'lucide-react';
import ServiceCard from "../../components/ServiceCard";
import BookAppointmentModal from "../../components/BookAppointments";

const ServiceOwnerDetailsPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {  fetchServicesByOwnerId, services, serviceOwners, providerError } = useContext(ServicesContext);

    const {ownerId} = useParams();
    const currentOwner = serviceOwners.find(s=> s.id == ownerId);

    const {user} = useContext(AuthContext);
  
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    
  useEffect(() => {
      const loadServices = async ()=>{
        setLoading(true);
        try{  
          await fetchServicesByOwnerId(ownerId);
        }finally{ 
          setLoading(false);
        }
      }
      loadServices();
    }, []);

  
  const handleBooking = (service)=>{
    if (!user?.roles.includes("User")) {
      navigate("/login");
      return;
    }
    setSelectedService(service);
    setModalOpen(true);
  }

  return (
    <>
    {/* Show error */}
    { providerError && <p className="text-red-600 text-center font-medium">{providerError}</p>}

    {currentOwner == null ? (
    <div className="p-6 text-center text-gray-500">
        No Service Owner found
    </div>):(
        <> 
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <button 
                onClick={() => navigate(-1)}
                className="text-purple-600 hover:text-purple-700 mb-4 flex items-center"
              >
                ← Back to Service Providers
              </button>
              
              {currentOwner && (
                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={currentOwner.coverImageUrl} 
                      alt={currentOwner.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-1">{currentOwner.name}</h2>
                          <p className="text-gray-600 mb-2">{currentOwner.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              <span>{currentOwner.rating} ({currentOwner.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{currentOwner.location}</span>
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
            
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Available Services</h3>
            {services == null ? (
              <div className="p-6 text-center text-gray-500">
                No Services found
              </div>
              ):(
                <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service=>(
                  <ServiceCard key={service.id} service={service} onBook={handleBooking}/>
                ))}
              </div>
              </>
            )}
          </div>
        </>
    )}
    <BookAppointmentModal isOpen={isModalOpen} service={selectedService} onClose={()=>setModalOpen(false)} />
    </>
  );
};

export default ServiceOwnerDetailsPage;
