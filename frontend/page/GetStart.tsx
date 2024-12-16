import React from 'react';
import { motion } from 'framer-motion';
import { Search, Book, Heart, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GetStarted: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <Search className="w-12 h-12 text-yellow-500" />,
      title: 'Search for Recipes',
      description: 'Use the search bar to find new and exciting recipes.'
    },
    {
      icon: <Book className="w-12 h-12 text-yellow-500" />,
      title: 'Discover Details',
      description: 'Click on any recipe to see the ingredients and preparation steps.'
    },
    {
      icon: <Heart className="w-12 h-12 text-yellow-500" />,
      title: 'Save Favorites',
      description: 'Add recipes to your favorites list for quick access later.'
    },
    {
      icon: <ChefHat className="w-12 h-12 text-yellow-500" />,
      title: 'Start Cooking',
      description: 'Follow the instructions step by step and become a master chef!'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
            Welcome to <span className="text-yellow-500">Recipe World</span>
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12">
            Discover thousands of delicious recipes and learn how to make them easily
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
                {step.title}
              </h2>
              <p className="text-gray-600 text-center">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            type="button"
            className="inline-block bg-yellow-500 text-white font-bold py-3 px-8 rounded-full hover:bg-yellow-600 transition duration-300"
            onClick={() => navigate('/Home')}
          >
            Start Exploring Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default GetStarted;
