
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star, Heart, Share2, Award, Users, Clock, Music, Headphones, Mic, Speaker, Calendar as CalendarIcon, Phone, Mail, Globe, Instagram, CheckCircle, Shield, Zap, Camera, Volume2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { VendorData } from "@/components/vendors/VendorCard";
import { useToast } from "@/hooks/use-toast";

const VendorProfile = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

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
    servicesOffered: ["DJ Services", "MC/Hosting", "Sound System", "Lighting Design", "Photo Booth", "Music Consultation"],
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

  const servicePackages = [
    {
      name: "Essential Package",
      price: "$1,200",
      duration: "5 hours",
      description: "Perfect for intimate celebrations",
      features: [
        "Professional DJ for 5 hours",
        "Basic sound system",
        "Microphone for speeches",
        "Music consultation",
        "Basic lighting"
      ],
      popular: false
    },
    {
      name: "Premium Package",
      price: "$2,200",
      duration: "7 hours",
      description: "Our most popular package",
      features: [
        "Professional DJ for 7 hours",
        "Premium sound system",
        "Wireless microphones",
        "MC services",
        "Enhanced lighting package",
        "Music consultation & playlist",
        "First dance coordination"
      ],
      popular: true
    },
    {
      name: "Luxury Experience",
      price: "$3,500",
      duration: "8 hours",
      description: "The ultimate entertainment experience",
      features: [
        "Professional DJ for 8 hours",
        "Premium sound & lighting",
        "Multiple wireless microphones",
        "Professional MC services",
        "Dance floor lighting",
        "Photo booth setup",
        "Custom playlist creation",
        "Ceremony sound setup"
      ],
      popular: false
    }
  ];

  const reviews = [
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
    }
  ];

  const amenities = [
    { icon: Music, label: "Professional DJ Equipment", description: "High-end mixing decks and controllers" },
    { icon: Mic, label: "Wireless Microphones", description: "Multiple wireless mic systems" },
    { icon: Speaker, label: "Premium Sound System", description: "Crystal clear audio for any venue size" },
    { icon: Zap, label: "Professional Lighting", description: "Dynamic lighting design and effects" },
    { icon: Camera, label: "Photo Booth Available", description: "Interactive photo booth setup" },
    { icon: Volume2, label: "MC Services", description: "Professional event hosting" },
    { icon: CheckCircle, label: "Backup Equipment", description: "Full backup systems for reliability" },
    { icon: Shield, label: "Fully Insured", description: "Comprehensive public liability coverage" }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setVendor(rhythmMastersData as any);
      setLoading(false);
    }, 500);
  }, [vendorId]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % portfolioImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + portfolioImages.length) % portfolioImages.length);
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
            <Button onClick={() => window.history.back()} className="bg-theme-brown text-white hover:bg-theme-brown-dark">
              Go Back to Vendors
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Image Gallery - Airbnb Style */}
      <div className="relative max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-4 gap-2 h-[400px] rounded-xl overflow-hidden">
          <div className="col-span-2 relative">
            <img 
              src={portfolioImages[0].url} 
              alt="Main venue image"
              className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
            />
          </div>
          <div className="grid grid-rows-2 gap-2">
            <img 
              src={portfolioImages[1].url} 
              alt="Venue image 2"
              className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
            />
            <img 
              src={portfolioImages[2].url} 
              alt="Venue image 3"
              className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
            />
          </div>
          <div className="grid grid-rows-2 gap-2">
            <img 
              src={portfolioImages[3].url} 
              alt="Venue image 4"
              className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
            />
            <div className="relative">
              <img 
                src={portfolioImages[4].url} 
                alt="Venue image 5"
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer hover:bg-opacity-40 transition-all"
                onClick={() => setShowAllPhotos(true)}
              >
                <Button variant="outline" className="bg-white text-black hover:bg-gray-100">
                  Show all photos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl mx-auto p-4">
            <button 
              onClick={() => setShowAllPhotos(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="relative">
              <img 
                src={portfolioImages[currentImageIndex].url}
                alt={portfolioImages[currentImageIndex].caption}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full hover:bg-gray-100"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
                {portfolioImages[currentImageIndex].caption} ({currentImageIndex + 1} of {portfolioImages.length})
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Airbnb Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header Section - Airbnb Style */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <h1 className="text-3xl font-normal text-gray-900">{vendor.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-black text-black" />
                      <span className="font-medium text-black">{vendor.rating}</span>
                      <span className="underline">({vendor.reviewCount} reviews)</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="underline">{vendor.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified Vendor
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                      <Award className="h-3 w-3 mr-1" />
                      Super Vendor
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button variant="ghost" className="text-gray-700 hover:bg-gray-100">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="ghost" className="text-gray-700 hover:bg-gray-100">
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Vendor Profile Image */}
            <div className="w-full">
              <img 
                src="/lovable-uploads/0b425f13-91ab-40a4-b531-432a9f4a7c2b.png"
                alt="Rhythm Masters Entertainment Profile"
                className="w-full max-w-4xl mx-auto rounded-xl shadow-sm"
              />
            </div>

            {/* About Section - Airbnb Style */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-normal text-gray-900">About this vendor</h2>
                <p className="text-gray-700 text-base leading-relaxed">
                  Premier wedding DJ and entertainment specialists creating unforgettable celebrations across Sydney. With over 8 years of experience, we bring the perfect blend of music, lighting, and atmosphere to make your special day extraordinary.
                </p>
              </div>
              
              {/* Host Info - Airbnb Style */}
              <div className="flex items-center gap-4 p-6 border border-gray-200 rounded-xl">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  RM
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Hosted by Rhythm Masters</h3>
                  <p className="text-sm text-gray-600">{vendor.yearsInBusiness} years hosting events • 200+ events completed</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-700">{vendor.reviewCount} reviews</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-700">Identity verified</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* What this vendor offers - Grid Style */}
            <div className="space-y-6">
              <h2 className="text-2xl font-normal text-gray-900">What this vendor offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <amenity.icon className="h-6 w-6 text-gray-700 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">{amenity.label}</h3>
                      <p className="text-sm text-gray-600">{amenity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Service Packages - Cards Style */}
            <div className="space-y-6">
              <h2 className="text-2xl font-normal text-gray-900">Service packages</h2>
              <div className="grid grid-cols-1 gap-6">
                {servicePackages.map((pkg, index) => (
                  <Card key={index} className={`border-2 transition-all hover:shadow-lg ${pkg.popular ? 'border-black' : 'border-gray-200'}`}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl font-medium text-gray-900">{pkg.name}</h3>
                            {pkg.popular && (
                              <Badge className="bg-black text-white">Most Popular</Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-4">{pkg.description}</p>
                          <div className="space-y-2">
                            {pkg.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right ml-8">
                          <div className="text-2xl font-semibold text-gray-900">{pkg.price}</div>
                          <div className="text-sm text-gray-500 mb-4">{pkg.duration}</div>
                          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-2">
                            Select Package
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Reviews Section - Airbnb Style */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-normal text-gray-900 mb-6">
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
                      <span className="text-sm text-gray-700">{category.label}</span>
                      <span className="text-sm font-medium">{category.rating}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-black h-1 rounded-full" 
                        style={{ width: `${(category.rating / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Individual Reviews */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map((review) => (
                  <div key={review.id} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white font-medium">
                        {review.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{review.name}</div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-black text-black" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="border-black text-black hover:bg-gray-50">
                Show all {vendor.reviewCount} reviews
              </Button>
            </div>
          </div>

          {/* Right Column - Booking Card - Airbnb Style */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card className="border border-gray-300 shadow-xl rounded-xl overflow-hidden">
                <CardContent className="p-6 space-y-6">
                  {/* Price Section */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-semibold text-gray-900">{vendor.price.split(' - ')[0]}</span>
                      <span className="text-gray-600">starting from</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-black text-black" />
                        <span className="font-medium">{vendor.rating}</span>
                      </div>
                      <span className="text-gray-500">·</span>
                      <span className="text-sm text-gray-500 underline">({vendor.reviewCount} reviews)</span>
                    </div>
                  </div>

                  {/* Booking Form */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-2 border border-gray-300 rounded-lg overflow-hidden">
                      <div className="p-3 border-b border-gray-300">
                        <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Event Date</label>
                        <div className="text-sm text-gray-900">Add date</div>
                      </div>
                      <div className="p-3">
                        <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Guests</label>
                        <div className="text-sm text-gray-900">Add guest count</div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 text-base font-medium">
                      Check availability
                    </Button>

                    <p className="text-center text-sm text-gray-500">You won't be charged yet</p>
                  </div>

                  <Separator />

                  {/* Pricing Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700 underline">$1,200 x 1 day</span>
                      <span className="text-gray-900">$1,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 underline">Service fee</span>
                      <span className="text-gray-900">$150</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">$1,350</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Vendor Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        RM
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Rhythm Masters</div>
                        <div className="text-sm text-gray-500">Super Vendor</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="font-medium text-gray-900">{vendor.reviewCount}</div>
                        <div className="text-xs text-gray-500">Reviews</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{vendor.rating}</div>
                        <div className="text-xs text-gray-500">Rating</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{vendor.yearsInBusiness}</div>
                        <div className="text-xs text-gray-500">Years</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Usually responds within 2 hours</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <span>Verified vendor</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Award className="h-4 w-4 text-purple-500" />
                        <span>Super Vendor status</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="border-black text-black hover:bg-gray-50">
                      Message
                    </Button>
                    <Button variant="outline" className="border-black text-black hover:bg-gray-50">
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VendorProfile;
