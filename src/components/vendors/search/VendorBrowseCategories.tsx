
import { Button } from "@/components/ui/button";
import { categories, locations, styles } from "@/components/vendors/search/searchData";

interface VendorBrowseCategoriesProps {
  onCategorySelect: (category: string) => void;
  onLocationSelect: (location: string) => void;
  onStyleSelect: (style: string) => void;
}

const VendorBrowseCategories = ({
  onCategorySelect,
  onLocationSelect,
  onStyleSelect
}: VendorBrowseCategoriesProps) => {
  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    // Switch to search tab
    const searchTab = document.querySelector('[data-value="search"]') as HTMLElement;
    if (searchTab) searchTab.click();
  };

  const handleLocationClick = (location: string) => {
    onLocationSelect(location);
    // Switch to search tab
    const searchTab = document.querySelector('[data-value="search"]') as HTMLElement;
    if (searchTab) searchTab.click();
  };

  const handleStyleClick = (style: string) => {
    onStyleSelect(style);
    // Switch to search tab
    const searchTab = document.querySelector('[data-value="search"]') as HTMLElement;
    if (searchTab) searchTab.click();
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-theme-brown mb-4">
        Browse by Category
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {categories && categories.slice(1).map((category) => (
          <Button 
            key={category.value} 
            variant="outline" 
            className="border-theme-beige text-theme-brown hover:bg-theme-cream hover:border-theme-brown justify-center h-auto py-3"
            onClick={() => handleCategoryClick(category.value)}
          >
            {category.label}
          </Button>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-theme-brown mb-4">
          Popular Locations
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {locations && locations.slice(1, 13).map((location) => (
            <Button 
              key={location} 
              variant="outline" 
              className="border-theme-beige text-theme-brown hover:bg-theme-cream hover:border-theme-brown justify-center"
              onClick={() => handleLocationClick(location)}
            >
              {location}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-theme-brown mb-4">
          Popular Styles
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {styles && styles.slice(0, 8).map((style) => (
            <Button 
              key={style} 
              variant="outline" 
              className="border-theme-beige text-theme-brown hover:bg-theme-cream hover:border-theme-brown justify-center"
              onClick={() => handleStyleClick(style)}
            >
              {style}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorBrowseCategories;
