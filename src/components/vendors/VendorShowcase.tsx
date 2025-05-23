
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
      description: "Breathtaking garden venue with stunning harbor views",
      categoryColor: "bg-emerald-500"
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
      description: "Award-winning wedding photography with artistic flair",
      categoryColor: "bg-purple-500"
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
      description: "Exquisite floral designs using locally sourced blooms",
      categoryColor: "bg-pink-500"
    }
  ];

  const stats = [
    { number: "1,200+", label: "Verified Vendors", icon: Award },
    { number: "15,000+", label: "Happy Couples", icon: Heart },
    { number: "4.8", label: "Average Rating", icon: Star },
    { number: "50+", label: "Cities Covered", icon: MapPin }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-theme-cream/30 border-b border-theme-beige/30 py-8">
      <div className="container mx-auto px-4 py-16 md:py-20">
        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group transform transition-all duration-300 hover:scale-110 cursor-pointer">
                <div className="bg-gradient-to-br from-theme-cream to-white rounded-2xl p-6 w-24 h-24 mx-auto mb-6 group-hover:bg-gradient-to-br group-hover:from-theme-brown group-hover:to-theme-brown-dark group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg border border-theme-beige/50 group-hover:border-theme-brown">
                  <IconComponent className="h-12 w-12" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-theme-brown-dark mb-3 font-serif">
                  {stat.number}
                </div>
                <div className="text-base text-theme-gray-dark font-medium uppercase tracking-wider text-sm">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Featured Vendors Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-theme-brown-dark mb-4 font-bold">
                Featured Vendors
              </h2>
              <p className="text-theme-gray-dark text-xl leading-relaxed">
                Handpicked professionals for your special day
              </p>
            </div>
            <Badge className="bg-gradient-to-r from-theme-brown to-theme-brown-dark text-white px-6 py-3 flex items-center gap-3 text-base font-semibold rounded-full shadow-lg">
              <TrendingUp className="h-5 w-5" />
              Top Rated
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredVendors.map((vendor) => (
              <Link key={vendor.id} to={`/vendors/${vendor.id}`} className="group">
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-theme-beige/30 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02]">
                  {/* Category Color Accent */}
                  <div className={`h-2 ${vendor.categoryColor}`}></div>
                  
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={vendor.image} 
                      alt={vendor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${vendor.categoryColor} text-white font-semibold px-4 py-2 text-sm rounded-full shadow-md border-2 border-white`}>
                        📸 {vendor.type}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <button className="bg-white/95 hover:bg-white p-3 rounded-full transition-all duration-200 shadow-lg hover:scale-110">
                        <Heart className="h-5 w-5 text-theme-gray-dark hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 font-semibold shadow-lg">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{vendor.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-theme-brown-dark mb-3 group-hover:text-theme-brown transition-colors font-serif">
                      {vendor.name}
                    </h3>
                    <p className="text-theme-gray-dark mb-5 line-clamp-2 text-base leading-relaxed">
                      {vendor.description}
                    </p>
                    
                    <div className="flex items-center text-theme-gray-dark mb-5">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span className="font-medium">{vendor.location}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {vendor.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="border-theme-beige text-theme-gray-dark text-sm py-1 px-3 hover:bg-theme-cream transition-colors">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-theme-beige/50">
                      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 px-4 py-2 rounded-full border border-emerald-200">
                        <div className="font-bold text-theme-brown-dark text-lg">
                          {vendor.price}
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button 
                          variant="outline"
                          className="border-theme-brown text-theme-brown hover:bg-theme-cream font-semibold"
                        >
                          View Details
                        </Button>
                        <Button 
                          className="bg-theme-brown hover:bg-theme-brown-dark text-white font-semibold px-6 shadow-md hover:shadow-lg transition-all"
                        >
                          Check Availability
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="relative bg-gradient-to-r from-theme-brown via-theme-brown-dark to-theme-brown rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 left-8 w-16 h-16 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-8 right-8 w-20 h-20 border-2 border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-serif mb-8 font-bold leading-tight">
              Ready to find your perfect vendors?
            </h3>
            <p className="text-white/95 text-xl mb-10 max-w-3xl mx-auto leading-relaxed font-light">
              Browse through our curated collection of wedding professionals, 
              or let us help you find exactly what you're looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-theme-brown hover:bg-theme-cream px-10 py-4 font-semibold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Browse All Vendors
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-theme-brown px-10 py-4 font-semibold text-lg rounded-full hover:scale-105 transition-all duration-300"
              >
                Get Matched
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorShowcase;
