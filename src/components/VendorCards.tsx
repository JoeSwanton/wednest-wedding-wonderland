
import React, { useState } from "react";
import { MapPin, Heart, Star, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

// Expanded mock business data
const mockBusinesses = [
  {
    id: 1,
    type: "DJ",
    name: "Rhythm Masters Entertainment",
    location: "Sydney, NSW",
    availability: "Medium",
    price: "$$$",
    description: "High-energy DJs who specialize in reading the crowd and creating the perfect dance floor atmosphere.",
    rating: 4.9,
    tags: ["High Energy", "Dance Floor Experts"],
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    type: "Venue",
    name: "Elegant Gardens Estate",
    location: "Yarra Valley, VIC",
    availability: "Medium",
    price: "$$$$",
    description: "A beautiful garden estate with indoor and outdoor ceremony options.",
    rating: 4.8,
    tags: ["Garden", "Outdoor", "Indoor"],
    imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    type: "Photographer",
    name: "Captured Moments Studio",
    location: "Melbourne, VIC",
    availability: "High",
    price: "$$",
    description: "Award-winning photography team specializing in candid, natural wedding photos.",
    rating: 4.7,
    tags: ["Candid", "Natural", "Documentary"],
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
  },
  {
    id: 4,
    type: "Florist",
    name: "Bloom & Willow Designs",
    location: "Brisbane, QLD",
    availability: "Low",
    price: "$$$",
    description: "Bespoke floral arrangements using locally sourced, seasonal blooms.",
    rating: 4.9,
    tags: ["Sustainable", "Local", "Custom"],
    imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
  },
  {
    id: 5,
    type: "Catering",
    name: "Fine Taste Catering",
    location: "Adelaide, SA",
    availability: "High",
    price: "$$$$",
    description: "Exquisite farm-to-table menus customized for your special day.",
    rating: 4.8,
    tags: ["Gourmet", "Farm-to-Table", "Custom Menus"],
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 6,
    type: "Wedding Planner",
    name: "Perfect Day Coordinators",
    location: "Perth, WA",
    availability: "Medium",
    price: "$$$",
    description: "Full-service planning team specializing in stress-free, seamless wedding experiences.",
    rating: 5.0,
    tags: ["Full Service", "Day-of Coordination", "Luxury"],
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
  },
  {
    id: 7,
    type: "Cake Designer",
    name: "Sweet Creations Bakery",
    location: "Hobart, TAS",
    availability: "Low",
    price: "$$",
    description: "Artisan wedding cakes and dessert tables with a focus on local, seasonal flavors.",
    rating: 4.7,
    tags: ["Custom Design", "Gluten-Free Options", "Dessert Table"],
    imageUrl: "https://images.unsplash.com/photo-1587668178277-295251f900ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 8,
    type: "Videographer",
    name: "Cinematic Love Stories",
    location: "Gold Coast, QLD",
    availability: "Medium",
    price: "$$$",
    description: "Cinematic wedding films that capture the emotion and beauty of your special day.",
    rating: 4.9,
    tags: ["Cinematic", "Documentary", "Drone Footage"],
    imageUrl: "https://images.unsplash.com/photo-1571727153934-b7db5101be96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 9,
    type: "Venue",
    name: "Harborview Reception Center",
    location: "Sydney, NSW",
    availability: "High",
    price: "$$$$",
    description: "Stunning waterfront venue with panoramic harbor views and elegant ballrooms.",
    rating: 4.8,
    tags: ["Waterfront", "Ballroom", "City Views"],
    imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
  },
  {
    id: 10,
    type: "DJ",
    name: "Soundscape Productions",
    location: "Canberra, ACT",
    availability: "Medium",
    price: "$$",
    description: "Professional DJs and lighting specialists creating immersive entertainment experiences.",
    rating: 4.5,
    tags: ["DJ", "Lighting", "MC Services"],
    imageUrl: "https://images.unsplash.com/photo-1516873240891-4bf014598ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 11,
    type: "Makeup Artist",
    name: "Bridal Beauty Specialists",
    location: "Melbourne, VIC",
    availability: "High",
    price: "$$$",
    description: "Expert makeup artists creating flawless, long-lasting looks for brides and bridal parties.",
    rating: 4.9,
    tags: ["Bridal Makeup", "Hair Styling", "On-Location"],
    imageUrl: "https://images.unsplash.com/photo-1560869713-7d8c17c9e525?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 12,
    type: "Transportation",
    name: "Luxury Fleet Services",
    location: "Brisbane, QLD",
    availability: "Medium",
    price: "$$$",
    description: "Classic and modern luxury vehicles for stylish wedding transportation.",
    rating: 4.6,
    tags: ["Classic Cars", "Limousines", "Luxury Vehicles"],
    imageUrl: "https://images.unsplash.com/photo-1532202193792-e95ef22f1bce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
  }
];

interface VendorCardsProps {
  searchQuery?: string;
  selectedCategory?: string;
  selectedLocation?: string;
  priceFilter?: string;
  styleFilter?: string[];
  availabilityFilter?: string;
  ratingFilter?: number;
}

const VendorCards = ({ 
  searchQuery = "", 
  selectedCategory = "", 
  selectedLocation = "",
  priceFilter = "",
  styleFilter = [],
  availabilityFilter = "",
  ratingFilter = 0
}: VendorCardsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter businesses based on search criteria
  const filteredBusinesses = mockBusinesses.filter(business => {
    // Text search
    const matchesSearch = searchQuery === "" || 
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category filter
    const matchesCategory = selectedCategory === "" || selectedCategory === "all" || 
      business.type.toLowerCase() === selectedCategory.toLowerCase();
    
    // Location filter
    const matchesLocation = selectedLocation === "" || selectedLocation === "Any Location" ||
      business.location.includes(selectedLocation);

    // Price filter
    const matchesPrice = priceFilter === "" || business.price.length === priceFilter.length;

    // Rating filter
    const matchesRating = ratingFilter === 0 || business.rating >= ratingFilter;

    // Availability filter
    const matchesAvailability = availabilityFilter === "" || 
      business.availability.toLowerCase() === availabilityFilter.toLowerCase();

    // Style filter (tags)
    const matchesStyle = styleFilter.length === 0 || 
      styleFilter.some(style => business.tags.includes(style));

    return matchesSearch && matchesCategory && matchesLocation && 
           matchesPrice && matchesRating && matchesAvailability && 
           (styleFilter.length === 0 || matchesStyle);
  });

  // Pagination
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBusinesses = filteredBusinesses.slice(startIndex, startIndex + itemsPerPage);
  
  // Generate page numbers for pagination
  const pageNumbers = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedBusinesses.length > 0 ? (
          paginatedBusinesses.map((business) => (
            <Card key={business.id} className="overflow-hidden bg-white border border-wednest-beige rounded-lg hover:shadow-md transition-shadow duration-300">
              {/* Image and badges */}
              <div className="relative h-48 bg-muted overflow-hidden">
                <div className="absolute top-2 left-2 bg-gray-700 text-white px-2 py-1 rounded-md text-xs font-medium z-10">
                  {business.type}
                </div>
                <button className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white z-10">
                  <Heart className="h-5 w-5 text-gray-500 hover:text-wednest-sage" />
                </button>
                <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-full flex items-center text-xs z-10">
                  <Star className="h-4 w-4 text-wednest-gold mr-1 fill-wednest-gold" />
                  <span>{business.rating}</span>
                </div>
                <img 
                  src={business.imageUrl} 
                  alt={`${business.name} - ${business.type}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-serif font-normal text-wednest-brown mb-1">
                  {business.name}
                </h3>
                <div className="flex items-center text-sm text-wednest-brown-light mb-3">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  <span>{business.location}</span>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-wednest-brown-light">
                    Availability: <span className="font-medium">{business.availability}</span>
                  </div>
                  <div className="font-medium text-wednest-brown">
                    {business.price}
                  </div>
                </div>
                
                <p className="text-sm text-wednest-brown-light mb-3 line-clamp-2">
                  {business.description}
                </p>
                
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {business.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="rounded-md bg-wednest-cream text-wednest-brown-light hover:bg-wednest-beige"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-wednest-sage text-wednest-sage hover:bg-wednest-cream"
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-8 text-center">
            <p className="text-wednest-brown-light text-lg">No vendors found matching your criteria. Please try adjusting your filters.</p>
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {filteredBusinesses.length > itemsPerPage && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {startPage > 1 && (
                <>
                  <PaginationItem>
                    <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
                  </PaginationItem>
                  {startPage > 2 && (
                    <PaginationItem>
                      <PaginationLink disabled>...</PaginationLink>
                    </PaginationItem>
                  )}
                </>
              )}
              
              {pageNumbers.map(number => (
                <PaginationItem key={number}>
                  <PaginationLink 
                    isActive={currentPage === number} 
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && (
                    <PaginationItem>
                      <PaginationLink disabled>...</PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Results count */}
      <div className="mt-4 text-sm text-center text-wednest-brown-light">
        Showing {filteredBusinesses.length > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + itemsPerPage, filteredBusinesses.length)} of {filteredBusinesses.length} vendors
      </div>
    </div>
  );
};

export default VendorCards;
