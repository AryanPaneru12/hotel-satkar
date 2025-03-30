
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Landmark, QrCode, ArrowRight, Calendar, Hotel, X, Check } from 'lucide-react';
import StripeIcon from '@/components/icons/StripeIcon';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { rooms } from '@/data/rooms';
import { bookings } from '@/data/bookings';
import { generateCustomerId } from '@/utils/customerUtils';
import { calculateCredibilityScore } from '@/utils/customerUtils';
import { formatCurrency } from '@/lib/formatters';
import { Booking, Room } from '@/types';
import BookingForm from '@/components/booking/BookingForm';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // States for room booking
  const [selectedRoomType, setSelectedRoomType] = useState<string>("deluxe");
  const [checkInDate, setCheckInDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Default to tomorrow
    return today.toISOString().split('T')[0];
  });
  const [checkOutDate, setCheckOutDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 4); // Default to 3 days stay
    return today.toISOString().split('T')[0];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  
  // Customer specific data
  const [customerId, setCustomerId] = useState<string>("");
  const [customerCredibilityScore, setCustomerCredibilityScore] = useState<number>(0);
  const [customerBookings, setCustomerBookings] = useState<any[]>([]);
  
  // Generate customer ID and get customer specific data
  useEffect(() => {
    if (user) {
      // Generate customer ID from email using the standardized utility
      const id = generateCustomerId(user.email);
      setCustomerId(id);
      
      // Filter bookings for this customer only
      const userBookings = bookings.filter(booking => 
        booking.guest?.email === user.email
      );
      setCustomerBookings(userBookings);
      
      // Calculate credibility score based on booking history
      const bookingHistory = user.bookingHistory;
      if (bookingHistory) {
        const score = calculateCredibilityScore([]);  // Use empty array, we already have the score
        setCustomerCredibilityScore(score);
      } else if (userBookings.length > 0) {
        const score = calculateCredibilityScore(userBookings);
        setCustomerCredibilityScore(score);
      }
    }
  }, [user]);

  const handlePayment = () => {
    setIsLoading(true);
    
    // Check if credibility score allows cash payment
    if (selectedPaymentMethod === 'cash' && customerCredibilityScore < 80) {
      toast({
        title: "Cash Payment Not Available",
        description: "Your credibility score is below 80%. Please choose an alternate payment method.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Get available room of selected type
    const availableRooms = rooms.filter(room => 
      room.type.toLowerCase() === selectedRoomType && 
      room.status === 'Available'
    );
    
    if (availableRooms.length === 0) {
      toast({
        title: "No Rooms Available",
        description: "There are no rooms available of the selected type. Please try another type or dates.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Set the selected room and show booking form
    setSelectedRoom(availableRooms[0]);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowBookingForm(true);
    }, 1000);
  };
  
  // Get room price based on selected type
  const getRoomPrice = (): number => {
    const roomPrices = {
      standard: 4999,
      deluxe: 10999,
      suite: 20999,
      presidential: 30999
    };
    
    return roomPrices[selectedRoomType as keyof typeof roomPrices] || 10999;
  };
  
  // Calculate nights between check-in and check-out
  const calculateNights = (): number => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');

  return (
    <PageContainer title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Your Customer Profile" delay={100}>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Customer ID:</span>
                <span className="font-medium">{customerId}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Name:</span>
                <span className="font-medium">{user?.name}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Email:</span>
                <span className="font-medium">{user?.email}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Credibility Score:</span>
                <div className="flex items-center">
                  <span className={`font-medium ${customerCredibilityScore >= 80 ? 'text-green-600' : customerCredibilityScore >= 60 ? 'text-blue-600' : 'text-amber-600'}`}>
                    {customerCredibilityScore}%
                  </span>
                  {customerCredibilityScore >= 80 ? (
                    <Check className="ml-1 h-4 w-4 text-green-500" />
                  ) : (
                    <X className="ml-1 h-4 w-4 text-amber-500" />
                  )}
                </div>
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Cash Payment:</span>
                <div className="flex items-center">
                  {customerCredibilityScore >= 80 ? (
                    <>
                      <span className="text-green-600 font-medium">Available</span>
                      <Check className="ml-1 h-4 w-4 text-green-500" />
                    </>
                  ) : (
                    <>
                      <span className="text-red-600 font-medium">Not Available</span>
                      <X className="ml-1 h-4 w-4 text-red-500" />
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {customerCredibilityScore >= 80 
                  ? "You are eligible for cash payment due to your excellent credibility score." 
                  : "Cash payment requires a credibility score of 80% or higher. Complete more bookings successfully to increase your score."}
              </p>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/settings')}
            >
              Manage Profile
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard title="My Bookings" delay={200}>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You have {customerBookings.length} {customerBookings.length === 1 ? 'booking' : 'bookings'}
            </p>
            
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {customerBookings.length > 0 ? (
                customerBookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="p-3 border rounded-md">
                    <p className="font-medium">{booking.room?.type} Room</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Check-in:</span>
                      <span>{new Date(booking.checkInDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Check-out:</span>
                      <span>{new Date(booking.checkOutDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={
                        booking.status === 'Confirmed' ? 'text-blue-600' :
                        booking.status === 'Checked In' ? 'text-green-600' :
                        booking.status === 'Cancelled' ? 'text-red-600' :
                        'text-muted-foreground'
                      }>{booking.status}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 border rounded-md text-center">
                  <p className="text-muted-foreground">No bookings found</p>
                </div>
              )}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/bookings')}
            >
              View All Bookings
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard title="Quick Book" delay={300}>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Room Type</label>
                <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Room</SelectItem>
                    <SelectItem value="deluxe">Deluxe Room</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                    <SelectItem value="presidential">Presidential Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Check-in</label>
                  <input 
                    type="date" 
                    className="w-full rounded-md border p-2 text-sm" 
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Check-out</label>
                  <input 
                    type="date" 
                    className="w-full rounded-md border p-2 text-sm" 
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Method</label>
                <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="cash" disabled={customerCredibilityScore < 80}>
                      Cash {customerCredibilityScore < 80 ? '(Requires 80% credibility)' : ''}
                    </SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Room Price:</span>
                <span className="font-medium">{formatCurrency(getRoomPrice())} / night</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-sm">Total ({calculateNights()} nights):</span>
                <span className="font-medium">{formatCurrency(getRoomPrice() * calculateNights())}</span>
              </div>
            </div>
            
            <Button 
              className="w-full flex items-center justify-center gap-2 bg-hotel-700 hover:bg-hotel-800" 
              onClick={handlePayment}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Book Now'}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </DashboardCard>
      </div>
      
      {/* Second row with payment info */}
      <div className="mt-6">
        <DashboardCard title="Payment Options" delay={400}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border rounded-md flex items-center">
              <StripeIcon className="h-7 w-7 mr-3 text-blue-600" />
              <div>
                <p className="font-medium">Card Payment</p>
                <p className="text-xs text-muted-foreground">Fast, secure online payment</p>
              </div>
            </div>
            
            <div className="p-3 border rounded-md flex items-center">
              <CreditCard className="h-7 w-7 mr-3 text-green-600" />
              <div>
                <p className="font-medium">UPI</p>
                <p className="text-xs text-muted-foreground">Pay directly from your bank</p>
              </div>
            </div>
            
            <div className={`p-3 border rounded-md flex items-center ${customerCredibilityScore < 80 ? 'opacity-50' : ''}`}>
              <Landmark className="h-7 w-7 mr-3 text-amber-600" />
              <div>
                <div className="flex items-center">
                  <p className="font-medium">Cash Payment</p>
                  {customerCredibilityScore < 80 && <X className="ml-1 h-4 w-4 text-red-500" />}
                </div>
                <p className="text-xs text-muted-foreground">
                  {customerCredibilityScore >= 80 
                    ? "Available for eligible customers" 
                    : "Requires 80% credibility score"}
                </p>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
      
      {showBookingForm && selectedRoom && (
        <BookingForm 
          isOpen={showBookingForm}
          onClose={() => setShowBookingForm(false)}
          roomId={selectedRoom.id}
          roomType={selectedRoom.type}
          roomPrice={selectedRoom.price}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          paymentMethod={selectedPaymentMethod}
        />
      )}
    </PageContainer>
  );
};

export default CustomerDashboard;
