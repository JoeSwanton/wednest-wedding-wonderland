
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
import ExploreByState from "@/components/landing/ExploreByState";
import SocialProofBanner from "@/components/landing/SocialProofBanner";
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
        {/* Hero Search Bar - Clean and focused */}
        <Hero />
        
        {/* Social Proof Banner - Right after hero */}
        <SocialProofBanner />
        
        {/* Recently Viewed - Show after hero for signed in users */}
        {user && <RecentlyViewedVendors />}
        
        {/* Last-Minute Deals - Moved higher up for urgency */}
        <LastMinuteDeals />
        
        {/* Trending Wedding Destinations */}
        <TrendingDestinations />
        
        {/* Explore by State - New location-based section */}
        <ExploreByState />
        
        {/* Browse by Vendor Type Section - Now as carousel */}
        <div className="w-full py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-serif text-theme-brown mb-2">
                Browse by Vendor Type
              </h2>
              <p className="text-theme-brown-light text-lg">
                Find exactly what you need for your perfect day
              </p>
            </div>
            
            <VendorListings />
          </div>
        </div>
        
        {/* Popular Vendors in Your City */}
        <FeaturedVendorsNearYou />
        
        {/* Testimonials - Moved higher with metrics */}
        <WhatCouplesAreSaying />
        
        {/* Vendor by Timeline */}
        <PlanByTimeline />
        
        {/* Create Account CTA - Only show when user is not signed in */}
        {!user && <CreateAccountCTA />}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
