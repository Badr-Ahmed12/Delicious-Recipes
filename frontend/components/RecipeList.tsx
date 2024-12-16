import React from "react";
import { RecipeListProps } from "../types/types";
import RecipeCard from "./RecipeCard";

const RecipeList: React.FC<RecipeListProps> = ({ meals }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {meals.map((meal) => (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
};

export default RecipeList;
