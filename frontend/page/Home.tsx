import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchCategories, fetchMealsByCategory, fetchRandomMeals } from "../services/api";
import RecipeList from "../components/RecipeList";
import { Category, Meal } from "../types/types";
import { Utensils, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedMeals, setSuggestedMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [categoriesData, randomMeals] = await Promise.all([
          fetchCategories(),
          fetchRandomMeals(4) 
        ]);
        setCategories(categoriesData);
        setSuggestedMeals(randomMeals);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleCategoryClick = async (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    try {
      const data = await fetchMealsByCategory(category);
      setMeals(data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-center text-gray-800 mt-8 mb-6"
      >
        Discover <span className="text-yellow-500">Delicious Recipes</span>
      </motion.h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Utensils className="w-12 h-12 text-yellow-500 animate-spin" />
        </div>
      ) : (
        <>
          {!selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-yellow-500" />
                Trending Recipes
              </h2>
              <RecipeList meals={suggestedMeals} />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {categories.map((category) => (
              <motion.button
                key={category.idCategory}
                onClick={() => handleCategoryClick(category.strCategory)}
                className={`px-4 py-2 font-semibold rounded-full shadow transition ${
                  selectedCategory === category.strCategory
                    ? "bg-yellow-500 text-white"
                    : "bg-white text-gray-800 hover:bg-yellow-100"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.strCategory}
              </motion.button>
            ))}
          </motion.div>
          
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Recipes for {selectedCategory}
              </h2>
              <RecipeList meals={meals} />
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

