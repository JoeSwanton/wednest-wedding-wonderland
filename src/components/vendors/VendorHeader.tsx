
interface VendorHeaderProps {
  selectedCategory: string;
  selectedLocation: string;
}

const VendorHeader = ({ selectedCategory, selectedLocation }: VendorHeaderProps) => {
  return (
    <div className="relative bg-gradient-to-br from-theme-brown via-theme-brown-dark to-theme-brown py-16 md:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-white rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border border-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            Wedding Vendors
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover exceptional wedding professionals who will bring your dream day to life. 
            From stunning venues to talented photographers, find your perfect match.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">1,200+</div>
              <div className="text-white/80">Vendors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-white/80">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">4.8★</div>
              <div className="text-white/80">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorHeader;
