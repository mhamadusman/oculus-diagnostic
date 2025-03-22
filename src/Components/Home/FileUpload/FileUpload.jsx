import React, { useState, useRef } from 'react';
import { Image as ImageIcon, UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate , Link } from 'react-router-dom';
import { octImageService } from '../../../Services/api'; // Adjust the path to your API service
import { analysisResultService } from '../../../Services/api'; // Adjust the path to your API service


const FileUpload = () => {
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const [previewUrl, setPreviewUrl] = useState(null); // Image preview
  const [uploadComplete, setUploadComplete] = useState(false); // Track upload completion
  const [analysis , setAnalysis] = useState(null)
  const inputRef = useRef(null);
  const [imageId , setImageId] = useState(null);
  const navigate = useNavigate();

  // Handle file selection and generate preview
  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const seeResult = () => {
    const results = analysisResultService.getAnalysisResults();
    
    if (results.length > 0) {
        // Assuming each result has a timestamp or ID for sorting
        const latestResult = results.reduce((latest, current) => 
            new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
        );

        setAnalysis(latestResult);
    }
};

  // Handle the actual upload to the API
  const handleUpload = async () => {
    if (!inputRef.current.files[0]) return; // Ensure a file is selected
    setLoading(true); // Show loading indicator
    setError(null); // Reset any previous errors
    try {
      const file = inputRef.current.files[0];
      const response = await octImageService.uploadImage(file); // Call API to upload image
      console.log('Image uploaded:', response);

      if(response && response.id) {
        console.log('Image ID:', response.id); // Extract and log the image ID
     }
     setImageId(response.id)

      setUploadComplete(true); // Mark upload as complete
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error(err);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="lg:mt-14 min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div 
          className="absolute inset-0 bg-repeat bg-[length:20px_20px]" 
          style={{ backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)" }}
        ></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto bg-white rounded-md shadow-lg p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-sm text-gray-900">Upload Your OCT Image</h1>
          <p className="text-gray-600 mt-2">Image format must be .JPG or .PNG</p>
        </div>

        <div 
          onClick={() => inputRef.current.click()}
          className="relative cursor-pointer group"
        >
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
            accept=".jpg,.jpeg,.png"
          />

          {!previewUrl ? (
            <div className="border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 p-10 flex flex-col items-center justify-center max-h-96 transition-all hover:border-gray-900">
              <div className="bg-gray-900 text-white p-4 rounded-full mb-4">
                <UploadCloud className="w-10 h-10" />
              </div>
              <p className="text-xl font-medium text-gray-900 mb-2">
                Drag and drop your file here
              </p>
              <p className="text-gray-500 mb-6">or click to browse files</p>
              <button className="bg-gradient-to-r from-gray-900 to-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-all hover:from-gray-800 hover:to-gray-300">
                Select OCT Image
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-400 rounded-lg overflow-hidden h-80 relative group">
              <img 
                src={previewUrl} 
                alt="OCT preview" 
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-gradient-to-r from-gray-900 to-gray-400 text-white px-6 py-3 rounded-lg font-medium">
                  Change Image
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Loading indicator with three animated dots */}
        {loading && (
          <div className="mt-6 flex justify-center items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-gray-900 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {/* Upload button appears after preview is set */}
        {previewUrl && !loading && !uploadComplete && (
          <button
            onClick={handleUpload}
            className="mt-6 w-full bg-gradient-to-r from-gray-900 to-gray-400 text-white py-4 rounded-lg hover:from-gray-800 hover:to-gray-300 transition-all font-medium text-lg"
          >
            Upload Image
          </button>
        )}

        {/* View results button after upload completes */}
        {uploadComplete && (
          <Link
          to={`/records/${imageId}}`}
          className="bg-gradient-to-r from-gray-900 to-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-300"
        >
          View Details
        </Link>
        )}
      </motion.div>
    </div>
  );
};

export default FileUpload;