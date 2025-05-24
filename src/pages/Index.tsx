
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrendingDestinations from "@/components/landing/TrendingDestinations";
import VendorListings from "@/components/VendorListings";
import FeaturedVendorsNearYou from "@/components/landing/FeaturedVendorsNearYou";
import PlanByTimeline from "@/components/landing/PlanByTimeline";
import WhatCouplesAreSaying from "@/components/landing/WhatCouplesAreSaying";
import LastMinuteDeals from "@/components/landing/LastMinuteDeals";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <Separator className="bg-theme-brown h-[1px] w-full" />
      <main className="flex-grow">
        <Hero />
        <TrendingDestinations />
        <VendorListings />
        <FeaturedVendorsNearYou />
        <PlanByTimeline />
        <LastMinuteDeals />
        <WhatCouplesAreSaying />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
