import React, { useState, useRef } from 'react';
import { Image as ImageIcon, UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
      simulateUpload();
    };
    reader.readAsDataURL(file);
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadComplete(true);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className=" lg:mt-14 min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div 
          className="absolute inset-0 bg-repeat bg-[length:20px_20px]" 
          style={{backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)"}}
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
          <p className="text-gray-600 mt-2">Image formate must be .JPG or .PNG</p>
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
                Select X-Ray Image
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-400 rounded-lg overflow-hidden h-80 relative group">
              <img 
                src={previewUrl} 
                alt="X-Ray preview" 
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-gradient-to-r from-gray-900 to-gray-400 text-white px-6 py-3 rounded-lg font-medium">
                  Change Image
                </button>
              </div>
            </div>
          )}

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-6">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-gray-900 to-gray-400 transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-center mt-2 text-gray-700">{`Processing: ${uploadProgress}%`}</p>
            </div>
          )}
        </div>

        {uploadComplete && (
          <button
            onClick={() => navigate('/result')}
            className="mt-6 w-full bg-gradient-to-r from-gray-900 to-gray-400 text-white py-4 rounded-lg hover:from-gray-800 hover:to-gray-300 transition-all font-medium text-lg"
          >
            View Analysis Results
          </button>
        )}

       
      </motion.div>
    </div>
  );
};

export default FileUpload;