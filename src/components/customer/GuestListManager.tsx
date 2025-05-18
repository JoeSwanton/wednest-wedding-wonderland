
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Upload, Download, Search, Edit, Trash2, User } from "lucide-react";

// Sample data - would be replaced with actual user data from backend
const initialGuests = [
  { id: 1, name: "John Smith", email: "john@example.com", phone: "555-123-4567", rsvp: "Yes", tags: ["Family"], plusOne: true },
  { id: 2, name: "Jane Doe", email: "jane@example.com", phone: "555-987-6543", rsvp: "No", tags: ["Friends"], plusOne: false },
  { id: 3, name: "Robert Johnson", email: "robert@example.com", phone: "555-567-8901", rsvp: "Maybe", tags: ["VIP", "Family"], plusOne: true },
  { id: 4, name: "Emily Williams", email: "emily@example.com", phone: "555-345-6789", rsvp: "Yes", tags: ["Friends"], plusOne: false },
  { id: 5, name: "Michael Brown", email: "michael@example.com", phone: "555-901-2345", rsvp: "Awaiting", tags: ["Work"], plusOne: false },
];

const GuestListManager = () => {
  const [guests, setGuests] = useState(initialGuests);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: "", email: "", phone: "", rsvp: "Awaiting", tags: [], plusOne: false });
  
  // Count RSVPs
  const rsvpCounts = {
    attending: guests.filter(g => g.rsvp === "Yes").length,
    declined: guests.filter(g => g.rsvp === "No").length,
    maybe: guests.filter(g => g.rsvp === "Maybe").length,
    awaiting: guests.filter(g => g.rsvp === "Awaiting").length,
    total: guests.length,
    plusOnes: guests.filter(g => g.plusOne).length
  };
  
  const totalAttending = rsvpCounts.attending + rsvpCounts.plusOnes;
  
  // Filter guests based on search and tab
  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddGuest = () => {
    if (newGuest.name) {
      setGuests([
        ...guests,
        {
          id: guests.length + 1,
          ...newGuest,
          tags: Array.isArray(newGuest.tags) ? newGuest.tags : []
        }
      ]);
      setNewGuest({ name: "", email: "", phone: "", rsvp: "Awaiting", tags: [], plusOne: false });
      setShowAddForm(false);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* RSVP Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <p className="text-sm text-muted-foreground">Attending</p>
            <p className="text-3xl font-bold text-green-600">{rsvpCounts.attending}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <p className="text-sm text-muted-foreground">Maybe</p>
            <p className="text-3xl font-bold text-amber-600">{rsvpCounts.maybe}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <p className="text-sm text-muted-foreground">Declined</p>
            <p className="text-3xl font-bold text-red-600">{rsvpCounts.declined}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <p className="text-sm text-muted-foreground">Awaiting</p>
            <p className="text-3xl font-bold text-gray-600">{rsvpCounts.awaiting}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <p className="text-sm text-muted-foreground">Total Attending</p>
            <p className="text-3xl font-bold text-theme-brown">{totalAttending}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Guest List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Guest List</CardTitle>
            <CardDescription>Manage your wedding guests and RSVPs</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Guest
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <div className="bg-muted p-4 rounded-md mb-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input 
                  placeholder="Guest Name" 
                  value={newGuest.name} 
                  onChange={(e) => setNewGuest({...newGuest, name: e.target.value})}
                />
                <Input 
                  placeholder="Email" 
                  value={newGuest.email} 
                  onChange={(e) => setNewGuest({...newGuest, email: e.target.value})}
                />
                <Input 
                  placeholder="Phone" 
                  value={newGuest.phone} 
                  onChange={(e) => setNewGuest({...newGuest, phone: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <Select 
                  value={newGuest.rsvp} 
                  onValueChange={(value) => setNewGuest({...newGuest, rsvp: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="RSVP Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Maybe">Maybe</SelectItem>
                    <SelectItem value="Awaiting">Awaiting</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input 
                  placeholder="Tags (comma separated)" 
                  onChange={(e) => setNewGuest({...newGuest, tags: e.target.value.split(',')})}
                />
                
                <div className="flex items-center gap-2">
                  <label className="text-sm">
                    <input 
                      type="checkbox" 
                      checked={newGuest.plusOne} 
                      onChange={(e) => setNewGuest({...newGuest, plusOne: e.target.checked})}
                      className="mr-2" 
                    />
                    Plus One
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button onClick={handleAddGuest}>Add Guest</Button>
                <Button variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </div>
          )}
          
          <div className="mb-4 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search guests..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by RSVP" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Guests</SelectItem>
                <SelectItem value="attending">Attending</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
                <SelectItem value="maybe">Maybe</SelectItem>
                <SelectItem value="awaiting">Awaiting</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">RSVP</th>
                  <th className="px-4 py-2 text-left">Tags</th>
                  <th className="px-4 py-2 text-center">+1</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.length > 0 ? filteredGuests.map((guest) => (
                  <tr key={guest.id} className="border-t">
                    <td className="px-4 py-2">{guest.name}</td>
                    <td className="px-4 py-2">{guest.email}</td>
                    <td className="px-4 py-2">
                      <Badge className={`
                        ${guest.rsvp === "Yes" ? "bg-green-100 text-green-800" : ""}
                        ${guest.rsvp === "No" ? "bg-red-100 text-red-800" : ""}
                        ${guest.rsvp === "Maybe" ? "bg-yellow-100 text-yellow-800" : ""}
                        ${guest.rsvp === "Awaiting" ? "bg-gray-100 text-gray-800" : ""}
                      `}>
                        {guest.rsvp}
                      </Badge>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-1 flex-wrap">
                        {guest.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center">
                      {guest.plusOne ? <span className="text-green-500">✓</span> : "—"}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="icon" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No guests found. Add a guest to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">Total: {filteredGuests.length} guests</p>
          <Button variant="outline" disabled>Generate RSVP Form</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GuestListManager;
