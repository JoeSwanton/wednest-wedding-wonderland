
export interface PortfolioImage {
  url: string;
  path: string;
  caption: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  priceRange: string;
  description: string;
  features: string[];
}

export interface VendorOnboardingData {
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
  willingToTravel?: boolean;
  
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

export type ApplicationStatus = 'pending_review' | 'verification_in_progress' | 'approved' | 'rejected' | 'changes_requested';

export interface VendorApplicationStatus {
  status: ApplicationStatus;
  message?: string;
  updatedAt?: string;
  feedback?: string;
  requiredActions?: string[];
}
