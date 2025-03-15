import { useState } from "react";
import { Star } from "lucide-react";

const StarRating = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
    if (onRate) onRate(rate);
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          onClick={() => handleRating(star)}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            star <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
