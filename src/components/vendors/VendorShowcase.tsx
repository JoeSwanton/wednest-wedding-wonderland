
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, MapPin, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const VendorShowcase = () => {
  const featuredVendors = [
    {
      id: 1,
      name: "Elegant Gardens Estate",
      type: "Venue",
      location: "Sydney, NSW",
      rating: 4.9,
      price: "From $5,500",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800&h=600",
      tags: ["Outdoor", "Garden", "Luxury"],
      featured: true,
      description: "Breathtaking garden venue with stunning harbor views"
    },
    {
      id: 2,
      name: "Moments Photography",
      type: "Photographer",
      location: "Melbourne, VIC",
      rating: 4.8,
      price: "From $2,800",
      image: "https://images.unsplash.com/photo-1537633552122-d3b236552305?auto=format&fit=crop&q=80&w=800&h=600",
      tags: ["Artistic", "Candid", "Portrait"],
      featured: true,
      description: "Award-winning wedding photography with artistic flair"
    },
    {
      id: 3,
      name: "Divine Florals",
      type: "Florist",
      location: "Brisbane, QLD",
      rating: 4.7,
      price: "From $850",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=800&h=600",
      tags: ["Romantic", "Seasonal", "Sustainable"],
      featured: true,
      description: "Exquisite floral designs using locally sourced blooms"
    }
  ];

  const stats = [
    { number: "1,200+", label: "Verified Vendors", icon: Award },
    { number: "15,000+", label: "Happy Couples", icon: Heart },
    { number: "4.8", label: "Average Rating", icon: Star },
    { number: "50+", label: "Cities Covered", icon: MapPin }
  ];

  return (
    <div className="bg-white border-b border-theme-beige/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-theme-cream rounded-full p-4 w-16 h-16 mx-auto mb-3 group-hover:bg-theme-brown group-hover:text-white transition-colors duration-300">
                  <IconComponent className="h-8 w-8" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-theme-brown-dark mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-theme-gray-dark">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Vendors Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-theme-brown-dark mb-2">
                Featured Vendors
              </h2>
              <p className="text-theme-gray-dark text-lg">
                Handpicked professionals for your special day
              </p>
            </div>
            <Badge className="bg-theme-brown text-white px-4 py-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Top Rated
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVendors.map((vendor) => (
              <Link key={vendor.id} to={`/vendors/${vendor.id}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-theme-beige/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={vendor.image} 
                      alt={vendor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-theme-brown text-white">
                        {vendor.type}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors duration-200">
                        <Heart className="h-4 w-4 text-theme-gray-dark hover:text-red-500" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{vendor.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-theme-brown-dark mb-2 group-hover:text-theme-brown transition-colors">
                      {vendor.name}
                    </h3>
                    <p className="text-theme-gray-dark mb-3 line-clamp-2">
                      {vendor.description}
                    </p>
                    
                    <div className="flex items-center text-theme-gray-dark mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{vendor.location}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {vendor.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-theme-beige text-theme-gray-dark">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-theme-brown-dark font-semibold">
                        {vendor.price}
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-theme-brown hover:bg-theme-brown-dark text-white px-4"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-theme-brown to-theme-brown-dark rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-serif mb-4">
            Ready to find your perfect vendors?
          </h3>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Browse through our curated collection of wedding professionals, 
            or let us help you find exactly what you're looking for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-theme-brown hover:bg-theme-cream px-8"
            >
              Browse All Vendors
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-theme-brown px-8"
            >
              Get Matched
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorShowcase;
