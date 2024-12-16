import React, { useState } from "react";
import {  RecipeCardProps } from "../types/types";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";


const RecipeCard: React.FC<RecipeCardProps> = ({ meal }) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(meal.rating || 0);
  const [ratingCount, setRatingCount] = useState<number>(meal.ratingCount || 0);

  const handleRatingChange = (newRating: number) => {
    const totalRating = rating * ratingCount + newRating;
    const newRatingCount = ratingCount + 1;
    const updatedRating = totalRating / newRatingCount;

    setRating(updatedRating);
    setRatingCount(newRatingCount);

    localStorage.setItem(
      meal.idMeal,
      JSON.stringify({ rating: updatedRating, ratingCount: newRatingCount })
    );
  };

  const handleMoreInfo = () => {
    navigate(`/recipe/${meal.idMeal}`);
  };

  return (
    <div className="group p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">

      <div className="relative">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 object-cover rounded-lg group-hover:opacity-90"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <button className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500" onClick={handleMoreInfo}>
            More Info
          </button>
        </div>
      </div>

      <h2 className="text-lg font-semibold mt-4 text-gray-800 group-hover:text-yellow-500">
        {meal.strMeal}
      </h2>

      <p className="text-sm text-gray-500 italic">{meal.strCategory}</p>
       <div className="mt-4">
        <Rating
          rating={rating}
          ratingCount={ratingCount}
          onRatingChange={handleRatingChange}
        />
      </div>
    </div>
  );
};

export default RecipeCard;


