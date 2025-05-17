
import { Heart, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for inspiration photos
const inspirationPhotos = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3",
    tags: ["Ceremony", "Floral", "Outdoor"],
    vendorName: "Bloom & Petal",
    vendorType: "Florist",
    vendorId: "v101"
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3",
    tags: ["Reception", "TableScape", "Garden"],
    vendorName: "Elite Events",
    vendorType: "Planner",
    vendorId: "v102"
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1522673607200-8e03134a127b?ixlib=rb-4.0.3",
    tags: ["Cake", "Dessert", "Modern"],
    vendorName: "Sweet Treats",
    vendorType: "Bakery",
    vendorId: "v103"
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?ixlib=rb-4.0.3",
    tags: ["Bride", "Portrait", "Dress"],
    vendorName: "Forever Captured",
    vendorType: "Photographer",
    vendorId: "v104"
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3",
    tags: ["Decor", "Candles", "Rustic"],
    vendorName: "Rustic Elegance",
    vendorType: "Decor",
    vendorId: "v105"
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1606216840941-0518e7142019?ixlib=rb-4.0.3",
    tags: ["Bouquet", "Floral", "Boho"],
    vendorName: "Wild Stems",
    vendorType: "Florist",
    vendorId: "v106"
  },
  {
    id: 7,
    imageUrl: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?ixlib=rb-4.0.3",
    tags: ["Venue", "Beach", "Ceremony"],
    vendorName: "Coastal Weddings",
    vendorType: "Venue",
    vendorId: "v107"
  },
  {
    id: 8,
    imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3",
    tags: ["Reception", "Lighting", "Evening"],
    vendorName: "Bright Ideas",
    vendorType: "Lighting",
    vendorId: "v108"
  }
];

const InspirationBoards = () => {
  return (
    <div className="my-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-serif text-theme-brown">Inspiration Gallery</h2>
        <Button variant="outline" className="text-theme-brown border-theme-brown hover:bg-theme-cream">
          <BookmarkPlus className="h-4 w-4 mr-2" /> Create Mood Board
        </Button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {inspirationPhotos.map((photo) => (
          <div key={photo.id} className="group relative overflow-hidden rounded-md">
            <img 
              src={photo.imageUrl} 
              alt={`Wedding inspiration ${photo.id}`} 
              className="w-full h-full object-cover aspect-square"
            />
            
            {/* Hover overlay with info */}
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex justify-end">
                <button className="p-1.5 bg-white/20 rounded-full hover:bg-white/40 transition-colors">
                  <Heart className="h-4 w-4 text-white" />
                </button>
              </div>
              
              <div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {photo.tags.slice(0, 2).map((tag, idx) => (
                    <Badge key={idx} className="bg-white/20 hover:bg-white/30 text-white text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="text-white">
                  <p className="text-xs font-medium">{photo.vendorName}</p>
                  <p className="text-xs opacity-75">{photo.vendorType}</p>
                </div>
                
                <Button 
                  size="sm" 
                  variant="default" 
                  className="w-full mt-2 bg-theme-brown hover:bg-theme-brown-dark text-white text-xs"
                >
                  View Vendor
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Button variant="default" className="bg-theme-brown hover:bg-theme-brown-dark text-white">
          Load More Inspiration
        </Button>
      </div>
    </div>
  );
};

export default InspirationBoards;
