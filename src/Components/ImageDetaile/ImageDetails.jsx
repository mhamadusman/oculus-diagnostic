// src/components/ImageDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { octImageService } from '../../Services/api'; // Adjust path
import ReviewSection from '../../Components/ReviewSection/ReviewSection';


const ImageDetails = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch image details when the component mounts or id changes
  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const data = await octImageService.getImageById(id);
        setImage(data);
      } catch (err) {
        setError('Failed to fetch image details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchImageDetails();
  }, [id]);

  // Render loading, error, or image details
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><p>Loading...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><p className="text-red-500">{error}</p></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Image Details</h2>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Image and Basic Info */}
            <div>
              <img
                src={image.image_file}
                alt="OCT Image"
                className="w-full h-auto rounded-lg shadow-sm mb-4"
              />
              <p className="text-sm text-gray-600"><strong>ID:</strong> {image.id}</p>
              <p className="text-sm text-gray-600"><strong>Custom ID:</strong> {image.custom_id || 'N/A'}</p>
              <p className="text-sm text-gray-600"><strong>Upload Date:</strong> {image.upload_date}</p>
              <p className="text-sm text-gray-600">
                <strong>Doctor:</strong> {image.doctor?.user?.first_name || 'Unknown'} {image.doctor?.user?.last_name || ''}
              </p>
            </div>
            {/* Right Column: Analysis Result and Reviews */}
            {image.analysis_result && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Analysis Report</h3>
                <p className="text-sm text-gray-600"><strong>Classification:</strong> {image.analysis_result.classification || 'N/A'}</p>
                <p className="text-sm text-gray-600"><strong>Findings:</strong> {image.analysis_result.findings || 'N/A'}</p>
                <p className="text-sm text-gray-600"><strong>Analysis Date:</strong> {image.analysis_result.analysis_date || 'N/A'}</p>
                {image.analysis_result.analysis_image && (
                  <img
                    src={image.analysis_result.analysis_image}
                    alt="Processed Image"
                    className="w-full h-auto rounded-lg shadow-sm mt-4"
                  />
                )}
                <ReviewSection analysisResultId={image.analysis_result.id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;