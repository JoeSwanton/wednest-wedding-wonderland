
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const VendorShowcase = () => {
  const featuredVendors = [
    {
      id: 1,
      name: "Ethereal Gardens Venue",
      category: "Venue",
      location: "Napa Valley, CA",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800&h=600",
      description: "Breathtaking vineyard venue perfect for intimate ceremonies and grand celebrations with panoramic valley views.",
      rating: 4.9,
      reviewCount: 247,
      price: "$8,000",
      priceNote: "starting from",
      badges: ["Featured", "Verified"],
      features: ["Outdoor Ceremonies", "Wine Pairings", "Garden Receptions"],
      tags: ["LGBTQ+ Friendly", "Sustainable", "Within 2 hours"]
    },
    {
      id: 2,
      name: "Artisan Catering Co.",
      category: "Caterer",
      location: "Austin, TX",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800&h=600",
      description: "Farm-to-table cuisine with locally sourced ingredients and creative presentations that delight every palate and dietary need.",
      rating: 4.7,
      reviewCount: 156,
      price: "$85/person",
      priceNote: "starting from",
      badges: ["Featured"],
      features: ["Local Ingredients", "Dietary Restrictions", "Interactive Stations"],
      tags: ["LGBTQ+ Friendly", "Sustainable", "Same day"]
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-900">Featured Premium Vendors</h2>
          <Badge className="bg-yellow-100 text-yellow-800 ml-2">Premium Options</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredVendors.map((vendor) => (
            <Card key={vendor.id} className="overflow-hidden bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="relative h-64">
                <img 
                  src={vendor.image} 
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {vendor.badges.map((badge) => (
                    <Badge 
                      key={badge}
                      className={badge === "Featured" ? "bg-yellow-500 text-white" : "bg-green-500 text-white"}
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{vendor.rating}</span>
                  <span className="text-gray-300">({vendor.reviewCount} reviews)</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <Badge className="bg-gray-100 text-gray-700 mb-2">{vendor.category}</Badge>
                    <h3 className="text-xl font-bold text-gray-900">{vendor.name}</h3>
                    <p className="text-gray-600">{vendor.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{vendor.price}</div>
                    <div className="text-sm text-gray-500">{vendor.priceNote}</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{vendor.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {vendor.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="border-gray-300 text-gray-700">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {vendor.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className={`${
                          tag === "LGBTQ+ Friendly" ? "border-purple-300 text-purple-700 bg-purple-50" :
                          tag === "Sustainable" ? "border-green-300 text-green-700 bg-green-50" :
                          "border-blue-300 text-blue-700 bg-blue-50"
                        }`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                    Check Availability
                  </Button>
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                    Message
                  </Button>
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                    📞
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorShowcase;
