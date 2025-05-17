
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VendorListings from "@/components/VendorListings";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <VendorListings />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
