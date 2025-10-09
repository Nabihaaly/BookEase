import React, { useState , useContext, useEffect} from 'react'; 
import {  MapPin, Star,Heart, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const ServiceOwnerCard = ({ owner }) => {
    const navigate = useNavigate();

    return(
      <>
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="relative h-48">
        <img 
          src={owner.coverImageUrl} 
          alt={owner.name}
          className="w-full h-full object-cover"
        />
        {/* <div className="absolute top-4 left-4"> */}
          {/* <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            owner.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {owner.isOpen ? 'Open' : 'Closed'}
          </span> */}
        {/* </div> */}
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
            <Heart className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{owner.name}</h3>
            <p className="text-gray-600 text-sm">{owner.categoryName}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium">{owner.rating}</span>
              {/* <span className="ml-1 text-sm text-gray-500">({owner.reviews})</span> */}
            </div>
            {/* <span className="text-sm text-gray-600">{owner.priceRange}</span> */}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{owner.description}</p>
        
        {/* <div className="flex flex-wrap gap-2 mb-4">
          {owner.specialties.slice(0, 3).map((specialty, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              {specialty}
            </span>
          ))}
        </div> */}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{owner.location}</span>
          </div>
          {/* <div className="flex items-center text-green-600">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">{owner.nextAvailable}</span>
          </div> */}
        </div>
        
        <div className="mt-4 flex space-x-2">
          <button 
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            onClick={() => {
                navigate(`/serviceOwners/${owner.id}`)
            }}
          >
            View Services
          </button>
          <button className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
            Book Now
          </button>
        </div>
      </div>
    </div>
    </>);
    };

  export default ServiceOwnerCard;