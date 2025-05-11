
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlanningToolsGrid from "@/components/PlanningToolsGrid";

const PlanningTools = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="bg-wednest-cream py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-serif text-wednest-brown text-center mb-4">
              Wedding Planning Tools
            </h1>
            <p className="text-wednest-brown-light text-center max-w-2xl mx-auto mb-8">
              Everything you need to plan your perfect wedding day. 
              From budget tracking to guest list management, we've got you covered.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <PlanningToolsGrid />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlanningTools;
