// import React, { useEffect, useState } from 'react';
// import { Element } from 'react-scroll';
// import { Link as RouterLink } from "react-router-dom";
// import { FaCut, FaSpa, FaDumbbell, FaHome, FaBook, FaBriefcase, FaHospital, FaUserTie } from "react-icons/fa";
// import api from '../utils/api';

// const Categories = () => {
//   const [categories, setCategories] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(()=>{
//     async function fetchCatgories(){
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await api.get("/user/serviceCategories");
//         console.log(res);
//         if (res.data.status) {
//           // Backend returned success (200 OK with status=true)
//           setCategories(res.data.data);
//         }
//       } catch (err) {
//         console.error("Axios error:", err); 
//         // Axios threw an error (network error OR 4xx/5xx response)
//         if (err.response)
//           // Backend returned error response (e.g., 400, 401, 500)
//           setError(
//             err.response.data?.statusMessage ||
//               "Server error while fetching stats."
//           );
//         else if (err.request)
//           // Request made but no response (network issue, server down)
//           setError("Network error. Please check your internet connection.");
//         // Something else (bug in code, timeout, etc.)
//         else setError("Unexpected error occurred.");
        
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchCatgories()
//   },[])

//   const EMOJI_MAP = {
//     'salon': '💇‍♀️',
//     'medical': '🏥',
//     'fitness': '💪',
//     'tech': '💻',
//     'services': '💻',
//     'home': '🏠',
//     'consultant': '💼',
//     'education': '📚',
//     'pet': '🐾',

//     'food': '🍽️',
//     'car': '🚗',
//     'music': '🎵',
//     'photography': '📸'
//   };

//   // Function to get emoji 
//   const getEmoji = (iconKey) => {
//     if (!iconKey) return '❓';
    
//     const key = iconKey.toLowerCase();
//     return EMOJI_MAP[key] || '🔹'; // Default emoji
//   };
//   return (
//     <Element name='categories'>
//       <section className="relative bg-gray-50 py-16 overflow-hidden">
//         {/* Simple background decoration */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-20 -right-20 w-40 h-40 bg-gray-200 rounded-full opacity-30 blur-2xl"></div>
//           <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gray-300 rounded-full opacity-20 blur-2xl"></div>
//         </div>

//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Simplified Section Header */}
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 border border-gray-200 mb-4">
//               <span className="text-gray-600 font-medium text-sm">Our Services</span>
//             </div>
            
//             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
//               We Serve Every Industry
//             </h2>
            
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//               From beauty salons to healthcare facilities, our platform adapts to 
//               <span className="text-gray-800 font-medium"> any service-based business </span>
//               with intelligent booking solutions.
//             </p>
//           </div>

//            {/* Show loading */}
//           {loading && (
//             <p className="text-gray-500">Loading Categories ...</p>
//           )}

//           {/* Show error */}
//           {error && <p className="text-red-600 text-center font-medium">{error}</p>}

//           {categories == null ? (
//             <div className="p-6 text-center text-gray-500">
//               No Categories found
//             </div>):(
//               <>  
//             {/* Simplified Industry Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//               {categories.map((category) => (
//               <div 
//                 key={category.id}
//                 className="group relative"
//               >
//                 {/* Card container */}
//                 <div className="relative bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 border border-gray-100 h-full flex flex-col">
                  
//                   {/* Icon container */}
//                   <div className="relative mb-4">
//                     <div className="w-14 h-14 mx-auto bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
//                       <span className="text-2xl">
//                         {getEmoji(category.iconKey)}
//                       </span>
//                     </div>
//                   </div>
                  
//                   {/* Content */}
//                   <div className="relative text-center flex-grow flex flex-col">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                       {category.name}
//                     </h3>
//                     <p className="text-gray-600 text-sm leading-relaxed flex-grow">
//                       {category.description}
//                     </p>
//                   </div>
                  
//                   {/* Simple hover effect */}
//                   <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl"></div>
//                 </div>
//               </div>

//               ))}
//             </div>
//           </>
//             )}
          
//           {/* Bottom CTA section */}
//           <div className="text-center mt-16">
//             <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white rounded-xl p-6 shadow-md border border-gray-100">
//               <div className="text-center sm:text-left">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-1">
//                   Explore all categories!
//                 </h3>
//                 <p className="text-gray-600">
//                   Browse the full list of services and providers available on our platform.
//                 </p>
//               </div>
//               <RouterLink to="/ServiceCategories">
//               <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap">
//                 View All
//               </button>
//               </RouterLink>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Element>
//   );
// };

// export default Categories;

import React, { useContext, useEffect, useState } from 'react';
import { Element } from 'react-scroll';
import { Link as RouterLink } from "react-router-dom";
import { ServicesContext } from '../context/ServicesContext';

const Categories = () => {
  const {categories, categoryError, fetchCategories} = useContext(ServicesContext);
  const [loading, setLoading] = useState(false);

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

  const EMOJI_MAP = {
    'salon': '💇‍♀️',
    'medical': '🏥',
    'fitness': '💪',
    'tech': '💻',
    'services': '💻',
    'home': '🏠',
    'consultant': '💼',
    'education': '📚',
    'pet': '🐾',

    'food': '🍽️',
    'car': '🚗',
    'music': '🎵',
    'photography': '📸'
  };

  // Function to get emoji 
  const getEmoji = (iconKey) => {
    if (!iconKey) return '❓';
    
    const key = iconKey.toLowerCase();
    return EMOJI_MAP[key] || '🔹'; // Default emoji
  };
  return (
    <Element name='categories'>
      <section className="relative bg-gray-50 py-16 overflow-hidden">
        {/* Simple background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gray-200 rounded-full opacity-30 blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gray-300 rounded-full opacity-20 blur-2xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Simplified Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 border border-gray-200 mb-4">
              <span className="text-gray-600 font-medium text-sm">Our Services</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              We Serve Every Industry
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From beauty salons to healthcare facilities, our platform adapts to 
              <span className="text-gray-800 font-medium"> any service-based business </span>
              with intelligent booking solutions.
            </p>
          </div>

           {/* Show loading */}
          {loading && (
            <p className="text-gray-500">Loading Categories ...</p>
          )}

          {/* Show error */}
          {categoryError && <p className="text-red-600 text-center font-medium">{categoryError}</p>}

          {categories == null ? (
            <div className="p-6 text-center text-gray-500">
              No Categories found
            </div>):(
              <>  
            {/* Simplified Industry Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
              <div 
                key={category.id}
                className="group relative"
              >
                {/* Card container */}
                <div className="relative bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 border border-gray-100 h-full flex flex-col">
                  
                  {/* Icon container */}
                  <div className="relative mb-4">
                    <div className="w-14 h-14 mx-auto bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                      <span className="text-2xl">
                        {getEmoji(category.iconKey)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative text-center flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                      {category.description}
                    </p>
                  </div>
                  
                  {/* Simple hover effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl"></div>
                </div>
              </div>

              ))}
            </div>
          </>
            )}
          
          {/* Bottom CTA section */}
          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  Explore all categories!
                </h3>
                <p className="text-gray-600">
                  Browse the full list of services and providers available on our platform.
                </p>
              </div>
              <RouterLink to="/categories">
              <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap">
                View All
              </button>
              </RouterLink>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Categories;