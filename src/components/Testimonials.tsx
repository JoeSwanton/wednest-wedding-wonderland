
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "WedNest simplified our planning process and helped us find amazing vendors that matched our style perfectly.",
    author: "Sarah & Michael",
    location: "Brisbane"
  },
  {
    quote: "The budget tracker was a lifesaver. We were able to stay on track and avoid any surprise costs along the way.",
    author: "Emma & David",
    location: "Sydney"
  },
  {
    quote: "As a photographer, I've received quality inquiries that match my style. The platform is easy to use and looks professional.",
    author: "James Anderson",
    location: "Wedding Photographer, Melbourne"
  }
];

const Testimonials = () => {
  return (
    <div className="w-full py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-cormorant font-semibold text-wednest-brown text-center mb-12">
          What Our Users Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-wednest-beige">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-wednest-gold text-wednest-gold" />
                ))}
              </div>
              <p className="text-wednest-brown mb-4 italic">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-medium text-wednest-brown">{testimonial.author}</p>
                <p className="text-sm text-wednest-brown-light">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
