
import { useState } from "react";

// Mock data for bookings
const initialBookings = [
  { 
    id: 1, 
    clientName: "Emma & James",
    type: "Wedding Photography", 
    status: "confirmed", 
    date: new Date(2025, 5, 15),
    time: "11:00 AM - 7:00 PM",
    location: "Rosewood Estate, Hunter Valley",
    notes: "Outdoor ceremony followed by reception in the main hall."
  },
  { 
    id: 2, 
    clientName: "Sophia & William",
    type: "Engagement Session", 
    status: "pending", 
    date: new Date(2025, 5, 22),
    time: "4:00 PM - 6:00 PM",
    location: "Botanical Gardens, Sydney",
    notes: "Couple prefers natural, candid shots. Bring extra lighting for sunset."
  },
  { 
    id: 3, 
    clientName: "Oliver & Charlotte",
    type: "Wedding Photography", 
    status: "confirmed", 
    date: new Date(2025, 6, 8),
    time: "12:00 PM - 8:00 PM",
    location: "Harborview Hotel, Sydney",
    notes: "Indoor ceremony and reception. Requested extra focus on family portraits."
  }
];

// Mock data for blocked dates
const initialBlockedDates = [
  { id: 1, reason: "Personal Time Off", date: new Date(2025, 5, 18) },
  { id: 2, reason: "Equipment Maintenance", date: new Date(2025, 5, 19) },
  { id: 3, reason: "Holiday", date: new Date(2025, 7, 1) }
];

interface Booking {
  id: number;
  clientName: string;
  type: string;
  status: string;
  date: Date;
  time: string;
  location: string;
  notes: string;
}

interface BlockedDate {
  id: number;
  reason: string;
  date: Date;
}

export function useBookingsData() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>(initialBlockedDates);

  const addBlockedDate = (blockedDate: { date: Date; reason: string }) => {
    const newBlockedDate = {
      id: blockedDates.length + 1,
      date: blockedDate.date,
      reason: blockedDate.reason || "Unavailable",
    };
    
    setBlockedDates([...blockedDates, newBlockedDate]);
    return newBlockedDate;
  };

  const upcomingBookings = bookings.filter(b => b.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const pastBookings = bookings.filter(b => b.date < new Date())
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return {
    bookings,
    blockedDates,
    upcomingBookings,
    pastBookings,
    addBlockedDate
  };
}
