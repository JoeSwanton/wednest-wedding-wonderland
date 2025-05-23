
interface VendorHeaderProps {
  selectedCategory: string;
  selectedLocation: string;
}

const VendorHeader = ({ selectedCategory, selectedLocation }: VendorHeaderProps) => {
  return (
    <div className="relative bg-gradient-to-br from-theme-brown-dark via-theme-brown to-theme-brown-dark py-20 md:py-28 overflow-hidden">
      {/* Dark Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border-2 border-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight tracking-wide animate-fade-in">
            Wedding Vendors
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-8 leading-relaxed tracking-wide font-light animate-fade-in">
            Discover exceptional wedding professionals who will bring your dream day to life. 
            From stunning venues to talented photographers, find your perfect match.
          </p>
          
          {/* Enhanced Quick Stats */}
          <div className="flex flex-wrap justify-center gap-12 mt-12 animate-fade-in">
            <div className="text-center">
              <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <span className="text-3xl">👰</span>
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-1">1,200+</div>
              <div className="text-white/90 font-medium">Vendors</div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <span className="text-3xl">🏆</span>
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-1">50+</div>
              <div className="text-white/90 font-medium">Categories</div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <span className="text-3xl">⭐</span>
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-1">4.8★</div>
              <div className="text-white/90 font-medium">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorHeader;
