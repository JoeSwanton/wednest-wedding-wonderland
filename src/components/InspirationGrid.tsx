
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

// Mock inspiration data
const inspirationItems = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1522673607200-8e03134a127b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Rustic Outdoor Ceremony",
    categories: ["Venues", "Decor", "Outdoor"],
    likes: 243
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Elegant Garden Reception",
    categories: ["Venues", "Decor", "Flowers"],
    likes: 187
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Modern Minimalist Table Setting",
    categories: ["Decor", "Themes"],
    likes: 156
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    title: "Beachside Wedding",
    categories: ["Venues", "Photography"],
    likes: 321
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    title: "Classic White Wedding Cake",
    categories: ["Cakes"],
    likes: 198
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1606216840941-0518e7142019?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Floral Bridal Bouquet",
    categories: ["Flowers", "Attire"],
    likes: 275
  }
];

const InspirationGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {inspirationItems.map((item) => (
        <Card key={item.id} className="overflow-hidden border border-wednest-beige hover:shadow-md transition-shadow">
          <div className="relative">
            <AspectRatio ratio={4/3}>
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
            <button className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full flex items-center justify-center">
              <Heart className="h-5 w-5 text-wednest-brown-light hover:text-wednest-sage" />
            </button>
            <div className="absolute bottom-3 right-3 bg-white/80 px-2 py-1 rounded-full text-xs font-medium text-wednest-brown flex items-center gap-1">
              <Heart className="h-3 w-3 text-wednest-sage fill-wednest-sage" />
              {item.likes}
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-serif text-lg text-wednest-brown mb-3">{item.title}</h3>
            <div className="flex flex-wrap gap-1.5">
              {item.categories.map((category, idx) => (
                <Badge 
                  key={idx}
                  variant="secondary" 
                  className="bg-wednest-cream text-wednest-brown-light"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InspirationGrid;
