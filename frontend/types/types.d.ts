export interface Meal {
    idMeal: string;
    strMeal: string;
    strDrinkAlternate: string | null;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string | null;
    strYoutube: string | null;
    rating?: number; 
    ratingCount?: number; 
  }
  
  
  export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
  }
  
  export interface RatingProps {
    rating: number;
    ratingCount: number;
    onRatingChange: (newRating: number) => void;
  }

  export interface RecipeCardProps {
    meal: Meal;
  }
  
  export interface RecipeListProps {
    meals: Meal[];
  }

  export interface RatingProps {
    rating: number;
    ratingCount: number;
    onRatingChange: (newRating: number) => void;
  }