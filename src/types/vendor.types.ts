
export interface VendorLocation {
  name: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface VendorContact {
  phone: string;
  email: string;
  website?: string;
  instagram?: string;
  facebook?: string;
}

export interface VendorPricing {
  basePrice: number;
  priceRange: string;
  currency: string;
  priceType: 'per_hour' | 'per_day' | 'per_event' | 'package';
}

export interface VendorAvailability {
  status: 'available' | 'limited' | 'booked';
  nextAvailableDate?: Date;
  blackoutDates?: Date[];
  responseTime: string;
}

export interface VendorReview {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: Date;
  verified: boolean;
}

export interface VendorPortfolioImage {
  id: string;
  url: string;
  thumbnail: string;
  alt: string;
  caption?: string;
  category: string;
}

export interface VendorData {
  id: number;
  type: string;
  name: string;
  location: string;
  availability: string;
  price: string;
  description: string;
  rating: number;
  tags: string[];
  imageUrl: string;
  verified_vendor?: boolean;
  reviewCount?: number;
  yearsInBusiness?: number;
  servicesOffered?: string[];
  specialties?: string[];
  
  // Extended properties
  contact?: VendorContact;
  pricing?: VendorPricing;
  availabilityDetails?: VendorAvailability;
  reviews?: VendorReview[];
  portfolio?: VendorPortfolioImage[];
  businessLicense?: string;
  insurance?: boolean;
  cancellationPolicy?: string;
}

export interface VendorFilters {
  category?: string;
  location?: string;
  priceRange?: [number, number];
  rating?: number;
  availability?: string;
  verified?: boolean;
  tags?: string[];
}

export interface VendorSearchParams extends VendorFilters {
  query?: string;
  sortBy?: 'relevance' | 'price' | 'rating' | 'distance';
  page?: number;
  limit?: number;
}

export interface VendorSearchResult {
  vendors: VendorData[];
  total: number;
  page: number;
  totalPages: number;
  filters: VendorFilters;
}

export interface SavedVendor {
  id: string;
  vendorId: number;
  userId: string;
  savedAt: Date;
  notes?: string;
}
