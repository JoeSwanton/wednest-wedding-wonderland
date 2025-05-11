
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VendorLayout from "@/components/vendor/VendorLayout";
import { Eye, MessageSquare } from "lucide-react";

const mockListings = [
  {
    id: "1",
    title: "Premium Photography Package",
    description: "Full-day coverage with 2 photographers, 500+ edited photos, and a premium album.",
    price: "2,500",
    status: "published",
    views: 24,
    inquiries: 3,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  },
  {
    id: "2",
    title: "Engagement Photography Session",
    description: "2-hour engagement shoot with 75+ edited photos and online gallery.",
    price: "450",
    status: "draft",
    views: 0,
    inquiries: 0,
    image: "https://images.unsplash.com/photo-1529519694362-a4a77b339753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  },
  {
    id: "3",
    title: "Basic Photography Package",
    description: "6-hour coverage with 300+ edited photos and online gallery.",
    price: "1,200",
    status: "published",
    views: 18,
    inquiries: 2,
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  }
];

const VendorListings = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredListings = activeTab === "all" 
    ? mockListings 
    : mockListings.filter(listing => listing.status === activeTab);
  
  return (
    <VendorLayout title="My Listings">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-serif text-wednest-brown">Manage Your Listings</h2>
          <Button className="bg-wednest-sage hover:bg-wednest-sage-dark">
            Add New Listing
          </Button>
        </div>
        
        <p className="text-wednest-brown-light max-w-3xl">
          Create and manage your service listings to attract more couples. Well-described listings with high-quality images get more inquiries.
        </p>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Listings</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            {filteredListings.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p>No listings found. Create your first listing to get started.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="published" className="space-y-6">
            {filteredListings.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p>No published listings found.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="draft" className="space-y-6">
            {filteredListings.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p>No draft listings found.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </VendorLayout>
  );
};

const ListingCard = ({ listing }) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={listing.image} 
          alt={listing.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{listing.title}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full uppercase ${
            listing.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {listing.status}
          </span>
        </div>
        <CardDescription className="line-clamp-2">{listing.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-wednest-brown">Starting at ${listing.price}</p>
        <div className="flex gap-3 mt-2">
          <span className="text-sm flex items-center gap-1 text-gray-600">
            <Eye size={16} />
            {listing.views} views
          </span>
          <span className="text-sm flex items-center gap-1 text-gray-600">
            <MessageSquare size={16} />
            {listing.inquiries} inquiries
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="w-full">Edit</Button>
        <Button variant="outline" className="w-full">{listing.status === 'published' ? 'Unpublish' : 'Publish'}</Button>
      </CardFooter>
    </Card>
  );
};

export default VendorListings;
