import React, { PureComponent, useState } from 'react';
import Categories from '../components/Categories';
import StepsProcess from '../components/StepsProcess';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/Home';
import FeaturesMy from '../components/FeaturesMy';
import Footer from '../components/common/FooterMy';
import CTA from '../components/CTA';
import Testimonials from '../components/Testimonials'
import LandingNavbar from '../components/landingNavbar';
import FAQ from '../components/FAQ';
import { Search, MapPin, Heart} from 'lucide-react';

// import Hero from '../components/hero';

function Landing() {  
    const [activeTab, setActiveTab] = useState('categories');
  
   const Header = () => (
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center space-x-1">
                <button
                  onClick={() => setActiveTab('categories')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'categories' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Categories
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'services' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Services
                </button>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'appointments' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  My Appointments
                </button>
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
    <>
    <div className="bg-gray-50">
      <Navbar/>
      {/* Core sections */}
      <HeroSection/>
      <Categories/>
      <FeaturesMy/>
      <StepsProcess/>
      <Testimonials/>
      <FAQ/>
      <CTA/>
      <Footer/>
      

      {/* SCROLL-TO-TOP BUTTON (Optional Enhancement) */}
      <button className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 opacity-0 pointer-events-none">
        <span className="text-xl">↑</span>
      </button>
    </div>
    </>
  );
}

export default Landing; 