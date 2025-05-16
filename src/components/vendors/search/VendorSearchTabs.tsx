
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VendorSearchForm from "@/components/vendors/search/VendorSearchForm";
import VendorBrowseCategories from "@/components/vendors/search/VendorBrowseCategories";

interface VendorSearchTabsProps {
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
  onPriceChange: (price: string) => void;
  onStyleChange: (styles: string[]) => void;
  onAvailabilityChange: (availability: string) => void;
  onRatingChange: (rating: number) => void;
  onViewChange: (view: "grid" | "map") => void;
}

const VendorSearchTabs = ({
  onSearchChange,
  onCategoryChange,
  onLocationChange,
  onPriceChange,
  onStyleChange,
  onAvailabilityChange,
  onRatingChange,
  onViewChange
}: VendorSearchTabsProps) => {
  return (
    <Tabs defaultValue="search">
      <TabsList className="w-full border-b border-wednest-beige bg-transparent p-0 h-auto">
        <TabsTrigger 
          value="search" 
          className="flex-1 py-3 rounded-none data-[state=active]:bg-wednest-cream data-[state=active]:shadow-none border-r border-wednest-beige"
        >
          Search Vendors
        </TabsTrigger>
        <TabsTrigger 
          value="browse" 
          className="flex-1 py-3 rounded-none data-[state=active]:bg-wednest-cream data-[state=active]:shadow-none"
        >
          Browse by Category
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="search" className="p-6">
        <VendorSearchForm 
          onSearchChange={onSearchChange}
          onCategoryChange={onCategoryChange}
          onLocationChange={onLocationChange}
          onPriceChange={onPriceChange}
          onStyleChange={onStyleChange}
          onAvailabilityChange={onAvailabilityChange}
          onRatingChange={onRatingChange}
          onViewChange={onViewChange}
        />
      </TabsContent>
      
      <TabsContent value="browse" className="p-6">
        <VendorBrowseCategories 
          onCategorySelect={onCategoryChange}
          onLocationSelect={onLocationChange}
          onStyleSelect={(style) => onStyleChange([style])}
        />
      </TabsContent>
    </Tabs>
  );
};

export default VendorSearchTabs;
