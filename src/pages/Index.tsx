
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import VendorSearch from "@/components/VendorSearch";
import VendorCTA from "@/components/VendorCTA";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <VendorSearch />
      <Testimonials />
      <VendorCTA />
      <Footer />
    </div>
  );
};

export default Index;
