
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VendorListings from "@/components/VendorListings";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <Separator className="bg-theme-brown h-[1px] w-full" />
      <main className="flex-grow">
        <Hero />
        <VendorListings />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
