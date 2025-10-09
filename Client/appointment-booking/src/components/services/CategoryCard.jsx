import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-xl shadow hover:shadow-md cursor-pointer overflow-hidden group"
      onClick={() => navigate(`/categories/${category.id}/owners`)}
    >
      <div className="relative h-48">
        <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold">{category.name}</h3>
        <p className="text-gray-600 text-sm">{category.description}</p>
        <div className="mt-3 flex items-center text-purple-600">
          <span className="text-sm">Explore services</span>
          <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
