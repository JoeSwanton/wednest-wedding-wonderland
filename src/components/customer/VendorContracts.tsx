
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Search, FileText, Phone, Mail, Calendar, ExternalLink, Trash2, FilePlus, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data - would be replaced with actual user data from backend
const initialVendors = [
  { 
    id: 1, 
    name: "Elegant Moments Venue", 
    category: "venue", 
    contactName: "Michael Smith",
    phone: "555-123-4567",
    email: "michael@elegantmoments.com",
    nextPayment: {
      amount: 2500,
      dueDate: "2024-02-15"
    },
    documents: [
      { id: 101, name: "Venue Contract.pdf", type: "contract", date: "2023-10-15" },
      { id: 102, name: "Deposit Receipt.pdf", type: "invoice", date: "2023-10-20" }
    ]
  },
  { 
    id: 2, 
    name: "Shutter Dream Photography", 
    category: "photography", 
    contactName: "Emma Johnson",
    phone: "555-987-6543",
    email: "emma@shutterdream.com",
    nextPayment: {
      amount: 1000,
      dueDate: "2024-03-10"
    },
    documents: [
      { id: 103, name: "Photography Contract.pdf", type: "contract", date: "2023-11-05" }
    ]
  },
  { 
    id: 3, 
    name: "Divine Catering Co.", 
    category: "catering", 
    contactName: "David Wilson",
    phone: "555-456-7890",
    email: "david@divinecatering.com",
    nextPayment: {
      amount: 3500,
      dueDate: "2024-04-20"
    },
    documents: [
      { id: 104, name: "Catering Agreement.pdf", type: "contract", date: "2023-12-01" },
      { id: 105, name: "Menu Selection.pdf", type: "document", date: "2023-12-10" }
    ]
  },
];

const vendorCategories = [
  "venue", "catering", "photography", "videography", "florist", 
  "music", "cake", "dress", "suit", "beauty", "transportation", "stationery"
];

const VendorContracts = () => {
  const [vendors, setVendors] = useState(initialVendors);
  const [activeVendor, setActiveVendor] = useState<number | null>(1); // Default to first vendor
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [newVendor, setNewVendor] = useState({
    name: "",
    category: "",
    contactName: "",
    phone: "",
    email: "",
    nextPayment: {
      amount: 0,
      dueDate: ""
    },
    documents: []
  });
  
  // Filter vendors based on search
  const filteredVendors = vendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const selectedVendor = vendors.find(v => v.id === activeVendor);
  
  const handleAddVendor = () => {
    if (newVendor.name && newVendor.category) {
      setVendors([
        ...vendors,
        {
          id: vendors.length + 1,
          ...newVendor,
          documents: []
        }
      ]);
      setNewVendor({
        name: "",
        category: "",
        contactName: "",
        phone: "",
        email: "",
        nextPayment: {
          amount: 0,
          dueDate: ""
        },
        documents: []
      });
      setShowAddForm(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vendor List */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Vendors</CardTitle>
                <Button onClick={() => setShowAddForm(!showAddForm)}>
                  <span className="sr-only lg:not-sr-only lg:ml-2">Add Vendor</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showAddForm ? (
                <div className="space-y-4">
                  <h3 className="font-medium">Add New Vendor</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="vendor-name">Vendor Name</Label>
                    <Input 
                      id="vendor-name"
                      placeholder="Business name" 
                      value={newVendor.name} 
                      onChange={(e) => setNewVendor({...newVendor, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="vendor-category">Category</Label>
                    <Select 
                      value={newVendor.category} 
                      onValueChange={(value) => setNewVendor({...newVendor, category: value})}
                    >
                      <SelectTrigger id="vendor-category">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {vendorCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Contact Person</Label>
                    <Input 
                      id="contact-name"
                      placeholder="Name" 
                      value={newVendor.contactName} 
                      onChange={(e) => setNewVendor({...newVendor, contactName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input 
                      id="contact-email"
                      type="email"
                      placeholder="Email" 
                      value={newVendor.email} 
                      onChange={(e) => setNewVendor({...newVendor, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input 
                      id="contact-phone"
                      placeholder="Phone number" 
                      value={newVendor.phone} 
                      onChange={(e) => setNewVendor({...newVendor, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="pt-2 flex justify-end gap-2">
                    <Button onClick={handleAddVendor}>Save</Button>
                    <Button variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative mb-4">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search vendors..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    {filteredVendors.length > 0 ? filteredVendors.map((vendor) => (
                      <div 
                        key={vendor.id}
                        className={`p-3 rounded-md cursor-pointer flex gap-3 items-center ${activeVendor === vendor.id ? 'bg-theme-brown/10 border border-theme-brown/30' : 'hover:bg-muted'}`}
                        onClick={() => setActiveVendor(vendor.id)}
                      >
                        <div className="bg-muted w-10 h-10 rounded-full flex items-center justify-center">
                          <span className="text-lg capitalize">{vendor.name[0]}</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{vendor.name}</div>
                          <div className="text-xs text-muted-foreground capitalize">{vendor.category}</div>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No vendors found.</p>
                        <Button 
                          variant="link" 
                          onClick={() => {
                            setSearchTerm("");
                            setShowAddForm(true);
                          }}
                        >
                          Add your first vendor
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Vendor Details */}
        <div className="lg:col-span-2">
          {selectedVendor ? (
            <Card className="h-full">
              <Tabs defaultValue="documents">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{selectedVendor.name}</CardTitle>
                      <CardDescription className="capitalize">{selectedVendor.category}</CardDescription>
                    </div>
                    <TabsList>
                      <TabsTrigger value="documents">Documents</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>
                  </div>
                </CardHeader>
                <CardContent>
                  <TabsContent value="documents" className="mt-0">
                    <div className="mb-4 flex justify-between items-center">
                      <h3 className="font-medium">Contracts & Documents</h3>
                      <div>
                        <Button onClick={() => setShowFileUpload(!showFileUpload)}>
                          <Upload className="h-4 w-4 mr-2" /> Upload Document
                        </Button>
                      </div>
                    </div>
                    
                    {showFileUpload && (
                      <Card className="mb-4">
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="document-type">Document Type</Label>
                              <Select defaultValue="contract">
                                <SelectTrigger id="document-type">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="contract">Contract</SelectItem>
                                  <SelectItem value="invoice">Invoice</SelectItem>
                                  <SelectItem value="quote">Quote</SelectItem>
                                  <SelectItem value="document">Other Document</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="file-upload">File</Label>
                              <div className="border-2 border-dashed rounded-md p-6 text-center">
                                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                  Drag and drop or click to upload your document
                                </p>
                                <input id="file-upload" type="file" className="hidden" />
                                <Button variant="outline" className="mt-2">
                                  <FilePlus className="h-4 w-4 mr-2" /> Select File
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex justify-end gap-2">
                              <Button>Upload</Button>
                              <Button variant="ghost" onClick={() => setShowFileUpload(false)}>Cancel</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {selectedVendor.documents.length === 0 ? (
                      <div className="text-center py-8 border rounded-md">
                        <FileText className="h-10 w-10 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-muted-foreground">No documents added yet.</p>
                        <p className="text-sm text-muted-foreground">Upload contracts or invoices to keep them organized.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedVendor.documents.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between border rounded-md p-3">
                            <div className="flex items-center gap-3">
                              <FileText className="h-8 w-8 text-theme-brown" />
                              <div>
                                <div className="font-medium">{doc.name}</div>
                                <div className="flex gap-3 text-xs text-muted-foreground">
                                  <Badge variant="outline" className="capitalize">{doc.type}</Badge>
                                  <span>Added: {new Date(doc.date).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" title="View Document">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Delete">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-0">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {selectedVendor.contactName && (
                            <div className="flex items-center mb-3">
                              <User className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{selectedVendor.contactName}</span>
                            </div>
                          )}
                          
                          {selectedVendor.email && (
                            <div className="flex items-center mb-3">
                              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                              <a href={`mailto:${selectedVendor.email}`} className="text-theme-brown hover:underline">{selectedVendor.email}</a>
                            </div>
                          )}
                          
                          {selectedVendor.phone && (
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                              <a href={`tel:${selectedVendor.phone}`} className="text-theme-brown hover:underline">{selectedVendor.phone}</a>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Payment Schedule</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {selectedVendor.nextPayment?.amount ? (
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-medium">Next Payment</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Calendar className="h-3 w-3 mr-1" /> 
                                  Due {new Date(selectedVendor.nextPayment.dueDate).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="text-xl font-bold">
                                ${selectedVendor.nextPayment.amount.toLocaleString()}
                              </div>
                            </div>
                          ) : (
                            <p className="text-center text-muted-foreground py-2">
                              No payment information added
                            </p>
                          )}
                          
                          <Button variant="outline" className="w-full mt-2">
                            <Calendar className="mr-2 h-4 w-4" /> Add Payment Schedule
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Input placeholder="Add notes about this vendor..." />
                          <Button variant="ghost" className="w-full mt-2">
                            Save Notes
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center p-8">
              <div className="text-center">
                <FileText className="h-10 w-10 mx-auto text-muted-foreground" />
                <h3 className="mt-4 font-medium">No Vendor Selected</h3>
                <p className="text-muted-foreground mt-2">
                  Select a vendor from the list or add a new one
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorContracts;
