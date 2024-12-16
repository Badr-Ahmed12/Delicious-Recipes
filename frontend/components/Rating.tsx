import React, { useState } from "react";
import {RatingProps} from "../types/types";

const Rating: React.FC<RatingProps> = ({ rating, ratingCount, onRatingChange }) => {
  const [selectedRating, setSelectedRating] = useState<number>(rating);

  const handleRating = (value: number) => {
    setSelectedRating(value);
    onRatingChange(value);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            className={`text-2xl transition-transform duration-200 ${
              star <= selectedRating
                ? "text-yellow-400 scale-125"
                : "text-gray-300 hover:text-yellow-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 font-medium">
        {ratingCount} rating{ratingCount !== 1 ? "s" : ""}
      </p>
      <p className="text-sm text-gray-700 font-bold">
        Average rating: {rating.toFixed(1)} / 5
      </p>
    </div>
  );
};

export default Rating;

