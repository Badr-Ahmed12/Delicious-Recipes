import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock } from 'lucide-react';
import { fetchMealById } from "../services/api";
import { Meal } from "../types/types";

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);

  useEffect(() => {
    const loadMeal = async () => {
      if (id) {
        const data = await fetchMealById(id);
        setMeal(data[0]);
      }
    };

    loadMeal();
  }, [id]);

  if (!meal) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-50">
        <div className="text-center text-gray-600">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Loading details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-start mb-8">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full lg:w-1/3 h-auto rounded-lg shadow-lg mb-4 lg:mb-0 lg:mr-8"
            />
            <div className="lg:flex-1">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{meal.strMeal}</h1>
              <p className="text-xl text-gray-600 mb-2">{meal.strCategory}</p>
              <p className="text-lg text-gray-500 italic mb-4">{meal.strArea}</p>
              <div className="flex items-center justify-between mb-6">
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  {meal.strCategory}
                </span>
                <span className="flex items-center text-gray-600">
                  <Clock className="mr-1" size={18} />
                  30 minutes
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ingredients:</h2>
              <ul className="space-y-2">
                {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                  const ingredient = meal[`strIngredient${i}` as keyof typeof meal];
                  const measure = meal[`strMeasure${i}` as keyof typeof meal];
                  if (ingredient && measure) {
                    return (
                      <li key={i} className="flex items-center text-gray-700">
                        <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                        {measure} {ingredient}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Preparation method:</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line bg-white p-4 rounded-lg shadow">
                {meal.strInstructions}
              </p>

              {meal.strYoutube && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Video preparation:</h2>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={`https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}`}
                      title="YouTube video"
                      className="w-full h-full rounded-lg shadow-lg"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RecipeDetails;


