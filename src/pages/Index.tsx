
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrendingDestinations from "@/components/landing/TrendingDestinations";
import VendorListings from "@/components/VendorListings";
import FeaturedVendorsNearYou from "@/components/landing/FeaturedVendorsNearYou";
import PlanByTimeline from "@/components/landing/PlanByTimeline";
import LastMinuteDeals from "@/components/landing/LastMinuteDeals";
import WhatCouplesAreSaying from "@/components/landing/WhatCouplesAreSaying";
import CreateAccountCTA from "@/components/landing/CreateAccountCTA";
import RecentlyViewedVendors from "@/components/landing/RecentlyViewedVendors";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { usePerformanceMonitoring } from "@/hooks/usePerformanceMonitoring";

const Index = () => {
  const { user } = useAuth();
  usePerformanceMonitoring('Homepage');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <Separator className="bg-theme-brown h-[1px] w-full" />
      <main className="flex-grow">
        {/* Hero Search Bar - Keep top and expand (pill style with icons) */}
        <Hero />
        
        {/* Recently Viewed - Show after hero for signed in users */}
        {user && <RecentlyViewedVendors />}
        
        {/* Trending Destinations - 1st scroll section */}
        <TrendingDestinations />
        
        {/* Browse by Vendor Type - Below Trending */}
        <VendorListings />
        
        {/* Popular Vendors in Your City - Below Browse */}
        <FeaturedVendorsNearYou />
        
        {/* Last-Minute Deals - Mid-page placement */}
        <LastMinuteDeals />
        
        {/* Vendor by Timeline - Below Featured Vendors */}
        <PlanByTimeline />
        
        {/* Testimonials - Near footer */}
        <WhatCouplesAreSaying />
        
        {/* Create Account CTA - Only show when user is not signed in */}
        {!user && <CreateAccountCTA />}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
