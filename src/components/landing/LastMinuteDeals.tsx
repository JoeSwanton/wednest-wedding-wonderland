
import { Clock, Zap, Calendar, ArrowRight, Timer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const LastMinuteDeals = () => {
  const deals = [
    {
      id: 1,
      vendor: "Sunset Beach Photography",
      type: "Photography", 
      originalPrice: "$3,200",
      dealPrice: "$2,400",
      savings: "25%",
      location: "Gold Coast, QLD",
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&q=80&w=400&h=300",
      timeLeft: "2 days left",
      urgency: "high",
      description: "Professional wedding photography package",
      availableDates: "Dec 2024"
    },
    {
      id: 2,
      vendor: "Garden Grove Venue",
      type: "Venue",
      originalPrice: "$8,500", 
      dealPrice: "$6,800",
      savings: "20%",
      location: "Adelaide, SA",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=400&h=300",
      timeLeft: "5 days left",
      urgency: "medium",
      description: "Stunning garden venue with full catering",
      availableDates: "Jan 2025"
    },
    {
      id: 3,
      vendor: "Bloom & Co Florals",
      type: "Florist",
      originalPrice: "$1,800",
      dealPrice: "$1,350", 
      savings: "25%",
      location: "Perth, WA",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=400&h=300",
      timeLeft: "1 week left",
      urgency: "low",
      description: "Premium floral arrangements & styling",
      availableDates: "Feb 2025"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-orange-500 text-white';
      default: return 'bg-yellow-500 text-black';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <Zap className="h-4 w-4" />;
      case 'medium': return <Timer className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-gradient-to-r from-red-50 to-orange-50 border-y border-red-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-6 w-6 text-red-500" />
            <Badge className="bg-red-500 text-white px-4 py-2 text-lg font-semibold animate-pulse">
              LIMITED TIME OFFERS
            </Badge>
            <Zap className="h-6 w-6 text-red-500" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-serif text-theme-brown mb-2">
            Last-Minute Wedding Deals
          </h2>
          <p className="text-theme-brown-light text-lg">
            Exclusive discounts on premium vendors with immediate availability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {deals.map((deal) => (
            <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 border-red-100 hover:border-red-200">
              <div className="relative">
                <img 
                  src={deal.image} 
                  alt={deal.vendor}
                  className="w-full h-48 object-cover"
                />
                
                {/* Urgency badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 ${getUrgencyColor(deal.urgency)}`}>
                  {getUrgencyIcon(deal.urgency)}
                  {deal.timeLeft}
                </div>
                
                {/* Savings badge */}
                <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Save {deal.savings}
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-3">
                  <h3 className="font-serif font-medium text-lg text-theme-brown mb-1">
                    {deal.vendor}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="secondary">{deal.type}</Badge>
                    <span className="text-theme-brown-light">{deal.location}</span>
                  </div>
                </div>
                
                <p className="text-sm text-theme-brown-light mb-4">
                  {deal.description}
                </p>
                
                <div className="flex items-center gap-2 mb-4 text-sm text-theme-brown-light">
                  <Calendar className="h-4 w-4" />
                  <span>Available {deal.availableDates}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-bold text-theme-brown">{deal.dealPrice}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">{deal.originalPrice}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold"
                  asChild
                >
                  <Link to={`/vendors/${deal.id}`}>
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/vendors?filter=deals">
            <Button 
              variant="outline" 
              size="lg"
              className="border-red-500 text-red-500 hover:bg-red-50 px-8 py-3 rounded-xl"
            >
              View All Deals
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LastMinuteDeals;
