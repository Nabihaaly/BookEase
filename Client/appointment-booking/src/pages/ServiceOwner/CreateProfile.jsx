import React, { useState, useContext, useEffect } from 'react';
import api from '../../utils/api';
import { Upload, MapPin, Building2, FileText, Image, Calendar, Users, Settings, LogOut, X, Plus, Star, Mail, Phone, Globe } from 'lucide-react';
import { ServicesContext } from '../../context/ServicesContext';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateProfile() {
  const [showModal, setShowModal] = useState(false);
  const [hasProfile, setHasProfile] = useState(false); // Track if business profile exists
  const [formData, setFormData] = useState({
    name: '',
    categoryID: '',
    description: '',
    isSoloProvider: false,
    coverImageUrl: '',
    rating: 0,
    location: ''
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ type: '', message: '' });

  const {categories, fetchCategories} = useContext(ServicesContext);
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
        setFormData(prev => ({ ...prev, coverImageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage({ type: '', message: '' });

    // Validate categoryID is selected
  if (!formData.categoryID) {
    toast.error("Please select a category", {
      position: "top-right",
      autoClose: 5000,
    });
    setIsSubmitting(false);
    return;
  }

    try {
      const res = await api.post("/ServiceOwner/register-business", formData);
      console.log(formData);

      if(res.data.status){
        setResponseMessage({
          type: 'success',
          message: 'Business registered successfully!'
        });
        
        setTimeout(() => {
          setShowModal(false);
          setHasProfile(true);
          setResponseMessage({ type: '', message: '' });
        }, 1500);
      }
      else{
        setResponseMessage({
          type: 'error',
          message: 'Error registering business. Please try again.'
        });
        toast.error(res.data.statusMessage || "Error registering business. Please try again!", {
            position: "top-right",
            autoClose: 5000,
        });
      }
      
    } catch (error) {
      console.error("registring error:", error);
        const errorMessage = error.response?.data?.statusMessage || error.response?.data?.message || "Something went wrong during registring";
        toast.error(errorMessage, {
            position: "top-right",
            autoClose: 5000,
      });
      setResponseMessage({
        type: 'error',
        message: 'Error registering business. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    if (!isSubmitting) {
      setShowModal(false);
      setResponseMessage({ type: '', message: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-8">
          {!hasProfile ? (
            // No Profile State
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-10 h-10 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Welcome to BookEase!</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Create your business profile to start managing appointments and grow your service business.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  Create Business Profile
                </button>
              </div>
            </div>
          ) : (
            // Profile Exists State
            <div className="max-w-5xl mx-auto">
              {/* Profile Header */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
                <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-400 relative">
                  {coverImagePreview && (
                    <img src={coverImagePreview} alt="Cover" className="w-full h-full object-cover" />
                  )}
                  <button className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>
                <div className="p-8 relative">
                  <div className="flex items-start gap-6">
                    <div className="w-32 h-32 bg-gray-200 rounded-full -mt-20 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-400 text-sm">No image</span>
                      )}
                    </div>
                    <div className="flex-1 mt-4">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{formData.name || 'Business Name'}</h2>
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-semibold">(0 reviews)</span>
                      </div>
                      <p className="text-gray-600 mb-4">{formData.description || 'No description available'}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {formData.location || 'Location not set'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                    <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <Mail className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <Globe className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-600 font-medium">Total Appointments</h3>
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">0</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-600 font-medium">Pending</h3>
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">0</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-600 font-medium">Completed</h3>
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">0</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Register Your Business</h2>
                <p className="text-gray-600 text-sm mt-1">Fill in your business details to get started</p>
              </div>
              <button
                onClick={closeModal}
                disabled={isSubmitting}
                className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-8">
              {responseMessage.message && (
                <div className={`mb-6 p-4 rounded-lg ${
                  responseMessage.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {responseMessage.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Cover Image Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Image
                  </label>
                  {coverImagePreview ? (
                    <div className="relative w-full h-40 rounded-xl overflow-hidden border-2 border-gray-200">
                      <img src={coverImagePreview} alt="Cover" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setCoverImagePreview(null);
                          setFormData(prev => ({ ...prev, coverImageUrl: '' }));
                        }}
                        className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition">
                      <Image className="w-10 h-10 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Click to upload image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Business Name */}
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your business name"
                  />
                </div>

                {/* Category */}
                <div className="mb-6">
                  <label htmlFor="categoryID" className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Category *
                  </label>
                  <select
                    id="categoryID"
                    name="categoryID"
                    value={formData.categoryID}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Describe your business and services..."
                  />
                </div>

                {/* Location */}
                <div className="mb-6">
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your business location"
                  />
                </div>

                {/* Solo Provider */}
                <div className="mb-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isSoloProvider"
                      checked={formData.isSoloProvider}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="ml-3">
                      <span className="font-semibold text-gray-700">I am a solo service provider</span>
                      <span className="block text-sm text-gray-500">Check if you work independently</span>
                    </span>
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Registering...
                      </span>
                    ) : (
                      'Register Business'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}