import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StarRating from "./StarRating"; // Import the StarRating component

const testimonials = [
  {
    name: "Mackenzie Baeszler",
    text: "After Cambridge, I attended Manasquan High School. When I graduated, I attended University of Montana, later transferring to Pennsylvania College of Technology to pursue a bachelor's degree in Welding Engineering. After receiving my Bachelor's degree, I went to dive school, and obtained my ADCI certification to become certified as a commercial diver. Fast forward to today, I currently am working in the Civil/Structural Engineering world, as a Project Engineer/Diver, performing inspections both below and above water in NYC and surrounding areas.",
    position: "Project Engineer & Diver in NYC",
    image: "/images/doc.avif",
    joinedYear: "2009",
    graduationYear: "2013",
  },
  {
    name: "Jane Smith",
    text: "I highly recommend this platform. The professionalism and quality are top-notch. The experience has been transformative.",
    position: "Marketing Head at ABC Ltd",
    image: "/images/doc.avif",
    joinedYear: "2010",
    graduationYear: "2014",
  },
  {
    name: "Robert Brown",
    text: "A fantastic experience with great results! Would definitely use this service again. The team was incredibly supportive.",
    position: "Freelancer",
    image: "/images/doc.avif",
    joinedYear: "2011",
    graduationYear: "2015",
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState("left");
  const [ratings, setRatings] = useState({});

  const goToPrevious = () => {
    if (isSliding) return;
    setIsSliding(true);
    setSlideDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsSliding(false), 500);
  };

  const goToNext = () => {
    if (isSliding) return;
    setIsSliding(true);
    setSlideDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsSliding(false), 500);
  };

  const handleRating = (rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [currentIndex]: rating,
    }));
  };

  return (
    <div className="h-screen w-full bg-white">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-darkGray lg:mb-12">
          What our Clients Say
        </h2>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl lg:h-96 rounded-lg shadow-lg overflow-visible lg:mt-20">
          <div className="relative min-h-[300px]">
            {/* Sliding Content Container */}
            <div
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                isSliding
                  ? `transform ${
                      slideDirection === "left"
                        ? "-translate-x-full"
                        : "translate-x-full"
                    }`
                  : "transform translate-x-0"
              }`}
            >
              {/* Profile Image */}
              <div className="absolute -top-16 left-8 z-1">
                <div className="relative w-36 h-36 overflow-hidden rounded-full border-4 border-slate-200 shadow-lg">
                  <img
                    src={testimonials[currentIndex].image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
               
              </div>

              {/* Quotation Mark */}
              <div className="absolute top-4 right-8 text-gray-200 text-8xl font-serif leading-none">
                "
              </div>

              {/* Testimonial Content */}
              <div className="w-full pl-52 pr-8 py-12">
                <div className="flex flex-col max-w-3xl space-y-4">
                  <h3 className="text-xl font-bold text-darkGray">
                    {testimonials[currentIndex].name}
                  </h3>
                  <div className="max-h-[120px] overflow-y-auto pr-4 custom-scrollbar">
                    <p className="text-gray-600 leading-relaxed">
                      {testimonials[currentIndex].text}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
                    <p className="text-sm font-medium text-customBlue uppercase tracking-wider">
                      {testimonials[currentIndex].position}
                    </p>
                    <div className="text-sm font-medium text-customBlue uppercase tracking-wider">
                      |
                    </div>
                    <p className="text-sm font-medium text-customBlue uppercase tracking-wider">
                      Graduated MS IV in {testimonials[currentIndex].graduationYear}
                    </p>
                  </div>

                  {/* Star Rating Below Graduation Year */}
                  <div className="mt-4">
                    <StarRating onRate={handleRating} />
                   
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute lg:left-20 lg:top-2/3 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-20"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900 hover:text-slate-500" />
            </button>

            <button
              onClick={goToNext}
              className="absolute lg:right-16 lg:top-2/3 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-20"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-900 hover:text-slate-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
