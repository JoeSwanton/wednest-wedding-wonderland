
import { useState } from "react";
import VendorLayout from "@/components/vendor/VendorLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Image, ToggleRight, ToggleLeft, ExternalLink, MoreHorizontal, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data for demonstration
const mockListings = [
  {
    id: '1',
    title: 'Premium Wedding Photography',
    description: 'Full day coverage with two photographers, edited photos, and online gallery.',
    status: 'live',
    featured: true,
    price: '$2,500',
    category: 'Photography',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    views: 156,
    inquiries: 12,
    instantBooking: true,
  },
  {
    id: '2',
    title: 'Engagement Session',
    description: '2-hour photoshoot at a location of your choice with 50+ edited photos.',
    status: 'draft',
    featured: false,
    price: '$600',
    category: 'Photography',
    coverImage: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    views: 0,
    inquiries: 0,
    instantBooking: false,
  },
  {
    id: '3',
    title: 'Wedding Video Highlights',
    description: 'Cinematic 5-8 minute highlight film of your special day.',
    status: 'pending',
    featured: false,
    price: '$1,800',
    category: 'Videography',
    coverImage: 'https://images.unsplash.com/photo-1519741347686-c1e0a12d0c1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    views: 42,
    inquiries: 3,
    instantBooking: true,
  }
];

const VendorListings = () => {
  const [listings] = useState(mockListings);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const filteredListings = activeFilter === "all" 
    ? listings 
    : listings.filter(listing => listing.status === activeFilter);
    
  return (
    <VendorLayout title="My Listings">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-600">Manage your service listings and packages</p>
        </div>
        <Button className="bg-wednest-sage hover:bg-wednest-sage-dark">
          <Plus className="mr-2 h-4 w-4" /> Add New Listing
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <Button 
          variant={activeFilter === "all" ? "default" : "outline"}
          onClick={() => setActiveFilter("all")}
          className={activeFilter === "all" ? "bg-wednest-sage hover:bg-wednest-sage-dark" : ""}
        >
          All ({listings.length})
        </Button>
        <Button 
          variant={activeFilter === "live" ? "default" : "outline"}
          onClick={() => setActiveFilter("live")}
          className={activeFilter === "live" ? "bg-wednest-sage hover:bg-wednest-sage-dark" : ""}
        >
          Live ({listings.filter(l => l.status === 'live').length})
        </Button>
        <Button 
          variant={activeFilter === "draft" ? "default" : "outline"}
          onClick={() => setActiveFilter("draft")}
          className={activeFilter === "draft" ? "bg-wednest-sage hover:bg-wednest-sage-dark" : ""}
        >
          Drafts ({listings.filter(l => l.status === 'draft').length})
        </Button>
        <Button 
          variant={activeFilter === "pending" ? "default" : "outline"}
          onClick={() => setActiveFilter("pending")}
          className={activeFilter === "pending" ? "bg-wednest-sage hover:bg-wednest-sage-dark" : ""}
        >
          Pending ({listings.filter(l => l.status === 'pending').length})
        </Button>
      </div>
      
      {/* Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredListings.map(listing => (
          <Card key={listing.id} className="overflow-hidden">
            <div className="relative h-40">
              <img 
                src={listing.coverImage} 
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                {listing.status === 'live' && (
                  <Badge className="bg-green-500">Live</Badge>
                )}
                {listing.status === 'draft' && (
                  <Badge className="bg-gray-500">Draft</Badge>
                )}
                {listing.status === 'pending' && (
                  <Badge className="bg-amber-500">Pending Review</Badge>
                )}
                {listing.featured && (
                  <Badge className="bg-purple-500">Featured</Badge>
                )}
              </div>
            </div>
            
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{listing.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" /> Edit Listing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Image className="mr-2 h-4 w-4" /> Manage Photos
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 h-4 w-4" /> View Public Page
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="flex items-center gap-2">
                {listing.category}
                <span className="text-wednest-sage-dark font-medium">{listing.price}</span>
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600">{listing.description}</p>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Instant Booking:</span>
                  {listing.instantBooking ? (
                    <ToggleRight className="h-5 w-5 text-wednest-sage" />
                  ) : (
                    <ToggleLeft className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1 text-gray-500" /> 
                    {listing.views}
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1 text-gray-500" /> 
                    {listing.inquiries}
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              
              {listing.status === 'draft' && (
                <Button size="sm" className="bg-wednest-sage hover:bg-wednest-sage-dark">
                  <CheckCircle className="mr-2 h-4 w-4" /> Publish
                </Button>
              )}
              
              {listing.status === 'pending' && (
                <Button size="sm" variant="outline" disabled>
                  <AlertCircle className="mr-2 h-4 w-4" /> Awaiting Approval
                </Button>
              )}
              
              {listing.status === 'live' && (
                <Button size="sm" variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" /> View Live
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </VendorLayout>
  );
};

export default VendorListings;
