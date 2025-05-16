
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Calendar, Phone, Mail, Globe, Instagram, Facebook } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { VendorData } from "@/components/vendors/VendorCard";
import { useToast } from "@/hooks/use-toast";

const VendorProfile = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [portfolioImages, setPortfolioImages] = useState<Array<{url: string, caption: string}>>([]);
  const [vendorPackages, setVendorPackages] = useState<Array<{name: string, priceRange: string, description: string, features: string[]}>>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, this would fetch from the API
        // For now, we'll use the mock data based on ID
        const { mockBusinesses } = await import("@/data/mockVendors");
        const foundVendor = mockBusinesses.find(v => v.id.toString() === vendorId);
        
        if (foundVendor) {
          setVendor(foundVendor);
          
          // For demo purposes - in real implementation, these would come from Supabase
          // Mock portfolio images
          setPortfolioImages([
            { url: foundVendor.imageUrl, caption: "Portfolio image 1" },
            { url: foundVendor.imageUrl, caption: "Portfolio image 2" },
            { url: foundVendor.imageUrl, caption: "Portfolio image 3" }
          ]);
          
          // Mock service packages
          setVendorPackages([
            { 
              name: "Basic Package", 
              priceRange: "$500-$1000", 
              description: "Our starter package for those on a budget", 
              features: ["Feature 1", "Feature 2", "Feature 3"]
            },
            { 
              name: "Premium Package", 
              priceRange: "$1000-$2500", 
              description: "Our most popular comprehensive package", 
              features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"]
            }
          ]);
        } else {
          toast({
            title: "Vendor not found",
            description: "We couldn't find the vendor you're looking for",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error fetching vendor details:", error);
        toast({
          title: "Error",
          description: "Failed to load vendor details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (vendorId) {
      fetchVendorDetails();
    }
  }, [vendorId, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-12">
          <div className="animate-pulse flex flex-col space-y-8">
            <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
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
            <h2 className="text-2xl font-serif text-wednest-brown mb-4">
              Vendor Not Found
            </h2>
            <p className="text-wednest-brown-light mb-6">
              We couldn't find the vendor you're looking for. They may have been removed or the URL might be incorrect.
            </p>
            <Button 
              onClick={() => window.history.back()}
              className="bg-wednest-sage text-white hover:bg-wednest-sage/90"
            >
              Go Back to Vendors
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-64 md:h-96 bg-cover bg-center" style={{ backgroundImage: `url(${vendor.imageUrl})` }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container mx-auto h-full flex items-end">
            <div className="p-6 md:p-12 text-white relative z-10">
              <Badge 
                variant="secondary"
                className="mb-4 bg-wednest-sage text-white hover:bg-wednest-sage border-none"
              >
                {vendor.type}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-serif mb-2">{vendor.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{vendor.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 mr-1 fill-wednest-gold text-wednest-gold" />
                  <span>{vendor.rating} Rating</span>
                </div>
                <div className="hidden md:flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Available {vendor.availability}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6 shadow-sm mb-8 border border-wednest-beige">
                <h2 className="text-2xl font-serif text-wednest-brown mb-4">About {vendor.name}</h2>
                <p className="text-wednest-brown-light mb-6">{vendor.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="border-l-2 border-wednest-sage pl-3">
                    <div className="text-xs text-wednest-brown-light">Average Price</div>
                    <div className="text-wednest-brown font-semibold">{vendor.price}</div>
                  </div>
                  <div className="border-l-2 border-wednest-sage pl-3">
                    <div className="text-xs text-wednest-brown-light">Availability</div>
                    <div className="text-wednest-brown font-semibold">{vendor.availability}</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {vendor.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="rounded-md bg-wednest-cream text-wednest-brown-light hover:bg-wednest-beige"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Portfolio Images */}
              <div className="bg-white rounded-lg p-6 shadow-sm mb-8 border border-wednest-beige">
                <h2 className="text-2xl font-serif text-wednest-brown mb-4">Portfolio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {portfolioImages.map((image, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden h-48">
                      <img 
                        src={image.url} 
                        alt={image.caption || `Portfolio image ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      {image.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
                          {image.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Service Packages */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-wednest-beige">
                <h2 className="text-2xl font-serif text-wednest-brown mb-4">Service Packages</h2>
                <div className="space-y-6">
                  {vendorPackages.map((pkg, index) => (
                    <div key={index} className="border border-wednest-beige rounded-lg p-4 hover:border-wednest-sage transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-wednest-brown">{pkg.name}</h3>
                        <span className="text-wednest-sage font-semibold">{pkg.priceRange}</span>
                      </div>
                      <p className="text-sm text-wednest-brown-light mb-3">{pkg.description}</p>
                      <div className="space-y-1">
                        {pkg.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-2 text-sm">
                            <div className="w-1 h-1 rounded-full bg-wednest-sage mt-2"></div>
                            <span className="text-wednest-brown-light">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Info & Call to Action */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm mb-8 border border-wednest-beige sticky top-24">
                <h3 className="text-xl font-serif text-wednest-brown mb-4">Contact Information</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-wednest-sage" />
                    <span className="text-wednest-brown-light">0412 345 678</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-wednest-sage" />
                    <span className="text-wednest-brown-light">info@{vendor.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-wednest-sage" />
                    <span className="text-wednest-brown-light">www.{vendor.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Instagram className="h-5 w-5 text-wednest-sage" />
                    <span className="text-wednest-brown-light">@{vendor.name.toLowerCase().replace(/\s+/g, '')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Facebook className="h-5 w-5 text-wednest-sage" />
                    <span className="text-wednest-brown-light">{vendor.name}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-wednest-sage text-white hover:bg-wednest-sage/90 mb-3"
                >
                  Request a Quote
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-wednest-sage text-wednest-sage hover:bg-wednest-cream"
                >
                  Send a Message
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
