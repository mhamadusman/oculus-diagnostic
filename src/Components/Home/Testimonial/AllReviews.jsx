import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import { reviewService } from '../../../Services/api'; // Adjust path as needed

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        setLoading(true);
        const data = await reviewService.getReviews();
        setReviews(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load reviews. Please try again later.');
        setLoading(false);
        console.error('Error fetching reviews:', err);
      }
    };

    fetchAllReviews();
  }, []);

  // Format review data for testimonial cards (same as in Testimonials component)
  const formatReviewForTestimonial = (review) => {
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
        <p>Loading reviews...</p>
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
          <h2 className="text-3xl font-bold text-gray-900">All Reviews</h2>
          <p className="mt-4 text-xl text-gray-600">See what our users have to say</p>
        </div>
        
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <TestimonialCard
                key={review.id || index}
                {...formatReviewForTestimonial(review)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;