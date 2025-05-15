
interface PortfolioImage {
  url: string;
  path: string;
  caption: string;
}

interface ServicePackage {
  id: string;
  name: string;
  priceRange: string;
  description: string;
  features: string[];
}

interface VendorOnboardingData {
  // Business Basics
  businessName: string;
  businessCategory: string;
  abn: string;
  yearsInBusiness: string;
  logoUrl: string;
  
  // Contact & Location
  phone: string;
  businessEmail: string;
  website: string;
  instagram: string;
  facebook: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  serviceRadius: string;
  
  // Business Description
  bio: string;
  tagline: string;
  specialties: string[];
  
  // Portfolio
  portfolioImages: PortfolioImage[];
  instagramFeed: string;
  
  // Service Packages
  servicePackages: ServicePackage[];
}
