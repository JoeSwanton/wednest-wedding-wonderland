
interface VendorHeaderProps {
  selectedCategory: string;
  selectedLocation: string;
}

const VendorHeader = ({ selectedCategory, selectedLocation }: VendorHeaderProps) => {
  return (
    <div className="bg-wednest-cream py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-serif text-wednest-brown text-center mb-4">
          Wedding Vendors
        </h1>
        <p className="text-wednest-brown-light text-center max-w-2xl mx-auto mb-0">
          Find the perfect vendors for your special day. Browse through our curated 
          selection of photographers, venues, florists, and more.
        </p>
      </div>
    </div>
  );
};

export default VendorHeader;
