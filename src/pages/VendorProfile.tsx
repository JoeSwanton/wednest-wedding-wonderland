
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Calendar, Phone, Mail, Globe, Instagram, Facebook, MessageSquare, ChevronRight, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { VendorData } from "@/components/vendors/VendorCard";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const VendorProfile = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [portfolioImages, setPortfolioImages] = useState<Array<{url: string, caption: string, category?: string}>>([]);
  const [vendorPackages, setVendorPackages] = useState<Array<{name: string, priceRange: string, description: string, features: string[], isPopular?: boolean, isBudgetFriendly?: boolean}>>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        setLoading(true);
        
        const { mockBusinesses } = await import("@/data/mockVendors");
        const foundVendor = mockBusinesses.find(v => v.id.toString() === vendorId);
        
        if (foundVendor) {
          setVendor(foundVendor);
          
          setPortfolioImages([
            { url: foundVendor.imageUrl, caption: "Ceremony Setup", category: "Ceremony" },
            { url: foundVendor.imageUrl, caption: "Reception Decor", category: "Reception" },
            { url: foundVendor.imageUrl, caption: "Dance Floor", category: "Entertainment" },
            { url: foundVendor.imageUrl, caption: "Bridal Suite", category: "Preparation" },
            { url: foundVendor.imageUrl, caption: "Cocktail Hour", category: "Reception" },
            { url: foundVendor.imageUrl, caption: "Outdoor Setup", category: "Ceremony" }
          ]);
          
          setVendorPackages([
            { 
              name: "Essential Package", 
              priceRange: "$800-$1,500", 
              description: "Perfect for intimate celebrations with essential services", 
              features: ["4-hour coverage", "Basic setup", "Standard equipment", "Email support"],
              isBudgetFriendly: true
            },
            { 
              name: "Premium Package", 
              priceRange: "$2,000-$4,000", 
              description: "Our most popular comprehensive package for memorable celebrations", 
              features: ["8-hour coverage", "Premium setup & decor", "Professional equipment", "Dedicated coordinator", "Custom playlist", "Lighting package"],
              isPopular: true
            },
            { 
              name: "Luxury Experience", 
              priceRange: "$4,500-$8,000", 
              description: "The ultimate wedding experience with exclusive premium services", 
              features: ["12-hour coverage", "Luxury setup & styling", "High-end equipment", "Personal wedding coordinator", "Custom entertainment", "Premium lighting & effects", "Complimentary consultation"]
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
            <h2 className="text-2xl font-serif text-theme-brown mb-4">
              Vendor Not Found
            </h2>
            <p className="text-theme-gray-dark mb-6">
              We couldn't find the vendor you're looking for. They may have been removed or the URL might be incorrect.
            </p>
            <Button 
              onClick={() => window.history.back()}
              className="bg-theme-brown text-white hover:bg-theme-brown-dark"
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
        {/* Breadcrumb Navigation */}
        <div className="bg-theme-cream py-3">
          <div className="container mx-auto px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="flex items-center gap-1 text-theme-gray-dark hover:text-theme-brown">
                    <Home className="h-4 w-4" />
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/vendors" className="text-theme-gray-dark hover:text-theme-brown">
                    Vendors
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage className="text-theme-brown font-medium">
                  {vendor.name}
                </BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Hero Section with Dark Overlay */}
        <div className="relative h-80 md:h-96 bg-cover bg-center" style={{ backgroundImage: `url(${vendor.imageUrl})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"></div>
          <div className="container mx-auto h-full flex items-end">
            <div className="p-6 md:p-12 text-white relative z-10 w-full">
              <div className="mb-4">
                <Badge 
                  variant="secondary"
                  className="mb-3 bg-theme-brown text-white hover:bg-theme-brown-dark border-none px-3 py-1 text-sm font-medium"
                >
                  {vendor.type}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 leading-tight">{vendor.name}</h1>
              <div className="flex flex-wrap items-center gap-6 mb-4">
                <div className="flex items-center text-lg">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{vendor.location}</span>
                </div>
                <div className="flex items-center text-lg">
                  <Star className="h-5 w-5 mr-2 fill-yellow-400 text-yellow-400" />
                  <span>{vendor.rating} Rating</span>
                </div>
                <div className="hidden md:flex items-center text-lg">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Available {vendor.availability}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-theme-beige">
                <h2 className="text-3xl font-serif text-theme-brown mb-6">About {vendor.name}</h2>
                <p className="text-theme-gray-dark text-lg leading-relaxed mb-8">{vendor.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-theme-cream p-4 rounded-lg border-l-4 border-theme-brown">
                    <div className="text-sm text-theme-gray-dark mb-1 font-medium">Average Price</div>
                    <div className="text-xl text-theme-brown font-bold">{vendor.price}</div>
                  </div>
                  <div className="bg-theme-cream p-4 rounded-lg border-l-4 border-theme-brown">
                    <div className="text-sm text-theme-gray-dark mb-1 font-medium">Availability</div>
                    <div className="text-xl text-theme-brown font-bold">{vendor.availability}</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {vendor.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-theme-cream text-theme-brown border border-theme-beige hover:bg-theme-beige transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Portfolio Section */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-theme-beige">
                <h2 className="text-3xl font-serif text-theme-brown mb-6">Portfolio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioImages.map((image, index) => (
                    <div key={index} className="group relative rounded-xl overflow-hidden h-56 bg-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
                      <img 
                        src={image.url} 
                        alt={image.caption || `Portfolio image ${index + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        {image.category && (
                          <span className="inline-block px-2 py-1 bg-theme-brown text-xs font-medium rounded mb-1">
                            {image.category}
                          </span>
                        )}
                        <p className="text-sm font-medium">{image.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Service Packages */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-theme-beige">
                <h2 className="text-3xl font-serif text-theme-brown mb-6">Service Packages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vendorPackages.map((pkg, index) => (
                    <div key={index} className="relative bg-white border-2 border-theme-beige rounded-xl p-6 hover:border-theme-brown hover:shadow-md transition-all duration-300">
                      {/* Popular/Budget badges */}
                      {pkg.isPopular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-theme-brown text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                            <Star className="h-4 w-4 fill-current" />
                            Most Popular
                          </span>
                        </div>
                      )}
                      {pkg.isBudgetFriendly && (
                        <div className="absolute -top-3 right-4">
                          <span className="bg-theme-success text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Budget-Friendly
                          </span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-serif font-semibold text-theme-brown">{pkg.name}</h3>
                        <span className="bg-theme-cream text-theme-brown px-3 py-1 rounded-full text-sm font-bold border border-theme-beige">
                          {pkg.priceRange}
                        </span>
                      </div>
                      
                      <p className="text-theme-gray-dark mb-6 leading-relaxed">{pkg.description}</p>
                      
                      <div className="space-y-3 mb-6">
                        {pkg.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-theme-brown mt-2"></div>
                            <span className="text-theme-gray-dark">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full border-theme-brown text-theme-brown hover:bg-theme-brown hover:text-white transition-colors"
                      >
                        Inquire About Package
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Info & Call to Action */}
            <div className="lg:col-span-1">
              <div className="bg-theme-cream rounded-xl p-8 shadow-sm border border-theme-beige sticky top-24">
                <h3 className="text-2xl font-serif text-theme-brown mb-6">Contact Information</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-theme-beige">
                    <Phone className="h-5 w-5 text-theme-brown" />
                    <span className="text-theme-gray-dark font-medium">0412 345 678</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-theme-beige">
                    <Mail className="h-5 w-5 text-theme-brown" />
                    <span className="text-theme-gray-dark font-medium">info@{vendor.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-theme-beige">
                    <Globe className="h-5 w-5 text-theme-brown" />
                    <span className="text-theme-gray-dark font-medium">www.{vendor.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-theme-beige">
                    <Instagram className="h-5 w-5 text-theme-brown" />
                    <span className="text-theme-gray-dark font-medium">@{vendor.name.toLowerCase().replace(/\s+/g, '')}</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-theme-beige">
                    <Facebook className="h-5 w-5 text-theme-brown" />
                    <span className="text-theme-gray-dark font-medium">{vendor.name}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-theme-brown text-white hover:bg-theme-brown-dark transition-colors text-base py-3 font-semibold"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Check Availability
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-theme-brown text-theme-brown hover:bg-theme-brown hover:text-white transition-colors text-base py-3 font-semibold"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Send a Message
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="mt-8 pt-6 border-t border-theme-beige">
                  <div className="text-center">
                    <div className="text-sm text-theme-gray-dark mb-2">Response Time</div>
                    <div className="text-lg font-bold text-theme-brown">Within 2 hours</div>
                  </div>
                </div>
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
