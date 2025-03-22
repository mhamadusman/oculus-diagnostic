import React from 'react';
import TestimonialCard from './TestimonialCard';

const Testimonial = () => {
  // Testimonial data included directly in this component
  const testimonials = [
    {
      image: "/path/to/image1.jpg",
      quote: "Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat",
      name: "Jenny Wilson",
      position: "Project Manager",
      company: "Microsoft"
    },
    {
      image: "/path/to/image2.jpg",
      quote: "Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat",
      name: "Robert Fox",
      position: "Founder",
      company: "Brain.co"
    },
    {
      image: "/path/to/image3.jpg",
      quote: "Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat",
      name: "Kristin Watson",
      position: "UX Designer",
      company: "Google"
    }
  ];

  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Clients Say</h2>
          <p className="mt-4 text-xl text-gray-600">Trusted by thousands of satisfied customers worldwide</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard
              key={index}
              image={testimonial.image}
              quote={testimonial.quote}
              name={testimonial.name}
              position={testimonial.position}
              company={testimonial.company}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;