import React, { useContext, useEffect, useState } from 'react';
import { Star, Clock, Calendar, Filter } from 'lucide-react';
import { ServicesContext } from '../../context/ServicesContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../../components/ServiceCard';
import BookAppointmentModal from '../../components/BookAppointments';

const AllServicesPage = () => {

  const {services, fetchServices, serviceError, fetchCategories, categories, categoryError} = useContext(ServicesContext);
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  
  const {user} = useContext(AuthContext);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(()=>{
    const loadServices = async ()=>{
      setLoading(true);
      try{  
        await fetchServices();
      }finally{ 
        setLoading(false);
      }
    }
    loadServices();
  },[])

  useEffect( () => {
      const loadCategories= async ()=> {
        setLoading(true);
        try{
          await fetchCategories();
        }
        finally{
          setLoading(false);
        }
      };
      loadCategories();
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">All Services</h2>
                <p className="text-gray-600">Browse all available services</p>
            </div>
            
            <div className="flex items-center space-x-4">
                <select 
                  value={category}
                  onChange={(e)=> setCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  {categoryError ? (
                    <option disabled>{categoryError}</option>
                  ):( 
                    <>
                      <option value="" >All Categories</option>
                      {categories.map((c)=>(
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </>
                  )};
                </select>
                {/* <button onClick={(event)=>{filetering(event)}} className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
                </button> */}
            </div>
            </div>
            
            {loading && (
              <p className="text-gray-500">Loading Services ...</p>
            )}

            {serviceError && <p className="text-red-600 text-center font-medium">{serviceError}</p>}

            {services == null ? (
              <div className="p-6 text-center text-gray-500">
                No Services found
              </div>
            ):(
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {services
                    // .filter(s => s.categoryName==="" || s.categoryName === category)
                    .filter(s => category==="" || s.categoryName === category)
                    .map(service => (
                    <ServiceCard key={service.id} service={service} showOwner={true} onBook={()=>handleBooking(service)} />
                  ))}
                </div>
              </>
            )}
            <BookAppointmentModal isOpen={isModalOpen} service={selectedService} onClose={()=>setModalOpen(false)} />
        </div>
        );


};

export default AllServicesPage;