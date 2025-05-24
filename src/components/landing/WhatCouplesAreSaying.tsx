
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const WhatCouplesAreSaying = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      names: "Sarah & James",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=200&h=200",
      review: "Enosi made planning our wedding so much easier. We found our dream venue and photographer in just one weekend of searching.",
      rating: 5,
      weddingDate: "March 2024",
      vendor: "Used for venue & photography",
      verified: true
    },
    {
      id: 2,
      names: "Emily & Michael",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
      review: "The price comparison feature saved us thousands. We could see all our options at once and make informed decisions.",
      rating: 5,
      weddingDate: "June 2024",
      vendor: "Used for full wedding planning",
      verified: true
    },
    {
      id: 3,
      names: "Jessica & David",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
      review: "Every vendor we booked through Enosi was professional and amazing. The quality verification really shows.",
      rating: 5,
      weddingDate: "September 2024",
      vendor: "Used for catering & florals",
      verified: true
    },
    {
      id: 4,
      names: "Rachel & Tom",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=200&h=200",
      review: "The timeline planning tool kept us organized throughout the entire process. Couldn't have done it without Enosi!",
      rating: 5,
      weddingDate: "November 2024",
      vendor: "Used for entertainment & makeup",
      verified: true
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-theme-cream/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-serif text-theme-brown mb-4">
            What Couples Are Saying
          </h2>
          <p className="text-theme-brown-light text-lg">
            Real reviews from couples who planned their perfect wedding with Enosi
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="p-8 md:p-12 border border-theme-beige rounded-2xl bg-white shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img 
                    src={currentTestimonial.image}
                    alt={currentTestimonial.names}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-theme-beige"
                  />
                  {currentTestimonial.verified && (
                    <Badge className="absolute -bottom-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Rating */}
                <div className="flex justify-center md:justify-start items-center mb-4">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                  ))}
                </div>

                {/* Review */}
                <blockquote className="text-lg md:text-xl text-theme-brown mb-6 italic leading-relaxed">
                  "{currentTestimonial.review}"
                </blockquote>

                {/* Details */}
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-theme-brown">{currentTestimonial.names}</h4>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-theme-brown-light">
                    <span>Wedding: {currentTestimonial.weddingDate}</span>
                    <span className="hidden md:block">•</span>
                    <span>{currentTestimonial.vendor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center mt-8 gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="rounded-full w-10 h-10 p-0 border-theme-beige hover:bg-theme-cream"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-theme-brown' : 'bg-theme-beige'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="rounded-full w-10 h-10 p-0 border-theme-beige hover:bg-theme-cream"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <div className="text-2xl md:text-3xl font-bold text-theme-brown mb-2">2,500+</div>
            <div className="text-sm text-theme-brown-light">Happy Couples</div>
          </div>
          <div className="p-4">
            <div className="text-2xl md:text-3xl font-bold text-theme-brown mb-2">4.9★</div>
            <div className="text-sm text-theme-brown-light">Average Rating</div>
          </div>
          <div className="p-4">
            <div className="text-2xl md:text-3xl font-bold text-theme-brown mb-2">1,200+</div>
            <div className="text-sm text-theme-brown-light">Verified Vendors</div>
          </div>
          <div className="p-4">
            <div className="text-2xl md:text-3xl font-bold text-theme-brown mb-2">$2.8M+</div>
            <div className="text-sm text-theme-brown-light">Saved by Couples</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatCouplesAreSaying;
