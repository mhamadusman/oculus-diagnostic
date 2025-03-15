import React from "react";
import FeatureCard from "./FeatureCard";
import { BiUserCheck } from "react-icons/bi";
import { AiOutlineCheckCircle, AiOutlineThunderbolt } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

export default function FeatureSection() {
  const features = [
    {
      icon: () => <AiOutlineCheckCircle className="text-white text-3xl" />,
      title: "High Accuracy",
      subtitle: "Precision",
      description:
        "Our AI diagnostic tools provide unmatched accuracy, ensuring reliable results for medical professionals.",
    },
    {
      icon: () => <AiOutlineThunderbolt className="text-white text-3xl" />,
      title: "Rapid Processing",
      subtitle: "Speed",
      description:
        "Experience lightning-fast analysis, allowing for quicker decision-making and patient care.",
    },
    {
      icon: () => <BiUserCheck className="text-white text-3xl" />,
      title: "User-Friendly Interface",
      subtitle: "Usability",
      description:
        "Intuitive design tailored for medical professionals, making navigation and use effortless.",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-softGray to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-darkGray mb-4">
            Our Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Empowering healthcare professionals with advanced diagnostic tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        <div className="mt-12 flex  justify-center  px-4">
          <Link
            to="/login"
            className=" bg-gradient-to-r from-gray-950 via-gray-800 to-gray-600 
               hover:from-gray-800 hover:via-gray-700 hover:to-gray-500
               transition-colors duration-300 text-white rounded-lg 
               px-6 py-3 text-base md:text-lg shadow-lg hover:shadow-xl 
               font-serif flex items-center justify-center gap-2"
          >
            Explore More Features
          </Link>
        </div>
      </div>
    </section>
  );
}
