
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { VendorData } from "@/components/vendors/VendorCard";

// Import the new components
import PhotoGallery from "@/components/vendor-profile/PhotoGallery";
import VendorHeader from "@/components/vendor-profile/VendorHeader";
import VendorAmenities from "@/components/vendor-profile/VendorAmenities";
import ServicePackages from "@/components/vendor-profile/ServicePackages";
import ReviewSection from "@/components/vendor-profile/ReviewSection";
import BookingCard from "@/components/vendor-profile/BookingCard";

const VendorProfile = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);

  // Enhanced mock data for Rhythm Masters Entertainment
  const rhythmMastersData = {
    id: 1,
    type: "DJ & Entertainment",
    name: "Rhythm Masters Entertainment",
    location: "Sydney, NSW",
    rating: 4.9,
    reviewCount: 127,
    price: "$1,200 - $3,500",
    availability: "Available most weekends",
    description: "Premier wedding DJ and entertainment specialists creating unforgettable celebrations across Sydney. With over 8 years of experience, we bring the perfect blend of music, lighting, and atmosphere to make your special day extraordinary.",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    tags: ["Wedding DJ", "MC Services", "Sound & Lighting", "Party Entertainment"],
    specialties: ["Wedding Ceremonies", "Reception Entertainment", "Corporate Events", "Birthday Parties"],
    yearsInBusiness: 8,
    servicesOffered: ["DJ Services", "MC Services", "Sound System", "Lighting Design", "Photo Booth", "Music Consultation"],
    verified_vendor: true
  };

  const portfolioImages = [
    { url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80", caption: "Wedding Reception Setup" },
    { url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80", caption: "DJ Booth & Lighting" },
    { url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=800&q=80", caption: "Dance Floor Action" },
    { url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80", caption: "Sound System Setup" },
    { url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80", caption: "Outdoor Event" },
    { url: "https://images.unsplash.com/photo-1571609830506-5c7b46df1eaa?auto=format&fit=crop&w=800&q=80", caption: "Corporate Event" }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setVendor(rhythmMastersData as any);
      setLoading(false);
    }, 500);
  }, [vendorId]);

  const handleReviewCountClick = () => {
    // Scroll to reviews section
    const reviewsSection = document.getElementById('reviews-section');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-theme-brown border-t-transparent rounded-full"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h2 className="text-2xl font-serif text-theme-brown mb-4">Vendor Not Found</h2>
            <p className="text-theme-gray-dark mb-6">We couldn't find the vendor you're looking for.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <VendorHeader vendor={vendor} onReviewCountClick={handleReviewCountClick} />
      
      <PhotoGallery images={portfolioImages} />

      {/* Main Content - Airbnb Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            <VendorAmenities vendor={vendor} />

            <Separator />

            <ServicePackages />

            <Separator />

            <ReviewSection vendor={vendor} />
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <BookingCard vendor={vendor} onReviewCountClick={handleReviewCountClick} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VendorProfile;
