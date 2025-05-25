
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Calendar, Phone, Mail, Globe, Instagram, Facebook, MessageSquare, Heart, Share2, Award, Users, Clock, Music, Headphones, Mic, Speaker } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { VendorData } from "@/components/vendors/VendorCard";
import { useToast } from "@/hooks/use-toast";

const VendorProfile = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock data for Rhythm Masters Entertainment
  const rhythmMastersData = {
    id: "rhythm-masters",
    name: "Rhythm Masters Entertainment",
    type: "DJ & Entertainment",
    location: "Sydney, NSW",
    rating: 4.9,
    reviewCount: 127,
    price: "$1,200 - $3,500",
    availability: "Available most weekends",
    description: "Premier wedding DJ and entertainment specialists creating unforgettable celebrations across Sydney. With over 8 years of experience, we bring the perfect blend of music, lighting, and atmosphere to make your special day extraordinary.",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    tags: ["Wedding DJ", "MC Services", "Sound & Lighting", "Party Entertainment", "Corporate Events"],
    specialties: ["Wedding Ceremonies", "Reception Entertainment", "Corporate Events", "Birthday Parties"],
    yearsInBusiness: 8,
    servicesOffered: ["DJ Services", "MC/Hosting", "Sound System", "Lighting Design", "Photo Booth", "Music Consultation"]
  };

  useEffect(() => {
    // Simulate loading for Rhythm Masters Entertainment
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
      description: "Perfect for intimate celebrations with essential DJ services",
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
      description: "Our most popular package with enhanced entertainment",
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
      description: "The ultimate entertainment experience for your special day",
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 bg-cover bg-center relative" style={{ backgroundImage: `url(${vendor.imageUrl})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-6 pb-8">
              <div className="text-white">
                <Badge className="mb-3 bg-theme-brown text-white">{vendor.type}</Badge>
                <h1 className="text-4xl md:text-5xl font-serif mb-4">{vendor.name}</h1>
                <div className="flex flex-wrap items-center gap-6 text-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span>{vendor.rating} ({vendor.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    <span>{vendor.yearsInBusiness} years experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-wrap gap-3">
              <Button className="bg-theme-brown hover:bg-theme-brown-dark text-white px-6">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" className="border-theme-brown text-theme-brown hover:bg-theme-cream">
                <Calendar className="h-4 w-4 mr-2" />
                Check Availability
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <section className="bg-white">
              <h2 className="text-2xl font-serif text-theme-brown mb-6">About Rhythm Masters Entertainment</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{vendor.description}</p>
              
              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-theme-cream rounded-lg">
                  <Music className="h-8 w-8 text-theme-brown mx-auto mb-2" />
                  <div className="text-sm font-medium text-theme-brown">Professional DJ</div>
                </div>
                <div className="text-center p-4 bg-theme-cream rounded-lg">
                  <Mic className="h-8 w-8 text-theme-brown mx-auto mb-2" />
                  <div className="text-sm font-medium text-theme-brown">MC Services</div>
                </div>
                <div className="text-center p-4 bg-theme-cream rounded-lg">
                  <Speaker className="h-8 w-8 text-theme-brown mx-auto mb-2" />
                  <div className="text-sm font-medium text-theme-brown">Sound System</div>
                </div>
                <div className="text-center p-4 bg-theme-cream rounded-lg">
                  <Headphones className="h-8 w-8 text-theme-brown mx-auto mb-2" />
                  <div className="text-sm font-medium text-theme-brown">Lighting</div>
                </div>
              </div>

              {/* Services Offered */}
              <div className="mb-6">
                <h3 className="text-xl font-serif text-theme-brown mb-4">Services Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.servicesOffered?.map((service, index) => (
                    <span key={index} className="bg-theme-beige text-theme-brown px-3 py-1 rounded-full text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div>
                <h3 className="text-xl font-serif text-theme-brown mb-4">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.specialties?.map((specialty, index) => (
                    <span key={index} className="bg-theme-brown text-white px-3 py-1 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Portfolio Gallery */}
            <section className="bg-white">
              <h2 className="text-2xl font-serif text-theme-brown mb-6">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolioImages.map((image, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-lg aspect-square">
                    <img 
                      src={image.url} 
                      alt={image.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                      <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm font-medium">{image.caption}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Service Packages */}
            <section className="bg-white">
              <h2 className="text-2xl font-serif text-theme-brown mb-6">Service Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicePackages.map((pkg, index) => (
                  <div key={index} className={`relative border-2 rounded-xl p-6 ${pkg.popular ? 'border-theme-brown bg-theme-cream' : 'border-gray-200 bg-white'} hover:shadow-lg transition-shadow`}>
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-theme-brown text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current" />
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-serif font-semibold text-theme-brown mb-2">{pkg.name}</h3>
                      <div className="text-3xl font-bold text-theme-brown mb-1">{pkg.price}</div>
                      <div className="text-sm text-gray-600">{pkg.duration}</div>
                    </div>
                    
                    <p className="text-gray-700 mb-6 text-center">{pkg.description}</p>
                    
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-theme-brown mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${pkg.popular ? 'bg-theme-brown hover:bg-theme-brown-dark text-white' : 'border-theme-brown text-theme-brown hover:bg-theme-brown hover:text-white'}`}
                      variant={pkg.popular ? "default" : "outline"}
                    >
                      Select Package
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              
              {/* Contact Card */}
              <div className="bg-theme-cream border border-theme-beige rounded-xl p-6">
                <h3 className="text-xl font-serif text-theme-brown mb-4">Get in Touch</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-theme-brown" />
                    <span className="text-gray-700">0412 345 678</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-theme-brown" />
                    <span className="text-gray-700">info@rhythmmasters.com.au</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-theme-brown" />
                    <span className="text-gray-700">www.rhythmmasters.com.au</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Instagram className="h-5 w-5 text-theme-brown" />
                    <span className="text-gray-700">@rhythmmastersent</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full bg-theme-brown hover:bg-theme-brown-dark text-white">
                    <Calendar className="h-4 w-4 mr-2" />
                    Check Availability
                  </Button>
                  <Button variant="outline" className="w-full border-theme-brown text-theme-brown hover:bg-theme-brown hover:text-white">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-serif text-theme-brown mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-medium text-theme-brown">Within 2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Events Completed</span>
                    <span className="font-medium text-theme-brown">200+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Years Experience</span>
                    <span className="font-medium text-theme-brown">{vendor.yearsInBusiness} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Area</span>
                    <span className="font-medium text-theme-brown">50km radius</span>
                  </div>
                </div>
              </div>

              {/* Reviews Summary */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-serif text-theme-brown mb-4">Reviews</h3>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-theme-brown mb-1">{vendor.rating}</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-gray-600">{vendor.reviewCount} reviews</div>
                </div>
                <Button variant="outline" className="w-full border-theme-brown text-theme-brown hover:bg-theme-brown hover:text-white">
                  Read All Reviews
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VendorProfile;
