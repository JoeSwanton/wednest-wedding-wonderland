
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star, Heart, Share2, Award, Users, Clock, Music, Headphones, Mic, Speaker, Calendar as CalendarIcon, Phone, Mail, Globe, Instagram, CheckCircle, Shield, Zap, Camera, Volume2 } from "lucide-react";
import { VendorData } from "@/components/vendors/VendorCard";
import { useToast } from "@/hooks/use-toast";

const VendorProfile = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showAllPhotos, setShowAllPhotos] = useState(false);
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
      comment: "Absolutely magical venue! The harbour views were stunning and Sarah was incredible to work with. Every detail was perfect and our guests are still talking about how beautiful everything was. Highly recommend!",
      helpful: 16
    },
    {
      id: 2,
      name: "Jessica & David",
      date: "September 2023",
      rating: 5,
      comment: "We eloped here with the most beautiful gardens and harbour views. The staff were professional and accommodating. The photos turned out amazing with all the gorgeous backdrops. Worth every penny!",
      helpful: 12
    },
    {
      id: 3,
      name: "Sophie & Michael",
      date: "August 2023",
      rating: 5,
      comment: "Beautiful venue with great facilities. The only minor issue was some noise from nearby boats during the ceremony, but overall it was a wonderful day. The sunset photos were incredible!",
      helpful: 8
    }
  ];

  const amenities = [
    { icon: Music, label: "Professional DJ Equipment" },
    { icon: Mic, label: "Wireless Microphones" },
    { icon: Speaker, label: "Premium Sound System" },
    { icon: Headphones, label: "DJ Monitoring" },
    { icon: Zap, label: "Professional Lighting" },
    { icon: Camera, label: "Photo Booth Available" },
    { icon: Volume2, label: "MC Services" },
    { icon: CheckCircle, label: "Backup Equipment" }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setVendor(rhythmMastersData as any);
      setLoading(false);
    }, 500);
  }, [vendorId]);

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
      
      {/* Hero Image Gallery */}
      <div className="relative">
        <div className="grid grid-cols-4 gap-2 h-96">
          <div className="col-span-2 relative overflow-hidden rounded-l-xl">
            <img 
              src={portfolioImages[0].url} 
              alt="Main venue image"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="grid grid-rows-2 gap-2">
            <div className="relative overflow-hidden">
              <img 
                src={portfolioImages[1].url} 
                alt="Venue image 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative overflow-hidden">
              <img 
                src={portfolioImages[2].url} 
                alt="Venue image 3"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="grid grid-rows-2 gap-2">
            <div className="relative overflow-hidden">
              <img 
                src={portfolioImages[3].url} 
                alt="Venue image 4"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative overflow-hidden rounded-r-xl">
              <img 
                src={portfolioImages[4].url} 
                alt="Venue image 5"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Button 
                  variant="outline" 
                  className="bg-white text-black hover:bg-gray-100"
                  onClick={() => setShowAllPhotos(true)}
                >
                  +2 photos
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="absolute bottom-4 right-4 bg-white hover:bg-gray-100"
          onClick={() => setShowAllPhotos(true)}
        >
          Show all photos
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-theme-brown text-white">{vendor.type}</Badge>
                    {vendor.verified_vendor && (
                      <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl font-serif text-theme-brown">{vendor.name}</h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{vendor.rating}</span>
                      <span>({vendor.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{vendor.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      <span>{vendor.yearsInBusiness} years experience</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
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
                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
              />
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-theme-brown">About this vendor</h2>
              <p className="text-gray-700 text-lg leading-relaxed">Premier wedding DJ and entertainment specialists creating unforgettable celebrations across Sydney. With over 8 years of experience, we bring the perfect blend of music, lighting, and atmosphere to make your special day extraordinary.</p>
              
              {/* What this vendor offers */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-theme-brown">What this vendor offers</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <amenity.icon className="h-5 w-5 text-theme-brown" />
                      <span className="text-sm text-gray-700">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Service Packages */}
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-theme-brown">Packages & Pricing</h2>
              <div className="space-y-4">
                {servicePackages.map((pkg, index) => (
                  <Card key={index} className={`${pkg.popular ? 'border-theme-brown border-2' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-serif text-theme-brown">{pkg.name}</h3>
                            {pkg.popular && (
                              <Badge className="bg-theme-brown text-white">Most Popular</Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-4">{pkg.description}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {pkg.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right ml-6">
                          <div className="text-2xl font-bold text-theme-brown">{pkg.price}</div>
                          <div className="text-sm text-gray-500">{pkg.duration}</div>
                          <Button className="mt-4 bg-theme-brown hover:bg-theme-brown-dark">
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

            {/* Reviews Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif text-theme-brown">
                  <Star className="inline h-6 w-6 fill-yellow-400 text-yellow-400 mr-2" />
                  {vendor.rating} · {vendor.reviewCount} reviews
                </h2>
              </div>
              
              {/* Review Stats */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
                {[
                  { label: "Location", rating: 4.9 },
                  { label: "Value", rating: 4.8 },
                  { label: "Communication", rating: 5.0 },
                  { label: "Service", rating: 4.7 },
                  { label: "Overall Experience", rating: 4.9 },
                  { label: "Cleanliness", rating: 4.8 }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm text-gray-600">{stat.label}</div>
                    <div className="font-medium">{stat.rating}</div>
                  </div>
                ))}
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-theme-brown rounded-full flex items-center justify-center text-white font-medium">
                        {review.name.split(' ')[0][0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{review.name}</span>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-gray-500 text-sm">{review.date}</span>
                        </div>
                        <p className="text-gray-700 mb-2">{review.comment}</p>
                        <div className="text-sm text-gray-500">
                          Helpful ({review.helpful})
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full">
                Show all {vendor.reviewCount} reviews
              </Button>
            </div>
          </div>

          {/* Right Column - Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card className="border-2 border-gray-200 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-theme-brown">{vendor.price.split(' - ')[0]}</div>
                      <div className="text-sm text-gray-500">starting from</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{vendor.rating}</span>
                      </div>
                      <div className="text-sm text-gray-500">({vendor.reviewCount} reviews)</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Event Details */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Event Date</label>
                      <div className="mt-1 p-3 border rounded-lg bg-gray-50">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700">Number of Guests</label>
                      <select className="mt-1 w-full p-3 border rounded-lg">
                        <option>100 guests</option>
                        <option>50-100 guests</option>
                        <option>100-200 guests</option>
                        <option>200+ guests</option>
                      </select>
                    </div>
                  </div>

                  {/* Availability Status */}
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Quick Response</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">Usually responds within 4 hours</p>
                  </div>

                  {/* Verification Badge */}
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Shield className="h-4 w-4" />
                      <span className="font-medium">Verified Vendor</span>
                    </div>
                    <p className="text-sm text-blue-600 mt-1">Licensed and verified by Enosi</p>
                  </div>

                  {/* Super Vendor Badge */}
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 text-yellow-700">
                      <Award className="h-4 w-4" />
                      <span className="font-medium">Super Vendor</span>
                    </div>
                    <p className="text-sm text-yellow-600 mt-1">Top-rated with excellent reviews</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full bg-theme-brown hover:bg-theme-brown-dark text-white py-3">
                      Check Availability
                    </Button>
                    <Button variant="outline" className="w-full border-theme-brown text-theme-brown hover:bg-theme-brown hover:text-white py-3">
                      Save to Favourites
                    </Button>
                    <Button variant="outline" className="w-full py-3">
                      Share
                    </Button>
                  </div>

                  {/* Contact Information */}
                  <Separator />
                  <div className="space-y-3">
                    <h3 className="font-medium text-theme-brown">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>04 1976 5432</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>events@harborviewgardens.com.au</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <span>harborviewgardens.com.au</span>
                      </div>
                    </div>
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
