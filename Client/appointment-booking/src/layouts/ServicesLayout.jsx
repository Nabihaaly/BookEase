import React, { useCallback, useContext, useState } from 'react';
import { NavLink, Outlet, Link as RouterLink } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop'
import { Search, MapPin, Heart } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const ServicesLayout = () => {
  const navLinkClass = ({ isActive }) =>
  `px-4 py-2 rounded-lg font-low transition-colors ${
    isActive ? "text-purple-700" : "text-gray-700 hover:bg-gray-100"
  }`;
  const {user} = useContext(AuthContext);

  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <RouterLink  to="/" >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                BookingPro
              </h1>
            </RouterLink>
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/categories" className={navLinkClass}>
                Categories
              </NavLink>
              <NavLink to="/serviceOwners" className={navLinkClass}>
                Service Owners
              </NavLink>
              <NavLink to="/allServices" className={navLinkClass}>
                Services
              </NavLink>
              {user?.roles.includes("User") && (
                  <NavLink to="/myAppointments" className={navLinkClass}>
                    My Appointments
                  </NavLink>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search services..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Heart className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 text-gray-700">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Karachi, PK</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  return (
      <div className="min-h-screen bg-gray-50">
        <ScrollToTop />
        <Header />
        <Outlet/>
      </div>
  );
};

export default ServicesLayout;


// import React, { useState , useContext, useEffect} from 'react';
// import Navbar from '../components/common/Navbar';
// import { Search, MapPin, Star, Clock, Calendar, Filter, Heart, ArrowRight, Phone, Mail, Globe } from 'lucide-react';
// import { ServicesContext } from '../context/ServicesContext';

// const ServiceCategories = () => {
//     const [activeTab, setActiveTab] = useState('categories');
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [selectedOwner, setSelectedOwner] = useState(null);

//     const {fetchCategories, categories, categoryError, fetchServiceOwners, serviceOwners, setServiceOwners, services, fetchServices, providerError, serviceError} = useContext(ServicesContext);
//     const [loading, setLoading] = useState(false);

//     async function fetchCategoriesHere(){
//         setLoading(true);
//         await fetchCategories();
//         setLoading(false);
//     }
//     async function fetchServiceOwnersHere(){
//         setLoading(true);
//         await fetchServiceOwners();
//         setLoading(false);
//     }
//     async function fetchServicesHere(){
//         setLoading(true);
//         await fetchServices();
//         setLoading(false);
//     }
//     useEffect( () => {
//         fetchCategoriesHere();
//         fetchServiceOwnersHere();
//         fetchServicesHere();
//     }, []);

//   // Sample data
// //   {
// //       id: 1,
// //       name: 'Beauty & Spa',
// //       description: 'Hair, nails, skincare, and wellness services',
// //       icon: '💇‍♀️',
// //       serviceCount: 45,
// //       image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=200&fit=crop'
// //     },

// //  serviceOwners = [
// //     {
// //       id: 1,
// //       name: 'Sarah\'s Beauty Studio',
// //       category: 'Beauty & Spa',
// //       rating: 4.8,
// //       reviews: 124,
// //       location: 'Downtown',
// //       image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
// //       priceRange: '$$',
// //       isOpen: true,
// //       nextAvailable: '2:30 PM',
// //       specialties: ['Hair Styling', 'Nail Art', 'Facials'],
// //       description: 'Premium beauty services with experienced professionals'
// //     },

// //   services = [
// //     {
// //       id: 1,
// //       ownerId: 1,
// //       name: 'Premium Hair Cut & Styling',
// //       duration: '60 min',
// //       price: 50,
// //       description: 'Professional haircut with wash and styling',
// //       image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=200&fit=crop'
// //     },

// // { allServices
// //   id: 1,
// //   name: 'Premium Hair Cut & Styling',
// //   owner: 'Sarah\'s Beauty Studio',
// //   category: 'Beauty & Spa',
// //   duration: '60 min',
// //   price: 50,
// //   rating: 4.8,
// //   image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=200&fit=crop',
// //   nextAvailable: '2:30 PM Today'
// // },


//   const Header = () => (
//     <header className="bg-white sticky top-0 z-50">  {/*top 14*/}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center space-x-8">
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//               BookEase
//             </h1>
//             <div className="hidden md:flex items-center space-x-1">
//               <button
//                 onClick={() => setActiveTab('categories')}
//                 className={`px-4 py-2 rounded-lg font-low transition-colors  ${
//                   activeTab === 'categories' ? ' text-purple-700' : 'text-gray-700 hover:bg-gray-100'
//                 }`}
//               >
//                 Categories
//               </button>
//               <button
//                 onClick={() => setActiveTab('services')}
//                 className={`px-4 py-2 rounded-lg font-low transition-colors ${
//                   activeTab === 'services' ? ' text-purple-700' : 'text-gray-700 hover:bg-gray-100'
//                 }`}
//               >
//                 All Services
//               </button>
//               <button
//                 onClick={() => setActiveTab('appointments')}
//                 className={`px-4 py-2 rounded-lg font-low transition-colors ${
//                   activeTab === 'appointments' ? ' text-purple-700' : 'text-gray-700 hover:bg-gray-100'
//                 }`}
//               >
//                 My Appointments
//               </button>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <div className="relative hidden md:block">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search services..."
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//             </div>
//             <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
//               <Heart className="w-5 h-5" />
//             </button>
//             <div className="flex items-center space-x-2 text-gray-700">
//               <MapPin className="w-4 h-4" />
//               <span className="text-sm">Karachi, PK</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );

//   const CategoryCard = ({ category }) => (
//     <div 
//       className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden"
//       onClick={() => {
//         setSelectedCategory(category.id);
//         setActiveTab('serviceOwners');
//       }}
//     >
//       <div className="relative h-48 overflow-hidden">
//         <img 
//         //   src={category.image} 
//           alt={category.name}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
//         <div className="absolute top-4 left-4">
//           <span className="text-3xl">{category.iconKey}</span>
//         </div>
//         <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
//           {/* <span className="text-sm font-medium text-gray-700">{category.serviceCount} services</span> */}
//         </div>
//       </div>
//       <div className="p-6">
//         <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
//         <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
//         <div className="mt-4 flex items-center text-purple-600 group-hover:text-purple-700 transition-colors">
//           <span className="text-sm font-medium">Explore services</span>
//           <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
//         </div>
//       </div>
//     </div>
//   );

//   const ServiceOwnerCard = ({ owner }) => (
//     <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
//       <div className="relative h-48">
//         <img 
//           src={owner.image} 
//           alt={owner.name}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute top-4 left-4">
//           <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//             owner.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//           }`}>
//             {owner.isOpen ? 'Open' : 'Closed'}
//           </span>
//         </div>
//         <div className="absolute top-4 right-4">
//           <button className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
//             <Heart className="w-4 h-4 text-gray-700" />
//           </button>
//         </div>
//       </div>
      
//       <div className="p-6">
//         <div className="flex items-start justify-between mb-3">
//           <div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-1">{owner.name}</h3>
//             <p className="text-gray-600 text-sm">{owner.category}</p>
//           </div>
//           <div className="text-right">
//             <div className="flex items-center">
//               <Star className="w-4 h-4 text-yellow-400 fill-current" />
//               <span className="ml-1 text-sm font-medium">{owner.rating}</span>
//               <span className="ml-1 text-sm text-gray-500">({owner.reviews})</span>
//             </div>
//             <span className="text-sm text-gray-600">{owner.priceRange}</span>
//           </div>
//         </div>
        
//         <p className="text-gray-600 text-sm mb-4">{owner.description}</p>
        
//         <div className="flex flex-wrap gap-2 mb-4">
//           {owner.specialties.slice(0, 3).map((specialty, index) => (
//             <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
//               {specialty}
//             </span>
//           ))}
//         </div>
        
//         <div className="flex items-center justify-between">
//           <div className="flex items-center text-gray-600">
//             <MapPin className="w-4 h-4 mr-1" />
//             <span className="text-sm">{owner.location}</span>
//           </div>
//           <div className="flex items-center text-green-600">
//             <Clock className="w-4 h-4 mr-1" />
//             <span className="text-sm font-medium">{owner.nextAvailable}</span>
//           </div>
//         </div>
        
//         <div className="mt-4 flex space-x-2">
//           <button 
//             className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
//             onClick={() => {
//               setSelectedOwner(owner.id);
//               setActiveTab('ownerServices');
//             }}
//           >
//             View Services
//           </button>
//           <button className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
//             Book Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const ServiceCard = ({ service, showOwner = false }) => (
//     <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
//       <div className="relative h-40">
//         <img 
//           src={service.image} 
//           alt={service.name}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute top-3 right-3">
//           <span className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm font-semibold text-purple-600">
//             ${service.price}
//           </span>
//         </div>
//       </div>
      
//       <div className="p-4">
//         <div className="flex items-start justify-between mb-2">
//           <h4 className="text-lg font-semibold text-gray-900 leading-tight">{service.name}</h4>
//           {service.rating && (
//             <div className="flex items-center ml-2">
//               <Star className="w-4 h-4 text-yellow-400 fill-current" />
//               <span className="ml-1 text-sm">{service.rating}</span>
//             </div>
//           )}
//         </div>
        
//         {showOwner && (
//           <p className="text-purple-600 text-sm font-medium mb-1">{service.owner}</p>
//         )}
        
//         <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
        
//         <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//           <div className="flex items-center">
//             <Clock className="w-4 h-4 mr-1" />
//             <span>{service.duration}</span>
//           </div>
//           <div className="flex items-center">
//             <Calendar className="w-4 h-4 mr-1" />
//             <span className="text-green-600 font-medium">{service.nextAvailable}</span>
//           </div>
//         </div>
        
//         <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
//           Book Appointment
//         </button>
//       </div>
//     </div>
//   );

//   const AppointmentCard = ({ appointment }) => (
//     <div className="bg-white rounded-xl shadow-sm border-l-4 border-purple-500 p-6">
//       <div className="flex items-start justify-between mb-4">
//         <div>
//           <h4 className="text-lg font-semibold text-gray-900">{appointment.service}</h4>
//           <p className="text-purple-600 font-medium">{appointment.provider}</p>
//         </div>
//         <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//           appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
//           appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//           'bg-gray-100 text-gray-800'
//         }`}>
//           {appointment.status}
//         </span>
//       </div>
      
//       <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
//         <div className="flex items-center">
//           <Calendar className="w-4 h-4 mr-2" />
//           <span>{appointment.date}</span>
//         </div>
//         <div className="flex items-center">
//           <Clock className="w-4 h-4 mr-2" />
//           <span>{appointment.time}</span>
//         </div>
//       </div>
      
//       <div className="flex space-x-2">
//         <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
//           Reschedule
//         </button>
//         <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm">
//           Cancel
//         </button>
//         <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
//           View Details
//         </button>
//       </div>
//     </div>
//   );

//   const appointments = [
//     {
//       id: 1,
//       service: 'Premium Hair Cut & Styling',
//       provider: 'Sarah\'s Beauty Studio',
//       date: 'Today, Sep 3',
//       time: '2:30 PM',
//       status: 'confirmed'
//     },
//     {
//       id: 2,
//       service: 'Dental Cleaning',
//       provider: 'Elite Dental Care',
//       date: 'Tomorrow, Sep 4',
//       time: '9:00 AM',
//       status: 'pending'
//     }
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'categories':
//         return (
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Service Category</h2>
//               <p className="text-lg text-gray-600">Find the perfect service provider for your needs</p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {categories.map(category => (
//                 <CategoryCard key={category.id} category={category} />
//               ))}
//             </div>
//           </div>
//         );

//       case 'serviceOwners':
//         return (
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="flex items-center justify-between mb-8">
//               <div>
//                 <button 
//                   onClick={() => setActiveTab('categories')}
//                   className="text-purple-600 hover:text-purple-700 mb-2 flex items-center"
//                 >
//                   ← Back to Categories
//                 </button>
//                 <h2 className="text-3xl font-bold text-gray-900">Service Providers</h2>
//                 <p className="text-gray-600">Top-rated professionals in your area</p>
//               </div>
              
//               <div className="flex items-center space-x-4">
//                 <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                   <Filter className="w-4 h-4 mr-2" />
//                   Filters
//                 </button>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               {serviceOwners.map(owner => (
//                 <ServiceOwnerCard key={owner.id} owner={owner} />
//               ))}
//             </div>
//           </div>
//         );

//       case 'ownerServices':
//         const currentOwner = serviceOwners.find(o => o.id === selectedOwner);
//         return (
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="mb-8">
//               <button 
//                 onClick={() => setActiveTab('serviceOwners')}
//                 className="text-purple-600 hover:text-purple-700 mb-4 flex items-center"
//               >
//                 ← Back to Service Providers
//               </button>
              
//               {currentOwner && (
//                 <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
//                   <div className="flex items-start space-x-4">
//                     <img 
//                       src={currentOwner.image} 
//                       alt={currentOwner.name}
//                       className="w-24 h-24 rounded-xl object-cover"
//                     />
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <h2 className="text-2xl font-bold text-gray-900 mb-1">{currentOwner.name}</h2>
//                           <p className="text-gray-600 mb-2">{currentOwner.description}</p>
//                           <div className="flex items-center space-x-4 text-sm text-gray-600">
//                             <div className="flex items-center">
//                               <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
//                               <span>{currentOwner.rating} ({currentOwner.reviews} reviews)</span>
//                             </div>
//                             <div className="flex items-center">
//                               <MapPin className="w-4 h-4 mr-1" />
//                               <span>{currentOwner.location}</span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                             <Phone className="w-4 h-4" />
//                           </button>
//                           <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                             <Mail className="w-4 h-4" />
//                           </button>
//                           <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                             <Globe className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
            
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Available Services</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {services.filter(s => s.ownerId === selectedOwner).map(service => (
//                 <ServiceCard key={service.id} service={service} />
//               ))}
//             </div>
//           </div>
//         );

//       case 'services':
//         return (
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="flex items-center justify-between mb-8">
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-900">All Services</h2>
//                 <p className="text-gray-600">Browse all available services</p>
//               </div>
              
//               <div className="flex items-center space-x-4">
//                 <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
//                   <option>All Categories</option>
//                   <option>Beauty & Spa</option>
//                   <option>Health & Medical</option>
//                   <option>Fitness & Wellness</option>
//                 </select>
//                 <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                   <Filter className="w-4 h-4 mr-2" />
//                   More Filters
//                 </button>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {allServices.map(service => (
//                 <ServiceCard key={service.id} service={service} showOwner={true} />
//               ))}
//             </div>
//           </div>
//         );

//       case 'appointments':
//         return (
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="mb-8">
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h2>
//               <p className="text-gray-600">Manage your upcoming and past appointments</p>
//             </div>
            
//             <div className="mb-6">
//               <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
//                 <button className="px-4 py-2 bg-white text-gray-900 rounded-md shadow-sm text-sm font-medium">
//                   Upcoming
//                 </button>
//                 <button className="px-4 py-2 text-gray-600 text-sm font-medium">
//                   Past
//                 </button>
//                 <button className="px-4 py-2 text-gray-600 text-sm font-medium">
//                   Cancelled
//                 </button>
//               </div>
//             </div>
            
//             <div className="space-y-4">
//               {appointments.map(appointment => (
//                 <AppointmentCard key={appointment.id} appointment={appointment} />
//               ))}
//             </div>
            
//             {appointments.length === 0 && (
//               <div className="text-center py-12">
//                 <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
//                 <p className="text-gray-600 mb-4">Book your first appointment to get started</p>
//                 <button 
//                   onClick={() => setActiveTab('categories')}
//                   className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
//                 >
//                   Browse Services
//                 </button>
//               </div>
//             )}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//     <Header />
//     {renderContent()}
//     </div>
//   );
// };

// export default ServiceCategories;