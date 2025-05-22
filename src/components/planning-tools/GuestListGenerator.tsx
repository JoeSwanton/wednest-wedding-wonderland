import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Download, PlusCircle, X } from "lucide-react";
import * as XLSX from 'xlsx';
import { useToast } from "@/hooks/use-toast";
import { nanoid } from "nanoid";
import ToolShareCta from "./ToolShareCta";

type GuestGroup = "bride" | "groom" | "both";
type GuestStatus = "invited" | "confirmed" | "declined" | "pending";

interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  group: GuestGroup;
  status: GuestStatus;
  plusOne: boolean;
  notes: string;
}

export const GuestListGenerator = () => {
  const { toast } = useToast();
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: nanoid(),
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
      phone: "555-123-4567",
      group: "bride",
      status: "invited",
      plusOne: true,
      notes: "Allergic to nuts"
    },
    {
      id: nanoid(),
      firstName: "Emily",
      lastName: "Johnson",
      email: "emily.j@example.com",
      phone: "555-987-6543",
      group: "groom",
      status: "confirmed",
      plusOne: false,
      notes: ""
    },
  ]);
  
  const [newGuest, setNewGuest] = useState<Guest>({
    id: nanoid(),
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    group: "both",
    status: "invited",
    plusOne: false,
    notes: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGuest(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: any) => {
    setNewGuest(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePlusOneChange = () => {
    setNewGuest(prev => ({ ...prev, plusOne: !prev.plusOne }));
  };
  
  const addGuest = () => {
    if (!newGuest.firstName || !newGuest.lastName) {
      toast({
        title: "Missing information",
        description: "Please provide at least the first and last name.",
        variant: "destructive"
      });
      return;
    }
    
    setGuests(prev => [...prev, { ...newGuest, id: nanoid() }]);
    
    // Reset form
    setNewGuest({
      id: nanoid(),
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      group: "both",
      status: "invited",
      plusOne: false,
      notes: ""
    });
    
    toast({
      title: "Guest Added",
      description: `${newGuest.firstName} ${newGuest.lastName} has been added to your guest list.`
    });
  };
  
  const removeGuest = (id: string) => {
    setGuests(prev => prev.filter(guest => guest.id !== id));
    
    toast({
      title: "Guest Removed",
      description: "The guest has been removed from your list."
    });
  };
  
  const downloadExcel = () => {
    // Prepare data for Excel
    const worksheet = XLSX.utils.json_to_sheet(guests.map(guest => ({
      "First Name": guest.firstName,
      "Last Name": guest.lastName,
      "Email": guest.email,
      "Phone": guest.phone,
      "Group": guest.group.charAt(0).toUpperCase() + guest.group.slice(1),
      "Status": guest.status.charAt(0).toUpperCase() + guest.status.slice(1),
      "Plus One": guest.plusOne ? "Yes" : "No",
      "Notes": guest.notes
    })));
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Guest List");
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "wedding_guest_list.xlsx");
    
    toast({
      title: "Guest List Downloaded",
      description: "Your guest list has been downloaded as an Excel file."
    });
  };
  
  // Guest stats
  const totalGuests = guests.length;
  const confirmedGuests = guests.filter(g => g.status === "confirmed").length;
  const plusOnes = guests.filter(g => g.plusOne).length;
  const potentialTotal = totalGuests + plusOnes;

  return (
    <div className="space-y-8">
      <Card className="border-theme-beige shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-theme-sage-dark/10 p-3 rounded-full">
              <Users className="h-6 w-6 text-theme-sage-dark" />
            </div>
            <div>
              <CardTitle className="text-2xl font-serif text-theme-brown">Guest List Generator</CardTitle>
              <CardDescription>Create and download a guest list for your wedding</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-theme-cream/20 p-4 rounded-md text-center">
              <p className="text-sm text-theme-brown-light mb-1">Total Guests</p>
              <p className="text-2xl font-medium text-theme-brown">{totalGuests}</p>
              <p className="text-xs text-theme-brown-light mt-1">
                Potential: {potentialTotal} (with plus ones)
              </p>
            </div>
            <div className="bg-theme-cream/20 p-4 rounded-md text-center">
              <p className="text-sm text-theme-brown-light mb-1">Confirmed</p>
              <p className="text-2xl font-medium text-theme-brown">{confirmedGuests}</p>
              <p className="text-xs text-theme-brown-light mt-1">
                {Math.round((confirmedGuests / totalGuests) * 100) || 0}% of invites
              </p>
            </div>
            <div className="bg-theme-cream/20 p-4 rounded-md text-center">
              <p className="text-sm text-theme-brown-light mb-1">Plus Ones</p>
              <p className="text-2xl font-medium text-theme-brown">{plusOnes}</p>
              <p className="text-xs text-theme-brown-light mt-1">
                {Math.round((plusOnes / totalGuests) * 100) || 0}% of guests
              </p>
            </div>
          </div>
          
          <div className="border-t border-theme-beige pt-6">
            <h3 className="text-lg font-medium text-theme-brown mb-4">Add Guest</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormItem>
                <FormLabel>First Name*</FormLabel>
                <FormControl>
                  <Input 
                    name="firstName"
                    value={newGuest.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                  />
                </FormControl>
              </FormItem>
              
              <FormItem>
                <FormLabel>Last Name*</FormLabel>
                <FormControl>
                  <Input 
                    name="lastName"
                    value={newGuest.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                  />
                </FormControl>
              </FormItem>
              
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    name="email"
                    value={newGuest.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                </FormControl>
              </FormItem>
              
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input 
                    name="phone"
                    value={newGuest.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                  />
                </FormControl>
              </FormItem>
              
              <FormItem>
                <FormLabel>Group</FormLabel>
                <Select 
                  value={newGuest.group} 
                  onValueChange={(value) => handleSelectChange("group", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bride">Bride's Side</SelectItem>
                    <SelectItem value="groom">Groom's Side</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
              
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select 
                  value={newGuest.status} 
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="invited">Invited</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="declined">Declined</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
              
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Input 
                    name="notes"
                    value={newGuest.notes}
                    onChange={handleInputChange}
                    placeholder="Any notes or dietary requirements"
                  />
                </FormControl>
              </FormItem>
              
              <div className="flex items-end gap-4">
                <FormItem className="flex items-center space-x-2 h-10">
                  <input
                    type="checkbox"
                    id="plusOne"
                    checked={newGuest.plusOne}
                    onChange={handlePlusOneChange}
                    className="h-4 w-4"
                  />
                  <label htmlFor="plusOne" className="text-sm font-medium leading-none">
                    Plus One
                  </label>
                </FormItem>
                
                <Button 
                  className="bg-theme-sage hover:bg-theme-sage-dark text-white flex-1"
                  onClick={addGuest}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Guest
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-theme-beige pt-6">
            <h3 className="text-lg font-medium text-theme-brown mb-4">Guest List</h3>
            
            <div className="rounded-md border border-theme-beige overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Group</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Plus One</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-theme-brown-light">
                        No guests added yet. Add your first guest above.
                      </TableCell>
                    </TableRow>
                  ) : (
                    guests.map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-theme-brown">{guest.firstName} {guest.lastName}</p>
                            <p className="text-xs text-theme-brown-light md:hidden">{guest.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{guest.email}</TableCell>
                        <TableCell className="hidden md:table-cell capitalize">{guest.group}</TableCell>
                        <TableCell>
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            guest.status === "confirmed" ? "bg-green-100 text-green-800" : 
                            guest.status === "declined" ? "bg-red-100 text-red-800" :
                            guest.status === "pending" ? "bg-orange-100 text-orange-800" :
                            "bg-blue-100 text-blue-800"
                          }`}>
                            {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{guest.plusOne ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeGuest(guest.id)} 
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4 text-theme-brown-light" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="mt-6 border-theme-sage-dark text-theme-sage-dark hover:bg-theme-sage-dark hover:text-white flex items-center gap-2"
            onClick={downloadExcel}
            disabled={guests.length === 0}
          >
            <Download className="h-4 w-4" />
            Download Guest List Excel
          </Button>
        </CardContent>
      </Card>

      <ToolShareCta 
        title="Guest List Generator" 
        description="Create, manage, and download a complete wedding guest list with our free Excel generator tool. Track RSVPs, manage plus ones, and more." 
      />
    </div>
  );
};
