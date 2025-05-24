
import { Clock, Gift, Percent, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LastMinuteDeals = () => {
  const deals = [
    {
      id: 1,
      vendor: "Elegant Gardens Venue",
      type: "Venue",
      deal: "30% off weekend bookings",
      originalPrice: "$200 per person",
      salePrice: "$140 per person",
      deadline: "This weekend only",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600&h=400",
      urgency: "high",
      available: "3 dates left"
    },
    {
      id: 2,
      vendor: "Melody Music Co.",
      type: "Entertainment",
      deal: "Free extra hour",
      originalPrice: "$1,200 for 4 hours",
      salePrice: "$1,200 for 5 hours",
      deadline: "Next 48 hours",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=600&h=400",
      urgency: "medium",
      available: "5 slots available"
    },
    {
      id: 3,
      vendor: "Sweet Celebrations",
      type: "Cake Designer",
      deal: "Free dessert table",
      originalPrice: "$450 for wedding cake",
      salePrice: "$450 + free desserts",
      deadline: "Limited time",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600&h=400",
      urgency: "low",
      available: "Book this month"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return Clock;
      case 'medium': return Calendar;
      case 'low': return Gift;
      default: return Percent;
    }
  };

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-red-500 mr-3" />
            <h2 className="text-2xl md:text-3xl font-serif text-theme-brown">
              Last-Minute Deals
            </h2>
          </div>
          <p className="text-theme-brown-light text-lg">
            Exclusive offers from top vendors with immediate availability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal) => {
            const UrgencyIcon = getUrgencyIcon(deal.urgency);
            return (
              <Card key={deal.id} className="overflow-hidden border border-theme-beige rounded-2xl hover:shadow-xl transition-all duration-300 group bg-white">
                <div className="relative h-48">
                  <img 
                    src={deal.image} 
                    alt={deal.vendor} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  
                  {/* Urgency Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getUrgencyColor(deal.urgency)} text-white px-3 py-1 rounded-lg text-sm flex items-center`}>
                      <UrgencyIcon className="h-4 w-4 mr-1" />
                      {deal.deadline}
                    </Badge>
                  </div>
                  
                  {/* Deal Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                      DEAL
                    </Badge>
                  </div>

                  {/* Availability */}
                  <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-1 rounded-lg text-sm">
                    {deal.available}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-3">
                    <Badge variant="outline" className="border-theme-beige text-theme-brown text-xs mb-2">
                      {deal.type}
                    </Badge>
                    <h3 className="text-lg font-semibold text-theme-brown">{deal.vendor}</h3>
                  </div>

                  {/* Deal Description */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center mb-1">
                      <Gift className="h-4 w-4 text-green-600 mr-2" />
                      <span className="font-semibold text-green-800">{deal.deal}</span>
                    </div>
                    <div className="text-sm text-green-700">
                      <span className="line-through text-gray-500">{deal.originalPrice}</span>
                      <span className="ml-2 font-bold">{deal.salePrice}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to={`/vendors/${deal.id}`}>
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                      Claim Deal Now
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* View All Deals */}
        <div className="text-center mt-8">
          <Link to="/vendors?filter=deals">
            <Button 
              variant="outline" 
              size="lg"
              className="border-red-500 text-red-500 hover:bg-red-50 px-8 py-3 rounded-xl"
            >
              View All Last-Minute Deals
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LastMinuteDeals;
