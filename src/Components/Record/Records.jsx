import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Records = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const patients = [
    {
      id: "PT001",
      name: "Sarah Johnson",
      age: 58,
      diagnosis: "Diabetic Retinopathy",
      status: "Active",
      lastVisit: "2023-07-15",
      eyeStatus: "OD: Stable, OS: Progressive"
    },
    {
      id: "PT002",
      name: "Michael Chen",
      age: 65,
      diagnosis: "AMD (Wet)",
      status: "Monitoring",
      lastVisit: "2023-07-12",
      eyeStatus: "Both Eyes: Stable"
    },
    // Add more mock patients
  ];

  // Filter patients based on search term and status filter
  const filteredPatients = patients.filter(
    (patient) =>
      (patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "" || patient.status === statusFilter)
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Monitoring":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.7,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        ease: "easeOut",
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic bezier for smoother motion
      }
    }
  };

  const tableRowVariants = {
    hidden: { opacity: 0, y: 10 },
    show: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: (i) => ({ 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-gray-50 lg:mt-14"
    >
      <motion.main 
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="container mx-auto px-4 py-8 lg:px-8 lg:py-12"
      >
        <motion.div 
          variants={itemVariants}
          className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900"
          >
            Patient Records
          </motion.h1>
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
          >
            <motion.input
              variants={itemVariants}
              whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)" }}
              type="text"
              placeholder="Search patients..."
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <motion.select 
              variants={itemVariants}
              whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)" }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Monitoring">Monitoring</option>
              <option value="Archived">Archived</option>
            </motion.select>
          </motion.div>
        </motion.div>

        {/* Table view for medium screens and larger */}
        <AnimatePresence>
          <motion.div
            variants={itemVariants} 
            className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <motion.tr variants={itemVariants}>
                    <motion.th variants={itemVariants} className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Patient ID</motion.th>
                    <motion.th variants={itemVariants} className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name</motion.th>
                    <motion.th variants={itemVariants} className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Age</motion.th>
                    <motion.th variants={itemVariants} className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Diagnosis</motion.th>
                    <motion.th variants={itemVariants} className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Last Visit</motion.th>
                    <motion.th variants={itemVariants} className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</motion.th>
                    <motion.th variants={itemVariants} className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</motion.th>
                  </motion.tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <AnimatePresence>
                    {filteredPatients.map((patient, i) => (
                      <motion.tr 
                        key={patient.id}
                        custom={i}
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.4)" }}
                      >
                        <motion.td variants={itemVariants} className="px-4 py-3 text-sm text-gray-900 font-medium">{patient.id}</motion.td>
                        <motion.td variants={itemVariants} className="px-4 py-3 text-sm text-gray-900">{patient.name}</motion.td>
                        <motion.td variants={itemVariants} className="px-4 py-3 text-sm text-gray-900">{patient.age}</motion.td>
                        <motion.td variants={itemVariants} className="px-4 py-3 text-sm text-gray-900">{patient.diagnosis}</motion.td>
                        <motion.td variants={itemVariants} className="px-4 py-3 text-sm text-gray-900">{patient.lastVisit}</motion.td>
                        <motion.td variants={itemVariants} className="px-4 py-3">
                          <motion.span 
                            variants={itemVariants}
                            whileHover={{ y: -2 }}
                            className={`px-3 py-1 text-sm rounded-full ${getStatusClass(patient.status)}`}
                          >
                            {patient.status}
                          </motion.span>
                        </motion.td>
                        <motion.td variants={itemVariants} className="px-4 py-3">
                          <motion.button 
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-r from-gray-900 to-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-300"
                          >
                            View Details
                          </motion.button>
                        </motion.td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Card view for small screens */}
        <AnimatePresence>
          <motion.div variants={containerVariants} className="md:hidden space-y-4">
            {filteredPatients.map((patient, i) => (
              <motion.div 
                key={patient.id} 
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                className="bg-white rounded-xl shadow-sm p-4 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-2">
                  <motion.span 
                    variants={itemVariants}
                    className="text-sm font-medium text-gray-900"
                  >
                    {patient.id}
                  </motion.span>
                  <motion.span 
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    className={`px-3 py-1 text-xs rounded-full ${getStatusClass(patient.status)}`}
                  >
                    {patient.status}
                  </motion.span>
                </div>
                <motion.h3 
                  variants={itemVariants}
                  className="text-lg font-semibold text-gray-900 mb-1"
                >
                  {patient.name}
                </motion.h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm mb-3">
                  <motion.div variants={itemVariants} className="text-gray-500">Age:</motion.div>
                  <motion.div variants={itemVariants} className="text-gray-900">{patient.age}</motion.div>
                  <motion.div variants={itemVariants} className="text-gray-500">Diagnosis:</motion.div>
                  <motion.div variants={itemVariants} className="text-gray-900">{patient.diagnosis}</motion.div>
                  <motion.div variants={itemVariants} className="text-gray-500">Last Visit:</motion.div>
                  <motion.div variants={itemVariants} className="text-gray-900">{patient.lastVisit}</motion.div>
                </div>
                <motion.button 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-300"
                >
                  View Details
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence>
          {filteredPatients.length === 0 && (
            <motion.div 
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-10 bg-white rounded-xl shadow-md"
            >
              <motion.p 
                variants={itemVariants}
                className="text-gray-500"
              >
                No patients found matching your criteria.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </motion.div>
  );
};

export default Records;