
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Import inspiration components
import InspirationRealWeddings from "@/components/inspiration/InspirationRealWeddings";
import InspirationStyleGuides from "@/components/inspiration/InspirationStyleGuides";
import InspirationBoards from "@/components/inspiration/InspirationBoards";
import InspirationLocation from "@/components/inspiration/InspirationLocation";

const Inspiration = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="bg-theme-cream py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-serif text-theme-brown text-center mb-4">
              Wedding Inspiration
            </h1>
            <p className="text-theme-brown-light text-center max-w-2xl mx-auto mb-8">
              Explore beautiful wedding ideas and find inspiration for your 
              own special day. From decor to themes, discover what speaks to you.
            </p>
            
            <Tabs defaultValue="all" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid grid-cols-5 bg-white/50">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="real-weddings">Real Weddings</TabsTrigger>
                <TabsTrigger value="style-guides">Style Guides</TabsTrigger>
                <TabsTrigger value="gallery">Inspiration Gallery</TabsTrigger>
                <TabsTrigger value="locations">By Location</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {/* Popular search tags */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <span className="text-sm text-theme-brown-light mr-2">Popular:</span>
            <Button variant="outline" size="sm" className="rounded-full text-xs border-theme-beige hover:bg-theme-cream">
              #OutdoorWedding
            </Button>
            <Button variant="outline" size="sm" className="rounded-full text-xs border-theme-beige hover:bg-theme-cream">
              #ModernMinimalist
            </Button>
            <Button variant="outline" size="sm" className="rounded-full text-xs border-theme-beige hover:bg-theme-cream">
              #BohoStyle
            </Button>
            <Button variant="outline" size="sm" className="rounded-full text-xs border-theme-beige hover:bg-theme-cream">
              #GardenWedding
            </Button>
            <Button variant="outline" size="sm" className="rounded-full text-xs border-theme-beige hover:bg-theme-cream">
              #TablescapeIdeas
            </Button>
            <Button variant="outline" size="sm" className="rounded-full text-xs border-theme-beige hover:bg-theme-cream">
              #WeddingFlowers
            </Button>
          </div>
          
          {/* Main content sections */}
          <InspirationRealWeddings />
          <InspirationStyleGuides />
          <InspirationBoards />
          <InspirationLocation />
          
          {/* Call to action */}
          <div className="bg-theme-cream rounded-lg p-8 text-center my-12">
            <h2 className="text-2xl md:text-3xl font-serif text-theme-brown mb-3">Ready to Start Planning Your Wedding?</h2>
            <p className="text-theme-brown-light max-w-2xl mx-auto mb-6">
              Connect with top wedding vendors in your area who can bring your inspiration to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-theme-brown hover:bg-theme-brown-dark text-white">
                Find Vendors Near You
              </Button>
              <Button variant="outline" className="border-theme-brown text-theme-brown hover:bg-theme-cream">
                Create a Free Wedding Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Inspiration;
