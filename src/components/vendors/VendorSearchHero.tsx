
import { useState } from "react";
import { Search, Filter, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { categories, locations } from "@/components/vendors/search/searchData";

interface VendorSearchHeroProps {
  searchQuery: string;
  selectedCategory: string;
  selectedLocation: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
}

const VendorSearchHero = ({
  searchQuery,
  selectedCategory,
  selectedLocation,
  onSearchChange,
  onCategoryChange,
  onLocationChange
}: VendorSearchHeroProps) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Discover Dream Vendors
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Connect with verified, inclusive professionals who will bring your wedding vision to 
            life with exceptional service and artistry
          </p>
          
          {/* Trust Badges */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">6 Verified Vendors</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">LGBTQ+ Friendly Options</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
              <span className="text-sm font-medium">🌱 Sustainable Choices</span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <Card className="max-w-5xl mx-auto p-6 bg-white shadow-lg border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by vendor name, service style, or location..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 h-12 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="md:w-48">
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Select */}
            <div className="md:w-48">
              <Select value={selectedLocation} onValueChange={onLocationChange}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  {locations.slice(0, 10).map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* More Filters Button */}
            <Button
              variant="outline"
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="h-12 px-6 border-gray-300 hover:border-purple-500 hover:text-purple-600"
            >
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>

            {/* Search Button */}
            <Button 
              className="h-12 px-8 bg-purple-600 hover:bg-purple-700 text-white"
            >
              Search Vendors
            </Button>
          </div>

          {/* Results Summary */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-gray-900">8 Exceptional Vendors Found</span>
              <span className="text-gray-600">Curated professionals ready to make your dream wedding come true</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                <Heart className="h-4 w-4 mr-1" />
                0 Saved
              </Button>
              <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                <MessageSquare className="h-4 w-4 mr-1" />
                Quick Contact
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VendorSearchHero;
