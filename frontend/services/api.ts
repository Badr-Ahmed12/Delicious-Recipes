import axios from "axios";
import { Meal, Category } from "../types/types";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchMealById = async (id: string): Promise<Meal[]> => {
    const response = await axios.get(`${API_URL}/lookup.php?i=${id}`);
    return response.data.meals;
};

export const fetchRandomMeal = async (): Promise<Meal[]> => {
  const response = await axios.get(`${API_URL}/random.php`);
  return response.data.meals;
};

export const fetchRandomMeals = async (count: number): Promise<Meal[]> => {
  const requests = Array.from({ length: count }, () => axios.get(`${API_URL}/random.php`));
  const responses = await Promise.all(requests);
  return responses.flatMap(response => response.data.meals);
};

export const fetchMealByName = async (name: string): Promise<Meal[]> => {
  const response = await axios.get(`${API_URL}/search.php?s=${name}`);
  return response.data.meals;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${API_URL}/categories.php`);
  return response.data.categories;
};

export const fetchMealsByCategory = async (category: string): Promise<Meal[]> => {
  const response = await axios.get(`${API_URL}/filter.php?c=${category}`);
  return response.data.meals;
};
