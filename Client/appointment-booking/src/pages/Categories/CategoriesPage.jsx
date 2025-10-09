import React, { useContext, useEffect, useState } from "react";
import { ServicesContext } from "../../context/ServicesContext";
import { useNavigate } from "react-router-dom";
import {ArrowRight } from 'lucide-react';

const CategoriesPage = () => {
  const { fetchCategories, categories, categoryError } = useContext(ServicesContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const handleExploreServices = (categoryId)=>{
    navigate(`/categories/${categoryId}/owners`)
  }

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

    const IMG_MAP = {
    'salon': 'https://i.pinimg.com/736x/95/ba/0f/95ba0f3e338a1ad09ea8116c12cb5ad2.jpg',
    'medical': 'https://i.pinimg.com/1200x/bb/97/6f/bb976f0e31ef90f95b465b0c6a0c1491.jpg',
    'fitness': 'https://i.pinimg.com/1200x/e9/99/5d/e9995dc4b5b6115129d91ae9cdc92359.jpg',
    'services': 'https://i.pinimg.com/1200x/5b/b7/e7/5bb7e71faa72004a9485e7e19655d7e8.jpg',
    'home': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
    'consultant': 'https://i.pinimg.com/736x/22/5d/c5/225dc5df9df63c7b698fa623f566556d.jpg',
    'education': 'https://i.pinimg.com/736x/4e/94/fa/4e94fa2e9f59630f930ad6901a6ca760.jpg',
    'pet': 'https://i.pinimg.com/736x/30/6d/cb/306dcb9cc3c854e1e96813d64aea3a83.jpg',
    
    'tech': '💻',
    'food': '🍽️',
    'car': '🚗',
    'music': '🎵',
    'photography': '📸'
  };  

  // Function to get image 
  const getImage = (iconKey) => {
    if (!iconKey) return null;
    const key = iconKey.toLowerCase();
    return IMG_MAP[key] || null;
  };

  const CategoryCard = ({ category }) => {
    const imgUrl = getImage(category.iconKey);
    return(
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden"
      onClick={() => {
        navigate(`/categories/${category.id}/owners`)
      }}
    >
      <div className="relative h-48 overflow-hidden">
        {imgUrl ? (
            <img
              src={imgUrl}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400">
              No Image
            </div>
          )}
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
        <div className="absolute top-4 left-4">
          <span className="text-3xl">{category.icon}</span>
        </div>
        
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {category.name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {category.description}
        </p>
        <div className="mt-4 flex items-center text-purple-600 group-hover:text-purple-700 transition-colors">
          <button onClick={()=>{handleExploreServices(category.id)}} className="text-sm font-medium">Explore services</button>
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
    );
  };

  // 🌀 Loading skeletons
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
      <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  return (
    <>
    {/* Show error */}
    {categoryError && (<p className="text-red-600 text-center font-medium">{categoryError}</p>)}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Choose a Category
        </h2>

        {loading? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ):  !categories || categories.length === 0 ?(
          <div className="p-6 text-center text-gray-500">No Categories found</div>
        ):(
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
            ))}
          </div>  
        )};
      </div>
    </>
  );
};

export default CategoriesPage;
