
import { Button } from "@/components/ui/button";

interface Filter {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface VendorFilterTabsProps {
  filters: Filter[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

const VendorFilterTabs = ({ filters, activeFilter, onFilterChange }: VendorFilterTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {filters.map((filter) => {
        const IconComponent = filter.icon;
        return (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.id)}
            className={`rounded-full px-4 py-2 text-sm transition-all flex items-center gap-2 ${
              activeFilter === filter.id
                ? "bg-theme-brown text-white shadow-lg transform scale-105"
                : "border-theme-beige text-theme-brown hover:bg-theme-cream hover:scale-105 hover:shadow-md"
            }`}
          >
            <IconComponent className="h-4 w-4" />
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
};

export default VendorFilterTabs;
