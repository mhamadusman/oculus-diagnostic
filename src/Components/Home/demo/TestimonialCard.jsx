import React from 'react';

const TestimonialCard = ({ image, quote, name, position, company }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center h-full">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
          {/* Placeholder for profile image */}
          <div className="w-full h-full bg-gray-300"></div>
        </div>
        <div className="absolute -right-2 -top-2 bg-blue-500 rounded-full p-2 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
          </svg>
        </div>
      </div>

      <div className="max-h-40 overflow-y-auto mb-6 w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <p className="text-center text-gray-800">"{quote}"</p>
      </div>
      
      <div className="text-center mt-auto">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-gray-600">{position} at {company}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;