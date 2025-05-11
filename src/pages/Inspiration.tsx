
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InspirationGrid from "@/components/InspirationGrid";
import InspirationCategories from "@/components/InspirationCategories";

const Inspiration = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="bg-wednest-cream py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-serif text-wednest-brown text-center mb-4">
              Wedding Inspiration
            </h1>
            <p className="text-wednest-brown-light text-center max-w-2xl mx-auto mb-8">
              Explore beautiful wedding ideas and find inspiration for your 
              own special day. From decor to themes, discover what speaks to you.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <InspirationCategories />
          <div className="mt-12">
            <InspirationGrid />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Inspiration;
