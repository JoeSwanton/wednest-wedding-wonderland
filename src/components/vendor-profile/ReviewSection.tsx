
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";

interface ReviewSectionProps {
  vendor: any;
}

const ReviewSection = ({ vendor }: ReviewSectionProps) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const allReviews = [
    {
      id: 1,
      name: "Emma & James",
      date: "October 2023",
      rating: 5,
      comment: "Absolutely incredible DJ service! The music was perfect and kept everyone dancing all night. The sound quality was crystal clear and the lighting created such an amazing atmosphere. Highly recommend for any wedding!",
      helpful: 16,
      avatar: "E"
    },
    {
      id: 2,
      name: "Jessica & David",
      date: "September 2023",
      rating: 5,
      comment: "Professional, punctual, and absolutely fantastic. They read the crowd perfectly and adjusted the music throughout the night. The MC services were top-notch and helped our reception flow seamlessly.",
      helpful: 12,
      avatar: "J"
    },
    {
      id: 3,
      name: "Sophie & Michael",
      date: "August 2023",
      rating: 5,
      comment: "Best decision we made for our wedding! The team was incredibly organized and the equipment was top quality. They even helped coordinate our special moments. Worth every penny!",
      helpful: 8,
      avatar: "S"
    },
    {
      id: 4,
      name: "Rachel & Tom",
      date: "July 2023",
      rating: 5,
      comment: "Amazing service from start to finish! Great communication throughout the planning process and flawless execution on the day. Everyone was raving about the music selection.",
      helpful: 14,
      avatar: "R"
    },
    {
      id: 5,
      name: "Lisa & Mark",
      date: "June 2023",
      rating: 4,
      comment: "Really good DJ service. Music was great and they were very professional. Only minor issue was the setup took a bit longer than expected, but overall very happy.",
      helpful: 6,
      avatar: "L"
    },
    {
      id: 6,
      name: "Amy & Chris",
      date: "May 2023",
      rating: 5,
      comment: "Exceeded all our expectations! The lighting effects were stunning and the music kept the dance floor packed all night. Highly professional team.",
      helpful: 9,
      avatar: "A"
    }
  ];

  const displayedReviews = showAllReviews ? allReviews : allReviews.slice(0, 3);

  const handleShowMoreReviews = () => {
    setShowAllReviews(true);
  };

  return (
    <div className="space-y-8" id="reviews-section">
      <div>
        <h2 className="text-2xl font-serif text-theme-text-primary mb-6">
          <Star className="inline h-6 w-6 fill-black text-black mr-2" />
          {vendor.rating} · {vendor.reviewCount} reviews
        </h2>
      </div>
      
      {/* Review Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { label: "Professionalism", rating: 4.9 },
          { label: "Music Quality", rating: 5.0 },
          { label: "Equipment", rating: 4.8 },
          { label: "Communication", rating: 4.9 },
          { label: "Value for Money", rating: 4.7 },
          { label: "Overall Experience", rating: 4.9 }
        ].map((category, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-theme-text-secondary">{category.label}</span>
              <span className="text-sm font-medium">{category.rating}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-theme-brown h-1 rounded-full" 
                style={{ width: `${(category.rating / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider between categories and reviews */}
      <Separator />

      {/* Individual Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayedReviews.map((review) => (
          <div key={review.id} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-theme-brown rounded-full flex items-center justify-center text-white font-medium">
                {review.avatar}
              </div>
              <div>
                <div className="font-medium text-theme-text-primary">{review.name}</div>
                <div className="text-sm text-theme-text-secondary">{review.date}</div>
              </div>
            </div>
            <div className="flex mb-2">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-theme-brown text-theme-brown" />
              ))}
            </div>
            <p className="text-theme-text-secondary text-sm leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
      
      {!showAllReviews && (
        <Button 
          variant="outline" 
          className="border-theme-brown text-theme-brown hover:bg-gray-50"
          onClick={handleShowMoreReviews}
        >
          Show all {vendor.reviewCount} reviews
        </Button>
      )}
    </div>
  );
};

export default ReviewSection;
