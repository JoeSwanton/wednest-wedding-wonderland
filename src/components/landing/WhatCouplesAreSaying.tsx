
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WhatCouplesAreSaying = () => {
  const testimonials = [
    {
      name: "Sarah & James",
      location: "Sydney, NSW",
      rating: 5,
      text: "Enosi made planning our wedding so much easier. We found our photographer and venue in just one weekend!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b193?auto=format&fit=crop&q=80&w=150&h=150",
      saved: "$3,200"
    },
    {
      name: "Emma & Michael",
      location: "Melbourne, VIC", 
      rating: 5,
      text: "The vendor recommendations were spot on. Our wedding was absolutely perfect thanks to the team we found here.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
      saved: "$2,800"
    },
    {
      name: "Jessica & David",
      location: "Brisbane, QLD",
      rating: 5, 
      text: "Saved us months of research and thousands of dollars. The instant booking feature is a game-changer!",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
      saved: "$4,100"
    }
  ];

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced header with metrics */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-theme-brown">4.8</span>
            <span className="text-theme-brown-light">from 2,847 reviews</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-serif text-theme-brown mb-2">
            What Couples Are Saying
          </h2>
          <p className="text-theme-brown-light text-lg mb-6">
            Real experiences from couples who planned their perfect wedding with Enosi
          </p>
          
          {/* Key metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-theme-brown mb-1">$3,400</div>
              <div className="text-sm text-theme-brown-light">Average savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-theme-brown mb-1">72%</div>
              <div className="text-sm text-theme-brown-light">Find vendors faster</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-theme-brown mb-1">98%</div>
              <div className="text-sm text-theme-brown-light">Would recommend</div>
            </div>
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-theme-cream/30">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-theme-brown">{testimonial.name}</h4>
                    <p className="text-sm text-theme-brown-light">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-sm font-medium text-green-600">Saved {testimonial.saved}</div>
                  </div>
                </div>
                
                <Quote className="h-6 w-6 text-theme-brown/30 mb-3" />
                <p className="text-theme-brown-light leading-relaxed">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatCouplesAreSaying;
