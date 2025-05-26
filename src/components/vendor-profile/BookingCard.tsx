
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Star, CheckCircle, Shield, Award } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BookingCardProps {
  vendor: any;
  onReviewCountClick: () => void;
}

const BookingCard = ({ vendor, onReviewCountClick }: BookingCardProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [guestCount, setGuestCount] = useState<string>("");

  return (
    <div className="sticky top-6">
      <Card className="border border-gray-300 shadow-xl rounded-xl overflow-hidden">
        <CardContent className="p-6 space-y-6">
          {/* Price Section */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold text-theme-text-primary">{vendor.price.split(' - ')[0]}</span>
              <span className="text-theme-text-secondary">starting from</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-theme-brown text-theme-brown" />
                <span className="font-medium">{vendor.rating}</span>
              </div>
              <span className="text-gray-500">·</span>
              <button 
                onClick={onReviewCountClick}
                className="text-sm text-theme-text-secondary underline hover:text-theme-brown transition-colors"
              >
                ({vendor.reviewCount} reviews)
              </button>
            </div>
          </div>

          {/* Booking Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2 border border-gray-300 rounded-lg overflow-hidden">
              <div className="p-3 border-b border-gray-300">
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Event Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-left font-normal p-0 h-auto",
                        !selectedDate && "text-gray-900"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Add date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="p-3">
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Guests</label>
                <Select value={guestCount} onValueChange={setGuestCount}>
                  <SelectTrigger className="w-full border-0 p-0 h-auto font-normal">
                    <SelectValue placeholder="Add guest count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-25">1-25 guests</SelectItem>
                    <SelectItem value="26-50">26-50 guests</SelectItem>
                    <SelectItem value="51-100">51-100 guests</SelectItem>
                    <SelectItem value="101-150">101-150 guests</SelectItem>
                    <SelectItem value="151-200">151-200 guests</SelectItem>
                    <SelectItem value="200+">200+ guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full bg-theme-brown hover:bg-theme-brown-dark text-white py-3 text-base font-medium">
              Check availability
            </Button>

            <p className="text-center text-sm text-gray-500">You won't be charged yet</p>
          </div>

          <Separator />

          {/* Pricing Breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-theme-text-secondary underline">$1,200 x 1 day</span>
              <span className="text-theme-text-primary">$1,200</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span className="text-theme-text-primary">Total</span>
              <span className="text-theme-text-primary">$1,200</span>
            </div>
          </div>

          <Separator />

          {/* Vendor Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-theme-brown to-theme-brown-dark rounded-full flex items-center justify-center text-white font-semibold">
                RM
              </div>
              <div>
                <div className="font-medium text-theme-text-primary">Rhythm Masters</div>
                <div className="text-sm text-theme-text-secondary">Super Vendor</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-medium text-theme-text-primary">{vendor.reviewCount}</div>
                <div className="text-xs text-theme-text-secondary">Reviews</div>
              </div>
              <div>
                <div className="font-medium text-theme-text-primary">{vendor.rating}</div>
                <div className="text-xs text-theme-text-secondary">Rating</div>
              </div>
              <div>
                <div className="font-medium text-theme-text-primary">{vendor.yearsInBusiness}</div>
                <div className="text-xs text-theme-text-secondary">Years</div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-theme-text-secondary">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Usually responds within 2 hours</span>
              </div>
              <div className="flex items-center gap-2 text-theme-text-secondary">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>Verified vendor</span>
              </div>
              <div className="flex items-center gap-2 text-theme-text-secondary">
                <Award className="h-4 w-4 text-purple-500" />
                <span>Super Vendor status</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="border-theme-brown text-theme-brown hover:bg-gray-50 bg-theme-brown text-white hover:bg-theme-brown-dark">
              Message
            </Button>
            <Button variant="outline" className="border-theme-brown text-theme-brown hover:bg-gray-50 bg-theme-brown text-white hover:bg-theme-brown-dark">
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingCard;
