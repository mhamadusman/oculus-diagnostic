import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye, AlertCircle, CheckCircle, BarChart2, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { analysisResultService } from '../../Services/api';

const Result = () => {
  const [showReport, setShowReport] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams(); // Get the OCT image ID from URL params
  const navigate = useNavigate();

  // Fetch analysis result data
  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        // Make sure id exists before making the API call
        if (!id) {
          setError('No image ID provided. Please go back and upload an image.');
          setLoading(false);
          return;
        }
        
        const response = await analysisResultService.getAnalysisForImage(id);
        setResult(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load analysis results. Please try again.');
        console.error('Error fetching analysis results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  // Animation variants
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

  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };

  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  // If error, show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Results</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={handleBack} 
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // If no result found
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Result Found</h2>
          <p className="text-gray-700 mb-4">We couldn't find any analysis results for this image (ID: {id}).</p>
          <button 
            onClick={handleBack} 
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

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
        {/* Back button */}
        <motion.button
          variants={itemVariants}
          onClick={handleBack}
          className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to images</span>
        </motion.button>
        
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
              Condition Detected: {result.classification}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-full mx-auto space-y-8">
          {/* Metrics Row */}
          <motion.section 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { icon: BarChart2, title: "Image ID", value: result.oct_image?.custom_id || id || "N/A" },
              { icon: FileText, title: "Classification", value: result.classification },
              { icon: CheckCircle, title: "Analysis Date", value: new Date(result.analysis_date).toLocaleDateString() }
            ].map((metric, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                className="bg-white rounded-md shadow-sm p-5 text-center transition-all"
              >
                <motion.div className="flex justify-center mb-2">
                  <metric.icon className="text-indigo-600 w-6 h-6" />
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

          {/* Original Image and Findings */}
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
              OCT Image Analysis
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
                    src={result.oct_image?.image || "/api/placeholder/400/320"}
                    alt="OCT image" 
                    className="rounded-lg w-full h-full object-cover border"
                  />
                  <motion.div 
                    variants={itemVariants}
                    className="absolute top-3 left-3 bg-white/80 px-3 py-1 rounded-full text-xs font-medium text-gray-800 shadow-sm"
                  >
                    Original OCT Image
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
                  <motion.div 
                    variants={textVariants}
                    className="text-gray-700 leading-relaxed"
                  >
                    {/* Display findings with paragraph formatting */}
                    {result.findings.split('\n').map((paragraph, idx) => (
                      <p key={idx} className={idx > 0 ? "mt-3" : ""}>
                        {paragraph}
                      </p>
                    ))}
                  </motion.div>
                </div>
                
                {result.oct_image?.notes && (
                  <motion.div variants={itemVariants} className="mt-4">
                    <motion.h3 
                      variants={textVariants}
                      className="font-semibold text-gray-800 mb-2"
                    >
                      Additional Notes
                    </motion.h3>
                    <motion.p variants={textVariants} className="text-gray-700">
                      {result.oct_image.notes}
                    </motion.p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.section>

          {/* Analysis Image Visualization */}
          {result.analysis_image && (
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
                Analysis Visualization
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
                      src={result.analysis_image}
                      alt="Analysis visualization" 
                      className="rounded-lg w-full h-full object-cover border border-gray-100 shadow-sm"
                    />
                    <motion.div 
                      variants={itemVariants}
                      className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 shadow-sm"
                    >
                      Analysis Overlay
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
                      Analysis Details
                    </motion.h3>
                    <motion.p 
                      variants={textVariants}
                      className="text-gray-700 leading-relaxed"
                    >
                      The analysis visualization highlights the regions of interest that influenced the model's prediction. The colored areas indicate the features that were most significant in determining the classification result.
                    </motion.p>
                  </div>
                  
                  <motion.button 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(result.analysis_image, '_blank')}
                    className="w-full bg-gradient-to-r from-gray-950 to-gray-400 text-white rounded-lg px-4 py-3 flex items-center justify-center space-x-2 hover:from-gray-800 hover:to-gray-300 transition-all duration-200 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Analysis Image</span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.section>
          )}

          {/* Actions Section */}
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
              Actions
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                className="bg-gray-50 border border-gray-100 rounded-lg p-5 flex flex-col shadow-sm transition-all"
              >
                <motion.h3 
                  variants={textVariants}
                  className="font-medium text-gray-800 mb-2"
                >
                  Download Analysis Report
                </motion.h3>
                <motion.p 
                  variants={textVariants}
                  className="text-gray-700 text-sm flex-grow"
                >
                  Get a detailed PDF report with all analysis information and findings.
                </motion.p>
                <motion.button 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 bg-gradient-to-r from-gray-950 to-gray-400 text-white rounded-lg px-4 py-2 text-sm hover:from-gray-800 hover:to-gray-300 transition-all shadow-sm"
                >
                  Generate Report
                </motion.button>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                className="bg-gray-50 border border-gray-100 rounded-lg p-5 flex flex-col shadow-sm transition-all"
              >
                <motion.h3 
                  variants={textVariants}
                  className="font-medium text-gray-800 mb-2"
                >
                  Return to Dashboard
                </motion.h3>
                <motion.p 
                  variants={textVariants}
                  className="text-gray-700 text-sm flex-grow"
                >
                  Go back to your image dashboard to upload or analyze more images.
                </motion.p>
                <motion.button 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBack}
                  className="mt-4 bg-gradient-to-r from-gray-950 to-gray-400 text-white rounded-lg px-4 py-2 text-sm hover:from-gray-800 hover:to-gray-300 transition-all shadow-sm"
                >
                  Back to Dashboard
                </motion.button>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Result;