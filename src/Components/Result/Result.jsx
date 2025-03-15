import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye, AlertCircle, CheckCircle, BarChart2 } from 'lucide-react';

const ResultPage = () => {
  const [showReport, setShowReport] = useState(false);

  // Enhanced smooth animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut" 
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        ease: "easeOut",
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic bezier for smoother motion
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeInOut" 
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 lg:mt-14"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-repeat bg-[length:20px_20px]" 
             style={{backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)"}}></div>
      </div>

      {/* Content */}
      <motion.div 
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="relative z-10 min-h-screen container mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans"
      >
        {/* Header Section */}
        <motion.div 
          variants={itemVariants}
          className="max-w-4xl mx-auto text-center mb-8"
        >
          <motion.h1 
            variants={textVariants}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 font-poppins"
          >
            Analysis Results
          </motion.h1>
          <motion.div 
            variants={itemVariants}
            className="bg-gray-200 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center space-x-3 shadow-sm"
          >
            <AlertCircle className="text-gray-600 w-6 h-6" />
            <motion.p 
              variants={textVariants}
              className="text-gray-800 font-medium text-lg"
            >
              Condition Detected: Pneumonia
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-full mx-auto space-y-8">
          {/* Metrics Row */}
          <motion.section 
            variants={itemVariants}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { icon: BarChart2, title: "Accuracy", value: "96.3%" },
              { icon: CheckCircle, title: "Precision", value: "94.7%" },
              { icon: FileText, title: "Prediction", value: "98.5%" }
            ].map((metric, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                className="bg-white rounded-md shadow-sm p-5 text-center transition-all"
              >
                <motion.div className="flex justify-center mb-2">
                  <metric.icon className="text-green-600 w-6 h-6" />
                </motion.div>
                <motion.h3 variants={textVariants} className="text-gray-500 rounded-md text-sm font-medium uppercase tracking-wider">
                  {metric.title}
                </motion.h3>
                <motion.p variants={textVariants} className="text-xl font-semibold mt-1 text-gray-700">
                  {metric.value}
                </motion.p>
              </motion.div>
            ))}
          </motion.section>

          {/* Prediction Section */}
          <motion.section 
            variants={itemVariants}
            className="bg-white rounded-md shadow-sm p-6 space-y-5"
          >
            <motion.h2 
              variants={textVariants}
              className="text-2xl font-semibold font-poppins text-gray-800 flex items-center"
            >
              <span className="bg-indigo-100 p-2 rounded-md mr-3">
                <Eye className="text-indigo-600 w-5 h-5" />
              </span>
              Model Prediction
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                variants={itemVariants}
                className="md:order-1"
              >
                <div className="relative">
                  <motion.img 
                    variants={itemVariants}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src="./images/cam.png"
                    alt="Chest X-ray image" 
                    className="rounded-lg w-full h-full object-cover border"
                  />
                  <motion.div 
                    variants={itemVariants}
                    className="absolute top-3 left-3 bg-white/80 px-3 py-1 rounded-full text-xs font-medium text-gray-800 shadow-sm"
                  >
                    Original X-ray
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="space-y-4 md:order-2"
              >
                <div>
                  <motion.h3 
                    variants={textVariants}
                    className="font-semibold text-gray-800 mb-3"
                  >
                    Findings
                  </motion.h3>
                  <motion.p 
                    variants={textVariants}
                    className="text-gray-700 leading-relaxed"
                  >
                    The analysis reveals opacity detected in the lower right lobe with moderate infiltration present. No pleural effusion is observed. The patterns are consistent with bacterial pneumonia, characterized by alveolar infiltrates and air bronchograms. The right lower lobe shows increased opacity with patchy consolidation, which is a classic presentation in community-acquired pneumonia cases. The hilar structures appear normal, and no significant lymphadenopathy is noted. The cardiac silhouette is within normal limits, indicating no cardiac involvement at this stage.
                  </motion.p>
                  <motion.p 
                    variants={textVariants}
                    className="text-gray-700 leading-relaxed mt-3"
                  >
                    The absence of pleural effusion suggests that the infection has not progressed to involve the pleural space, which is generally a favorable prognostic sign. The parenchymal changes are moderate in severity, affecting approximately 20-30% of the right lung field. The left lung appears unaffected, with normal aeration and vascular markings. These findings, combined with the clinical presentation, strongly support the diagnosis of lobar pneumonia, likely bacterial in origin.
                  </motion.p>
                </div>
                
                <motion.button 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-gray-950 to-gray-400 text-white rounded-lg px-4 py-3 flex items-center justify-center space-x-2 hover:from-gray-800 hover:to-gray-300 transition-all duration-200 shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Analysis Details</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.section>

          {/* Grad-CAM Visualization */}
          <motion.section 
            variants={itemVariants}
            className="bg-white rounded-md shadow-sm p-6 space-y-5"
          >
            <motion.h2 
              variants={textVariants}
              className="text-2xl font-semibold font-poppins text-gray-800 flex items-center"
            >
              <span className="bg-indigo-100 p-2 rounded-lg mr-3">
                <BarChart2 className="text-indigo-600 w-5 h-5" />
              </span>
              Grad-CAM Visualization
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div 
                variants={itemVariants}
                className="md:order-1"
              >
                <div className="relative">
                  <motion.img 
                    variants={itemVariants}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src="./images/cam.png"
                    alt="Heatmap visualization" 
                    className="rounded-lg w-full h-full object-cover border border-gray-100 shadow-sm"
                  />
                  <motion.div 
                    variants={itemVariants}
                    className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 shadow-sm"
                  >
                    Heatmap Overlay
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="space-y-4 md:order-2"
              >
                <div>
                  <motion.h3 
                    variants={textVariants}
                    className="font-semibold text-gray-800 mb-3"
                  >
                    Region Analysis
                  </motion.h3>
                  <motion.p 
                    variants={textVariants}
                    className="text-gray-700 leading-relaxed"
                  >
                    The Grad-CAM heatmap visualization highlights the areas of the radiograph that most significantly influenced the model's prediction. The regions of highest activation are concentrated in the right lower lobe, corresponding to the areas of consolidation identified in the clinical findings. The intensity of the red coloration indicates a strong correlation between these regions and the model's diagnostic confidence.
                  </motion.p>
                  <motion.p 
                    variants={textVariants}
                    className="text-gray-700 leading-relaxed mt-3"
                  >
                    Secondary areas of interest are noted along the right cardiac border, where subtle changes in lung parenchyma texture were detected by the algorithm. The model has correctly ignored normal anatomical structures such as the heart border, major vessels, and bony structures that are not relevant to the pneumonia diagnosis. This selective attention demonstrates the model's ability to focus on clinically relevant features while filtering out normal anatomical noise.
                  </motion.p>
                  <motion.p 
                    variants={textVariants}
                    className="text-gray-700 leading-relaxed mt-3"
                  >
                    The left lung shows minimal activation, reflecting its normal appearance in the radiograph. This asymmetric activation pattern strongly supports the unilateral nature of the pneumonic process, which is accurately captured by the model's attention mechanism. The clear delineation between areas of interest and normal lung tissue suggests high specificity in the model's feature extraction process, contributing to its overall diagnostic accuracy.
                  </motion.p>
                </div>
                
                <motion.button 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-gray-950 to-gray-400 text-white rounded-lg px-4 py-3 flex items-center justify-center space-x-2 hover:from-gray-800 hover:to-gray-300 transition-all duration-200 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full Report</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.section>

          {/* Summary Stats */}
          <motion.section 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { title: "Disease Category", value: "Respiratory" },
              { title: "Severity Level", value: "Moderate" },
              { title: "Treatment Urgency", value: "High" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                className="bg-white rounded-md shadow-sm p-5 text-center transition-all"
              >
                <motion.h3 
                  variants={textVariants}
                  className="text-gray-500 text-sm font-medium uppercase tracking-wider"
                >
                  {stat.title}
                </motion.h3>
                <motion.p 
                  variants={textVariants}
                  className="text-lg sm:text-xl font-semibold mt-1 text-gray-700"
                >
                  {stat.value}
                </motion.p>
              </motion.div>
            ))}
          </motion.section>

          {/* Recommended Actions */}
          <motion.section 
            variants={itemVariants}
            className="bg-white rounded-md shadow-sm p-6"
          >
            <motion.h2 
              variants={textVariants}
              className="text-2xl font-semibold font-poppins text-gray-800 mb-5 flex items-center"
            >
              <span className="bg-indigo-100 p-2 rounded-lg mr-3">
                <CheckCircle className="text-indigo-600 w-5 h-5" />
              </span>
              Recommended Actions
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { 
                  title: "Consult with Specialist", 
                  description: "Schedule follow-up with pulmonologist to discuss treatment options.", 
                  buttonText: "Schedule Appointment" 
                },
                { 
                  title: "Additional Tests", 
                  description: "Consider additional blood work and sputum culture to determine pathogen.", 
                  buttonText: "Request Tests" 
                }
              ].map((action, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  className="bg-gray-50 border border-gray-100 rounded-lg p-5 flex flex-col shadow-sm transition-all"
                >
                  <motion.h3 
                    variants={textVariants}
                    className="font-medium text-gray-800 mb-2"
                  >
                    {action.title}
                  </motion.h3>
                  <motion.p 
                    variants={textVariants}
                    className="text-gray-700 text-sm flex-grow"
                  >
                    {action.description}
                  </motion.p>
                  <motion.button 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 bg-gradient-to-r from-gray-950 to-gray-400 text-white rounded-lg px-4 py-2 text-sm hover:from-gray-800 hover:to-gray-300 transition-all shadow-sm"
                  >
                    {action.buttonText}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultPage;