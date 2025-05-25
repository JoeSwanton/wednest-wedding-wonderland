
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Plus, Mail, Phone, MapPin, Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

interface Guest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  group: "family" | "friends" | "work" | "partner_family" | "partner_friends";
  rsvpStatus: "pending" | "attending" | "declined" | "maybe";
  plusOne: boolean;
  dietaryRestrictions?: string;
}

const GuestList = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGroup, setFilterGroup] = useState<string>("all");
  const [filterRsvp, setFilterRsvp] = useState<string>("all");
  
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+61 400 123 456",
      address: "123 Main St, Melbourne VIC 3000",
      group: "friends",
      rsvpStatus: "attending",
      plusOne: true,
      dietaryRestrictions: "Vegetarian"
    },
    {
      id: "2",
      name: "Michael Smith",
      email: "michael.smith@email.com",
      group: "family",
      rsvpStatus: "pending",
      plusOne: false
    },
    {
      id: "3",
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      phone: "+61 400 789 012",
      group: "work",
      rsvpStatus: "attending",
      plusOne: true
    },
    {
      id: "4",
      name: "David Brown",
      email: "david.brown@email.com",
      group: "partner_family",
      rsvpStatus: "declined",
      plusOne: false
    },
    {
      id: "5",
      name: "Lisa Davis",
      email: "lisa.davis@email.com",
      group: "partner_friends",
      rsvpStatus: "maybe",
      plusOne: true,
      dietaryRestrictions: "Gluten-free"
    }
  ]);

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = filterGroup === "all" || guest.group === filterGroup;
    const matchesRsvp = filterRsvp === "all" || guest.rsvpStatus === filterRsvp;
    
    return matchesSearch && matchesGroup && matchesRsvp;
  });

  const totalGuests = guests.length;
  const attendingCount = guests.filter(g => g.rsvpStatus === "attending").length;
  const pendingCount = guests.filter(g => g.rsvpStatus === "pending").length;
  const declinedCount = guests.filter(g => g.rsvpStatus === "declined").length;
  const plusOnesCount = guests.filter(g => g.plusOne && g.rsvpStatus === "attending").length;

  const getRsvpBadgeColor = (status: string) => {
    switch (status) {
      case "attending": return "bg-green-100 text-green-800 border-green-200";
      case "declined": return "bg-red-100 text-red-800 border-red-200";
      case "maybe": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getGroupLabel = (group: string) => {
    switch (group) {
      case "family": return "Family";
      case "friends": return "Friends";
      case "work": return "Work";
      case "partner_family": return "Partner's Family";
      case "partner_friends": return "Partner's Friends";
      default: return group;
    }
  };

  return (
    <div className="min-h-screen flex bg-theme-cream/10">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-serif font-semibold text-theme-brown mb-2">Guest List</h1>
            <p className="text-theme-brown-light">Manage your wedding guest list and RSVPs</p>
          </div>

          {/* Guest Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card className="bg-white border-theme-cream shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-theme-brown/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-theme-brown" />
                  </div>
                  <div>
                    <p className="text-sm text-theme-brown-light">Total Guests</p>
                    <p className="text-xl font-semibold text-theme-brown">{totalGuests}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-theme-cream shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-theme-brown-light">Attending</p>
                    <p className="text-xl font-semibold text-green-600">{attendingCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-theme-cream shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-theme-brown-light">Pending</p>
                    <p className="text-xl font-semibold text-gray-600">{pendingCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-theme-cream shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-theme-brown-light">Declined</p>
                    <p className="text-xl font-semibold text-red-600">{declinedCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-theme-cream shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Plus className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-theme-brown-light">Plus Ones</p>
                    <p className="text-xl font-semibold text-blue-600">{plusOnesCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6 bg-white border-theme-cream shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-theme-brown-light" />
                    <Input
                      placeholder="Search guests by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={filterGroup} onValueChange={setFilterGroup}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Groups</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="friends">Friends</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="partner_family">Partner's Family</SelectItem>
                    <SelectItem value="partner_friends">Partner's Friends</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterRsvp} onValueChange={setFilterRsvp}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by RSVP" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All RSVPs</SelectItem>
                    <SelectItem value="attending">Attending</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="declined">Declined</SelectItem>
                    <SelectItem value="maybe">Maybe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Guest List */}
          <Card className="bg-white border-theme-cream shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-theme-brown">Guests ({filteredGuests.length})</CardTitle>
              <Button className="bg-theme-brown text-white hover:bg-theme-brown-dark">
                <Plus className="h-4 w-4 mr-2" />
                Add Guest
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredGuests.map((guest) => (
                  <div key={guest.id} className="border border-theme-cream/50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-theme-brown">{guest.name}</h4>
                          <Badge variant="outline" className={getRsvpBadgeColor(guest.rsvpStatus)}>
                            {guest.rsvpStatus}
                          </Badge>
                          <Badge variant="outline" className="border-theme-beige text-theme-brown-light">
                            {getGroupLabel(guest.group)}
                          </Badge>
                          {guest.plusOne && (
                            <Badge variant="outline" className="border-blue-200 text-blue-800 bg-blue-50">
                              +1
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-theme-brown-light">
                          {guest.email && (
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span>{guest.email}</span>
                            </div>
                          )}
                          {guest.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{guest.phone}</span>
                            </div>
                          )}
                          {guest.address && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{guest.address}</span>
                            </div>
                          )}
                        </div>
                        
                        {guest.dietaryRestrictions && (
                          <div className="mt-2">
                            <span className="text-xs text-theme-brown-light">
                              Dietary: {guest.dietaryRestrictions}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Send Invite
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GuestList;
