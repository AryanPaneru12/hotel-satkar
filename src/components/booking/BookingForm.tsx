import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format, differenceInDays, isAfter, isBefore } from 'date-fns';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Landmark, QrCode, User, CalendarIcon, ChevronsUpDown, Info, Loader2, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { calculateCredibilityScore } from '@/lib/formatters';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { guests } from '@/data/guests';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  roomId?: string;
  roomType?: string;
  roomPrice?: number;
  checkInDate?: string;
  checkOutDate?: string;
  paymentMethod?: string;
}

type FormErrors = {
  [key: string]: string;
};

const BookingForm = ({ 
  isOpen, 
  onClose, 
  roomId, 
  roomType, 
  roomPrice,
  checkInDate: initialCheckInDate,
  checkOutDate: initialCheckOutDate,
  paymentMethod: initialPaymentMethod
}: BookingFormProps) => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [idType, setIdType] = useState('passport');
  const [idNumber, setIdNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod || 'credit');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalNights, setTotalNights] = useState(1);
  const [totalAmount, setTotalAmount] = useState(roomPrice || 9900);
  const [errors, setErrors] = useState<FormErrors>({});
  const [customerCredibilityScore, setCustomerCredibilityScore] = useState(0);
  const [useExistingCustomer, setUseExistingCustomer] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [searchCustomer, setSearchCustomer] = useState('');
  const [commandOpen, setCommandOpen] = useState(false);
  
  const parseDateIfProvided = (dateString?: string): Date | undefined => {
    if (!dateString) return undefined;
    try {
      return new Date(dateString);
    } catch (error) {
      console.error("Error parsing date:", error);
      return undefined;
    }
  };
  
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(
    parseDateIfProvided(initialCheckInDate) || new Date(2025, 0, 15)
  );
  
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    parseDateIfProvided(initialCheckOutDate) || addDays(new Date(2025, 0, 15), 1)
  );
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredGuests = searchCustomer.trim() !== '' 
    ? guests.filter(guest => 
        guest.name.toLowerCase().includes(searchCustomer.toLowerCase()) ||
        guest.id.toLowerCase().includes(searchCustomer.toLowerCase()) ||
        (guest.email && guest.email.toLowerCase().includes(searchCustomer.toLowerCase())) ||
        (guest.phone && guest.phone.includes(searchCustomer))
      )
    : [];

  useEffect(() => {
    if (selectedCustomerId) {
      const selectedGuest = guests.find(g => g.id === selectedCustomerId);
      if (selectedGuest) {
        setFullName(selectedGuest.name);
        setEmail(selectedGuest.email || '');
        setPhone(selectedGuest.phone || '');
        setIdType(selectedGuest.idNumber?.startsWith('IND') ? 'aadhar' : 'passport');
        setIdNumber(selectedGuest.idNumber || '');
        
        if (selectedGuest.credibilityScore) {
          setCustomerCredibilityScore(selectedGuest.credibilityScore);
        } else if (selectedGuest.bookingHistory) {
          const score = calculateCredibilityScore(
            selectedGuest.bookingHistory.totalBookings,
            selectedGuest.bookingHistory.completedStays,
            selectedGuest.bookingHistory.cancellations,
            selectedGuest.bookingHistory.noShows
          );
          setCustomerCredibilityScore(score);
        }
      }
    }
  }, [selectedCustomerId]);

  useEffect(() => {
    if (user && !selectedCustomerId) {
      const mockHistory = {
        totalBookings: 5,
        completedStays: 4,
        cancellations: 1,
        noShows: 0
      };
      
      const score = calculateCredibilityScore(
        mockHistory.totalBookings,
        mockHistory.completedStays,
        mockHistory.cancellations,
        mockHistory.noShows
      );
      
      setCustomerCredibilityScore(score);
    }
  }, [user, selectedCustomerId]);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const nights = differenceInDays(checkOutDate, checkInDate);
      setTotalNights(nights > 0 ? nights : 1);
      setTotalAmount((roomPrice || 9900) * (nights > 0 ? nights : 1));
    }
  }, [checkInDate, checkOutDate, roomPrice]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[\d\s+()-]{10,15}$/.test(phone);
  };

  const validateStep = (step: number) => {
    const newErrors: FormErrors = {};

    if (step === 0) {
      if (!fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }

      if (!email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(email)) {
        newErrors.email = 'Invalid email format';
      }

      if (!phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!validatePhone(phone)) {
        newErrors.phone = 'Invalid phone number format';
      }

      if (!idNumber.trim()) {
        newErrors.idNumber = 'ID number is required';
      }

      if (!checkInDate) {
        newErrors.checkInDate = 'Check-in date is required';
      }

      if (!checkOutDate) {
        newErrors.checkOutDate = 'Check-out date is required';
      } else if (checkInDate && isBefore(checkOutDate, checkInDate)) {
        newErrors.checkOutDate = 'Check-out date must be after check-in date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const profileDetails = selectedCustomerId 
      ? `Customer ID: ${selectedCustomerId}` 
      : "New customer profile";
    
    setTimeout(() => {
      toast({
        title: "Booking Created!",
        description: `Your booking has been successfully created. ${profileDetails}`,
        variant: "default",
      });
      setIsLoading(false);
      onClose();
      navigate('/bookings');
    }, 1500);
  };
  
  const handlePaymentProcess = () => {
    if (paymentMethod === 'cash' && customerCredibilityScore < 80) {
      toast({
        title: "Cash Payment Not Available",
        description: "Your credibility score is below 80%. Please choose an alternate payment method.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Payment Processed",
        description: `Payment has been processed successfully via ${getMethodName(paymentMethod)}`,
        variant: "default",
      });
      setIsLoading(false);
      setCurrentStep(2);
    }, 1500);
  };
  
  const getMethodName = (value: string): string => {
    switch (value) {
      case 'cash': return 'Cash';
      case 'credit': return 'Credit Card';
      case 'debit': return 'Debit Card';
      case 'qr': return 'QR Code Payment';
      case 'upi': return 'UPI';
      case 'stripe': return 'Stripe';
      default: return 'Unknown Method';
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const steps = [
    { title: "Guest Information", description: "Enter guest details" },
    { title: "Payment Method", description: "Choose your payment method" },
    { title: "Confirmation", description: "Review and confirm" }
  ];
  
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto">
        <CardHeader className="border-b sticky top-0 bg-white z-10">
          <CardTitle>Book Your Stay</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 overflow-y-auto">
          <div className="mb-6">
            <div className="flex space-x-2 items-center mb-4">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div 
                    className={cn(
                      "flex flex-col items-center",
                      index === currentStep ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <div 
                      className={cn(
                        "rounded-full h-8 w-8 flex items-center justify-center mb-1",
                        index === currentStep 
                          ? "bg-primary text-primary-foreground" 
                          : index < currentStep 
                            ? "bg-primary/20 text-primary" 
                            : "bg-muted text-muted-foreground"
                      )}
                    >
                      {index < currentStep ? (
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="text-xs font-medium">{step.title}</div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div 
                      className={cn(
                        "flex-1 h-[2px]",
                        index < currentStep ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {currentStep === 0 && (
            <form className="space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roomType">Room Type</Label>
                  <Input 
                    id="roomType" 
                    value={roomType || "Standard Room"} 
                    disabled 
                    className="bg-muted"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price Per Night</Label>
                  <Input 
                    id="price" 
                    value={`Rs. ${(roomPrice || 9900).toLocaleString()}`} 
                    disabled 
                    className="bg-muted"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkIn">Check-In Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          errors.checkInDate && "border-red-500"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkInDate}
                        onSelect={(date) => {
                          setCheckInDate(date);
                          if (date && checkOutDate && isBefore(checkOutDate, date)) {
                            setCheckOutDate(addDays(date, 1));
                          }
                        }}
                        disabled={(date) => isBefore(date, new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.checkInDate && (
                    <p className="text-xs text-red-500">{errors.checkInDate}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="checkOut">Check-Out Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          errors.checkOutDate && "border-red-500"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkOutDate}
                        onSelect={setCheckOutDate}
                        initialFocus
                        disabled={(date) => 
                          isBefore(date, new Date()) || 
                          (checkInDate ? isBefore(date, checkInDate) || isBefore(date, addDays(checkInDate, 1)) : false)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.checkOutDate && (
                    <p className="text-xs text-red-500">{errors.checkOutDate}</p>
                  )}
                </div>
              </div>

              <div className="p-3 border rounded-lg bg-muted/30">
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Total Stay:</span> {totalNights} {totalNights === 1 ? 'night' : 'nights'}
                  </div>
                  <div className="text-sm font-bold">
                    <span className="text-muted-foreground">Total:</span> Rs. {totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-muted/20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-medium">Customer Mapping</h3>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="useExistingCustomer" 
                      className="mr-2"
                      checked={useExistingCustomer}
                      onChange={(e) => setUseExistingCustomer(e.target.checked)}
                    />
                    <Label htmlFor="useExistingCustomer">Use Existing Customer</Label>
                  </div>
                </div>
                
                {useExistingCustomer && (
                  <div className="space-y-3">
                    <Label htmlFor="customerSearch">Select Customer</Label>
                    <Popover open={commandOpen} onOpenChange={setCommandOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={commandOpen}
                          className="w-full justify-between"
                        >
                          {selectedCustomerId ? 
                            guests.find(g => g.id === selectedCustomerId)?.name || "Search customers..." : 
                            "Search customers..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0 bg-white" align="start">
                        <Command>
                          <CommandInput 
                            placeholder="Search by name or ID..." 
                            value={searchCustomer}
                            onValueChange={setSearchCustomer}
                            className="h-9"
                          />
                          <CommandEmpty>No customer found.</CommandEmpty>
                          <CommandGroup className="max-h-[200px] overflow-auto">
                            {filteredGuests.map(guest => (
                              <CommandItem
                                key={guest.id}
                                value={guest.id}
                                onSelect={(value) => {
                                  setSelectedCustomerId(value);
                                  setCommandOpen(false);
                                }}
                              >
                                <div className="flex items-center">
                                  <User className="mr-2 h-4 w-4" />
                                  <span>{guest.name}</span>
                                </div>
                                <span className="ml-auto text-xs text-muted-foreground">
                                  ID: {guest.id}
                                </span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    
                    {selectedCustomerId && (
                      <div className="text-sm bg-primary/10 p-2 rounded flex items-center">
                        <Info className="h-4 w-4 mr-2 text-primary" />
                        Customer profile details loaded. You can modify if needed.
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="fullName"
                    placeholder="John Smith"
                    className={cn("pl-10", errors.fullName && "border-red-500")}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={cn(errors.email && "border-red-500")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+91 9012345678"
                    className={cn(errors.phone && "border-red-500")}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idType">ID Type</Label>
                  <Select value={idType} onValueChange={setIdType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="aadhar">Aadhar Card</SelectItem>
                      <SelectItem value="driving">Driving License</SelectItem>
                      <SelectItem value="voter">Voter ID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input
                    id="idNumber"
                    placeholder="Enter ID number"
                    className={cn(errors.idNumber && "border-red-500")}
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    required
                  />
                  {errors.idNumber && (
                    <p className="text-xs text-red-500">{errors.idNumber}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                <Textarea
                  id="specialRequests"
                  placeholder="Any special requirements..."
                  className="min-h-[80px]"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />
              </div>
              
              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  onClick={handleNextStep}
                  disabled={isLoading}
                >
                  Next
                </Button>
              </div>
            </form>
          )}
          
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Select Payment Method</h3>
                
                {paymentMethod === 'cash' && customerCredibilityScore < 80 && (
                  <Alert className="bg-red-50 border-red-200 text-red-800">
                    <AlertDescription className="text-sm flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Your credibility score is below 80%. Please choose an alternate payment method.
                    </AlertDescription>
                  </Alert>
                )}
                
                <Tabs defaultValue={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="credit">Card</TabsTrigger>
                    <TabsTrigger 
                      value="cash" 
                      disabled={customerCredibilityScore < 80}
                      className={customerCredibilityScore < 80 ? "cursor-not-allowed" : ""}
                    >
                      Cash
                    </TabsTrigger>
                    <TabsTrigger value="upi">UPI</TabsTrigger>
                    <TabsTrigger value="qr">QR Code</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="credit" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Smith" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="xxxx xxxx xxxx xxxx" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" type="password" />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="cash" className="space-y-4">
                    <div className="bg-muted p-4 rounded-md">
                      <div className="flex items-start mb-2">
                        <Landmark className="h-5 w-5 mr-2 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Cash Payment</p>
                          <p className="text-sm text-muted-foreground">Pay at the hotel reception during check-in</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm">
                        <p className="font-medium">Important Notes:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                          <li>Please have the exact amount ready</li>
                          <li>Payment must be made before room access</li>
                          <li>Your credibility score allows cash payment</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="upi" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input id="upiId" placeholder="yourname@upi" />
                    </div>
                    <div className="bg-muted p-4 rounded-md mt-2">
                      <p className="text-sm text-muted-foreground">You will receive a payment request notification on your UPI app.</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="qr" className="space-y-4">
                    <div className="flex justify-center p-6 border rounded-md">
                      <div className="text-center">
                        <QrCode className="h-32 w-32 mx-auto mb-4 text-primary" />
                        <p className="text-sm text-muted-foreground">Scan this QR code using any payment app to complete your payment</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-medium">Total Amount</p>
                    <p className="text-sm text-muted-foreground">Including all taxes and fees</p>
                  </div>
                  <div className="text-xl font-bold">Rs. {totalAmount.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(0)}>
                  Back
                </Button>
                <Button 
                  type="button" 
                  onClick={handlePaymentProcess}
                  disabled={isLoading || (paymentMethod === 'cash' && customerCredibilityScore < 80)}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Process Payment"
                  )}
                </Button>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.75 12.75L10 15.25L16.25 8.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-green-800">Booking Confirmed!</h3>
                <p className="text-green-700 mt-1">Your booking has been successfully confirmed.</p>
              </div>
              
              <div className="space-y-4 border-t border-b py-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking Reference:</span>
                  <span className="font-medium">BOK-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                
                {selectedCustomerId && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Customer ID:</span>
                    <span className="font-medium">{selectedCustomerId}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room Type:</span>
                  <span className="font-medium">{roomType || "Standard Room"}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in Date:</span>
                  <span className="font-medium">{checkInDate ? format(checkInDate, "PPP") : "Not specified"}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out Date:</span>
                  <span className="font-medium">{checkOutDate ? format(checkOutDate, "PPP") : "Not specified"}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">Rs. {totalAmount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="font-medium">{getMethodName(paymentMethod)}</span>
                </div>
              </div>
              
              <div className="pt-2 text-sm text-muted-foreground">
                <p>A confirmation email has been sent to {email}.</p>
                <p className="mt-1">For any queries, please contact our support team.</p>
                <p className="mt-1">Hotel Satkar - Established 2025</p>
              </div>
              
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button 
                  type="button" 
                  onClick={handleSubmit}
                >
                  View My Bookings
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
