
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const PlanByTimeline = () => {
  const timelinePhases = [
    {
      phase: "6+ Months Ahead",
      urgency: "book-early",
      icon: Calendar,
      description: "Book these vendors first - they fill up quickly",
      progress: 33,
      vendors: [
        { name: "Venue", reason: "Best locations book 12+ months ahead", color: "bg-red-500" },
        { name: "Wedding Planner", reason: "Top planners have limited availability", color: "bg-red-500" },
        { name: "Photographer", reason: "Popular photographers book early", color: "bg-orange-500" }
      ]
    },
    {
      phase: "3-6 Months Ahead",
      urgency: "plan-ahead",
      icon: Clock,
      description: "Perfect timing for these essential services",
      progress: 66,
      vendors: [
        { name: "Catering", reason: "Menu planning and dietary requirements", color: "bg-yellow-500" },
        { name: "Entertainment", reason: "Live bands and DJs book up", color: "bg-yellow-500" },
        { name: "Florist", reason: "Seasonal flower planning", color: "bg-green-500" }
      ]
    },
    {
      phase: "1-3 Months Ahead",
      urgency: "final-details",
      icon: AlertCircle,
      description: "Final touches and personal services",
      progress: 100,
      vendors: [
        { name: "Hair & Makeup", reason: "Trial sessions and final look", color: "bg-blue-500" },
        { name: "Transportation", reason: "Coordinate timing and routes", color: "bg-blue-500" },
        { name: "Cake Designer", reason: "Final design and flavors", color: "bg-purple-500" }
      ]
    }
  ];

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-serif text-theme-brown mb-4">
            Plan by Timeline
          </h2>
          <p className="text-theme-brown-light text-lg max-w-3xl mx-auto">
            Stay on track with our expert-recommended booking timeline. 
            Book vendors at the right time to secure your dream team.
          </p>
        </div>

        {/* Enhanced Progress Timeline */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-theme-brown-light">Wedding Planning Progress</span>
            <span className="text-sm text-theme-brown">6+ months → Wedding Day</span>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-theme-beige rounded-full -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full -translate-y-1/2 w-full"></div>
            {timelinePhases.map((phase, index) => (
              <div 
                key={index}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-4 border-theme-brown rounded-full shadow-lg"
                style={{ left: `${phase.progress}%` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {timelinePhases.map((phase, index) => {
            const IconComponent = phase.icon;
            return (
              <Card key={index} className="p-6 border border-theme-beige rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 transform group">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full mr-4 ${
                    phase.urgency === 'book-early' ? 'bg-red-100' :
                    phase.urgency === 'plan-ahead' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    <IconComponent className={`h-6 w-6 ${
                      phase.urgency === 'book-early' ? 'text-red-600' :
                      phase.urgency === 'plan-ahead' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-theme-brown">{phase.phase}</h3>
                    <Badge className={`text-xs ${
                      phase.urgency === 'book-early' ? 'bg-red-500' :
                      phase.urgency === 'plan-ahead' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    } text-white`}>
                      {phase.urgency === 'book-early' ? 'High Priority' :
                       phase.urgency === 'plan-ahead' ? 'Medium Priority' :
                       'Low Priority'}
                    </Badge>
                  </div>
                </div>

                <p className="text-theme-brown-light text-sm mb-6">{phase.description}</p>

                <div className="space-y-3">
                  {phase.vendors.map((vendor, vendorIndex) => (
                    <Link 
                      key={vendorIndex}
                      to={`/vendors?category=${vendor.name.toLowerCase().replace(' & ', '-')}&timeline=${phase.phase.toLowerCase()}`}
                      className="block group/vendor"
                    >
                      <div className="flex items-center justify-between p-3 rounded-lg border border-theme-beige hover:bg-theme-cream/50 transition-all hover:scale-105 hover:shadow-md transform">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${vendor.color}`}></div>
                          <div>
                            <div className="font-medium text-theme-brown group-hover/vendor:text-theme-brown-dark">
                              {vendor.name}
                            </div>
                            <div className="text-xs text-theme-brown-light">{vendor.reason}</div>
                          </div>
                        </div>
                        <div className="text-theme-brown-light group-hover/vendor:text-theme-brown transition-colors font-semibold">
                          View →
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Enhanced CTA */}
        <div className="text-center mt-12">
          <div className="bg-theme-brown rounded-2xl p-8 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
            <h3 className="text-xl font-serif mb-4">Need Help Planning Your Timeline?</h3>
            <p className="text-white/90 mb-6">Get a personalized planning checklist based on your wedding date</p>
            <Link to="/planning-tools">
              <button className="bg-white text-theme-brown px-6 py-3 rounded-xl font-semibold hover:bg-theme-cream transition-all hover:scale-105 hover:shadow-lg transform">
                Get Your Custom Timeline
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanByTimeline;
