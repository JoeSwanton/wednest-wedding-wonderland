
interface VendorHeaderProps {
  selectedCategory: string;
  selectedLocation: string;
}

const VendorHeader = ({ selectedCategory, selectedLocation }: VendorHeaderProps) => {
  return (
    <div className="relative bg-gradient-to-br from-theme-brown-dark via-theme-brown to-theme-brown-dark py-24 md:py-32 overflow-hidden">
      {/* Enhanced Dark Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-0"></div>
      
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-15 z-0">
        <div className="absolute top-12 left-12 w-24 h-24 border-2 border-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-24 w-20 h-20 border-2 border-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-24 left-1/4 w-16 h-16 border-2 border-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 border-2 border-white rounded-full animate-pulse delay-1500"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight tracking-wide animate-fade-in">
            Wedding Vendors
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto mb-12 leading-relaxed tracking-wide font-light animate-fade-in">
            Discover exceptional wedding professionals who will bring your dream day to life. 
            From stunning venues to talented photographers, find your perfect match.
          </p>
          
          {/* Enhanced Inline Stats with Custom Icons */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 animate-fade-in">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-5 w-20 h-20 mx-auto mb-4 flex items-center justify-center border border-white/20 shadow-lg">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl text-theme-brown-dark">🎯</span>
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 font-serif">1,200+</div>
              <div className="text-white/90 font-medium text-lg tracking-wide uppercase text-sm letter-spacing-wider">Verified Vendors</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-5 w-20 h-20 mx-auto mb-4 flex items-center justify-center border border-white/20 shadow-lg">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl text-theme-brown-dark">⭐</span>
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 font-serif">4.8★</div>
              <div className="text-white/90 font-medium text-lg tracking-wide uppercase text-sm letter-spacing-wider">Average Rating</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-5 w-20 h-20 mx-auto mb-4 flex items-center justify-center border border-white/20 shadow-lg">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl text-theme-brown-dark">📍</span>
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 font-serif">50+</div>
              <div className="text-white/90 font-medium text-lg tracking-wide uppercase text-sm letter-spacing-wider">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorHeader;
