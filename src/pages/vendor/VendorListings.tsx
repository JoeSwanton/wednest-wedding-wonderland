
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VendorLayout from "@/components/vendor/VendorLayout";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { Eye, MessageSquare, Plus, Edit, Upload, Trash2, ImagePlus } from "lucide-react";

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

// Form schema for listing
const listingFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Please provide a description (at least 10 characters)"),
  price: z.string().min(1, "Price is required"),
  status: z.string({
    required_error: "Please select a status",
  }),
});

const VendorListings = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [listings, setListings] = useState(mockListings);
  const [editingListing, setEditingListing] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filter listings based on active tab
  const filteredListings = activeTab === "all" 
    ? listings 
    : listings.filter(listing => listing.status === activeTab);
  
  // Define form for adding/editing listings
  const form = useForm({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      status: "draft",
    }
  });

  const handleAddListingClick = () => {
    setEditingListing(null);
    form.reset({
      title: "",
      description: "",
      price: "",
      status: "draft",
    });
    setIsDialogOpen(true);
  };

  const handleEditListingClick = (listing) => {
    setEditingListing(listing);
    form.reset({
      title: listing.title,
      description: listing.description,
      price: listing.price,
      status: listing.status,
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (values) => {
    if (editingListing) {
      // Update existing listing
      setListings(listings.map(listing => 
        listing.id === editingListing.id 
          ? { ...listing, ...values } 
          : listing
      ));
      toast({
        title: "Listing updated",
        description: "Your listing has been updated successfully.",
      });
    } else {
      // Add new listing
      const newListing = {
        id: `${listings.length + 1}`,
        ...values,
        views: 0,
        inquiries: 0,
        image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
      };
      setListings([...listings, newListing]);
      toast({
        title: "Listing created",
        description: "Your new listing has been created successfully.",
      });
    }
    setIsDialogOpen(false);
  };

  const handleListingStatusToggle = (listingId) => {
    setListings(listings.map(listing => 
      listing.id === listingId 
        ? { 
            ...listing, 
            status: listing.status === "published" ? "draft" : "published" 
          } 
        : listing
    ));
    
    toast({
      title: "Status updated",
      description: `Listing has been ${listings.find(l => l.id === listingId).status === "published" ? "unpublished" : "published"}.`,
    });
  };

  return (
    <VendorLayout title="My Listings">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-serif text-wednest-brown">Manage Your Listings</h2>
          <Button 
            onClick={handleAddListingClick} 
            className="bg-wednest-sage hover:bg-wednest-sage-dark flex items-center gap-2"
          >
            <Plus size={16} /> Add New Listing
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
                  <ListingCard 
                    key={listing.id} 
                    listing={listing} 
                    onEdit={() => handleEditListingClick(listing)}
                    onStatusToggle={() => handleListingStatusToggle(listing.id)}
                  />
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
                  <ListingCard 
                    key={listing.id} 
                    listing={listing} 
                    onEdit={() => handleEditListingClick(listing)}
                    onStatusToggle={() => handleListingStatusToggle(listing.id)}
                  />
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
                  <ListingCard 
                    key={listing.id} 
                    listing={listing} 
                    onEdit={() => handleEditListingClick(listing)}
                    onStatusToggle={() => handleListingStatusToggle(listing.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-wednest-brown font-serif">
              {editingListing ? "Edit Listing" : "Create New Listing"}
            </DialogTitle>
            <DialogDescription>
              {editingListing 
                ? "Update your listing details below. Click save when you're done." 
                : "Fill in the details for your new service listing."}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Premium Wedding Photography" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe your service in detail..." rows={5} {...field} />
                        </FormControl>
                        <FormDescription>
                          Be specific about what's included in this package or service.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex-1 space-y-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 2500" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the starting price for this service (numbers only).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Draft listings are only visible to you until published.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 mt-4 flex flex-col items-center justify-center">
                    <ImagePlus className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-1">Upload cover image</p>
                    <p className="text-xs text-gray-400">Click or drag image here</p>
                    <input type="file" className="hidden" />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit" className="bg-wednest-sage hover:bg-wednest-sage-dark">
                  {editingListing ? "Save Changes" : "Create Listing"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </VendorLayout>
  );
};

const ListingCard = ({ listing, onEdit, onStatusToggle }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden relative group">
        <img 
          src={listing.image} 
          alt={listing.title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button variant="secondary" size="sm" className="rounded-full" onClick={onEdit}>
            <Edit size={16} className="mr-1" /> Edit
          </Button>
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-wednest-brown">{listing.title}</CardTitle>
          <Badge className={`${
            listing.status === 'published' 
              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}>
            {listing.status === 'published' ? 'Published' : 'Draft'}
          </Badge>
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
        <Button variant="outline" className="w-full" onClick={onEdit}>Edit</Button>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={onStatusToggle}
        >
          {listing.status === 'published' ? 'Unpublish' : 'Publish'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VendorListings;
