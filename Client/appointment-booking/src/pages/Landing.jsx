import React, { PureComponent } from 'react';
import Services from '../components/Services';
import StepsProcess from '../components/StepsProcess';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/Home';
import FeaturesMy from '../components/FeaturesMy';
import Footer from '../components/common/FooterMy';
import CTA from '../components/CTA';
import Testimonials from '../components/Testimonials'
import LandingNavbar from '../components/landingNavbar';
import FAQ from '../components/FAQ';

function Landing() {  
  return (
    <>
    <div className="bg-gray-50">
      <Navbar/>
      {/* Core sections */}
      <HeroSection/>
      <Services/>
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