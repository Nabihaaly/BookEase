// this page will render specific catgories serviceOnwers 

import React, { useContext, useEffect, useState } from "react";
import { ServicesContext } from "../../context/ServicesContext";
import { useNavigate, useParams } from "react-router-dom";
import {Filter } from 'lucide-react';
import ServiceOwnerCard from "../../components/ServiceOwnersCard";

const ServiceOwnersPage = () => {
  const navigate = useNavigate();
  const {fetchServiceOwnersById, serviceOwners, providerError } = useContext(ServicesContext);
  const [loading, setLoading] = useState(false);
  
  const {categoryId} = useParams();

  useEffect(() => {
    const loadServiceOwners = async ()=>{
      setLoading(true);
      try{  
        await fetchServiceOwnersById(categoryId);
      }finally{ 
        setLoading(false);
      }
    }
    loadServiceOwners();
  }, []);

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <button 
            onClick={() => navigate('/categories')}
            className="text-purple-600 hover:text-purple-700 mb-2 flex items-center"
          >
            ← Back to Categories
          </button>
          <h2 className="text-3xl font-bold text-gray-900">Service Providers</h2>
          <p className="text-gray-600">Top-rated professionals in your area</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>
                    
      {loading ? (
        <p className="text-gray-500">Loading Services ...</p>
      ):
      providerError? (
        <p className="text-red-600 text-center font-medium">{providerError}</p>
      ): (serviceOwners == null || serviceOwners.length===0) ? (
        <div className="p-6 text-center text-gray-500">
            No Service Owners found
        </div>):(
          <> 
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {serviceOwners.map(owner => (
                <ServiceOwnerCard key={owner.id} owner={owner} />
              ))}
            </div>
          </>
      )}
    </div>
    </>
  );
};

export default ServiceOwnersPage ;
