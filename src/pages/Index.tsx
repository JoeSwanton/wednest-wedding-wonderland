
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VendorListings from "@/components/VendorListings";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <VendorListings />
      <Footer />
    </div>
  );
};

export default Index;
