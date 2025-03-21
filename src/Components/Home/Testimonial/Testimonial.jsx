import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TestimonialCard from './TestimonialCard';
import { reviewService } from '../../../Services/api'; // Adjust path as needed

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await reviewService.getReviews();
        setReviews(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load testimonials. Please try again later.');
        setLoading(false);
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, []);

  // Format review data for testimonial cards
  const formatReviewForTestimonial = (review) => {
    // Extract user info from the review
    // This assumes your review object contains doctor/user information
    // Adjust according to your actual API response structure
    console.log("review are : " , reviews);

    const doctor = review.doctor || {};
    const user = doctor.user || {};
    
    return {
      profileImage: doctor.profile_picture || null,
      comment: review.comments,
      name: `${doctor.first_name || ''} ${doctor.last_name || ''}`,
      position: doctor.role || 'Doctor',
      company: doctor.hospital || 'Hospital',
      rating: review.rating || 5
    };
  };

  if (loading) {
    return (
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <p>Loading testimonials...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
          <p className="mt-4 text-xl text-gray-600">Trusted by doctors worldwide</p>
        </div>
        
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews available yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.slice(0, 3).map((review, index) => (
                <TestimonialCard
                  key={review.id || index}
                  {...formatReviewForTestimonial(review)}
                />
              ))}
            </div>
            
            {reviews.length > 3 && (
              <div className="text-center mt-10">
                <Link 
                  to="/allreviews" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  See All Reviews
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Testimonial;