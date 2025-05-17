
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data for wedding style guides
const styleGuides = [
  {
    id: 1,
    title: "Rustic Charm",
    description: "Natural elements, wood textures, and warm colors create an inviting atmosphere",
    imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    colors: ["#8d7055", "#d4c5b9", "#5a6e3a", "#c19c73"],
    elements: ["Wooden decor", "Mason jars", "Burlap accents", "Wildflowers"]
  },
  {
    id: 2,
    title: "Elegant Minimalist",
    description: "Clean lines, neutral colors, and thoughtful details for a sophisticated celebration",
    imageUrl: "https://images.unsplash.com/photo-1606216840941-0518e7142019?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    colors: ["#f5f5f5", "#e0e0e0", "#c9c9c9", "#333333"],
    elements: ["Architectural venue", "Simple greenery", "Modern dinnerware", "Statement lighting"]
  },
  {
    id: 3,
    title: "Bohemian Romance",
    description: "Free-spirited style with eclectic decor and earthy, vibrant colors",
    imageUrl: "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    colors: ["#b56d58", "#dea681", "#567568", "#c8a287"],
    elements: ["Macramé details", "Mixed textiles", "Pampas grass", "Floral crowns"]
  },
  {
    id: 4,
    title: "Coastal Elegance",
    description: "Beach-inspired elements with a refined touch for a sophisticated seaside celebration",
    imageUrl: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    colors: ["#88a9bc", "#d8e0e6", "#f4f9fc", "#2d5d7b"],
    elements: ["Shell accents", "Blue glassware", "Driftwood details", "White florals"]
  }
];

const InspirationStyleGuides = () => {
  return (
    <div className="my-12">
      <h2 className="text-2xl md:text-3xl font-serif text-theme-brown mb-6">Wedding Style Guides</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {styleGuides.map((style) => (
          <Card key={style.id} className="overflow-hidden border-theme-beige hover:shadow-md transition-shadow">
            <div className="grid md:grid-cols-5 h-full">
              <div className="md:col-span-2 h-full">
                <AspectRatio ratio={1} className="h-full">
                  <img 
                    src={style.imageUrl} 
                    alt={style.title} 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
              <div className="md:col-span-3">
                <CardContent className="p-5 h-full flex flex-col">
                  <h3 className="font-serif text-xl text-theme-brown mb-2">{style.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{style.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-xs font-medium text-theme-brown mb-2">Color Palette:</p>
                    <div className="flex space-x-2 mb-4">
                      {style.colors.map((color, index) => (
                        <div 
                          key={index} 
                          className="w-6 h-6 rounded-full" 
                          style={{ backgroundColor: color }}
                          title={color}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs font-medium text-theme-brown mb-2">Key Elements:</p>
                    <div className="flex flex-wrap gap-2">
                      {style.elements.map((element, index) => (
                        <Badge 
                          key={index}
                          variant="outline" 
                          className="text-xs border-theme-beige"
                        >
                          {element}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <Link to={`/inspiration/style/${style.id}`}>
                      <Button variant="default" className="w-full bg-theme-brown hover:bg-theme-brown-dark text-white">
                        Get This Look
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Button variant="outline" className="border-theme-brown text-theme-brown hover:bg-theme-cream">
          Explore All Style Guides
        </Button>
      </div>
    </div>
  );
};

export default InspirationStyleGuides;
