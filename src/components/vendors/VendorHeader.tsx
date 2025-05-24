
interface VendorHeaderProps {
  selectedCategory: string;
  selectedLocation: string;
}

const VendorHeader = ({ selectedCategory, selectedLocation }: VendorHeaderProps) => {
  return (
    <div className="bg-theme-brown py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            Wedding Vendors
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover exceptional wedding professionals who will bring your dream day to life. 
            From stunning venues to talented photographers, find your perfect match.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">1,200+</div>
              <div className="text-white/90 font-medium">Verified Vendors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-white/90 font-medium">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">4.8★</div>
              <div className="text-white/90 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorHeader;
