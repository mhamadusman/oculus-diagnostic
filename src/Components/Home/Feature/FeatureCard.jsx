import React from "react";
import { motion } from "framer-motion";

export default function FeatureCard({
  icon: Icon,
  title,
  subtitle,
  description,
}) {
  return (
    <motion.div
      className="flex-1 bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 ease-in-out transform hover:-translate-y-2"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="flex justify-center items-center  w-16 h-16 mx-auto mb-6 
      rounded-xl bg-gradient-to-r from-gray-950 via-gray-800 to-gray-600"
      >
        <Icon />
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-bold text-darkGray">{title}</h3>
        <p className="text-sm font-medium text-customBlue uppercase tracking-wider">
          {subtitle}
        </p>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
