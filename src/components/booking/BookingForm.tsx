import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Landmark, QrCode, User, CalendarIcon, Calendar as CalendarCheck, ChevronsUpDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import TransitionWrapper from '@/components/ui/TransitionWrapper';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  roomId?: string;
  roomType?: string;
  roomPrice?: number;
}

const BookingForm = ({ isOpen, onClose, roomId, roomType, roomPrice }: BookingFormProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [idType, setIdType] = useState('passport');
  const [idNumber, setIdNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Booking Created!",
        description: "Your booking has been successfully created.",
        variant: "default",
      });
      setIsLoading(false);
      onClose();
      navigate('/bookings');
    }, 1500);
  };
  
  const handlePaymentProcess = () => {
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
      case 'stripe': return 'Stripe';
      default: return 'Unknown Method';
    }
  };
  
  const steps = [
    { title: "Guest Information", description: "Enter guest details" },
    { title: "Payment Method", description: "Choose your payment method" },
    { title: "Confirmation", description: "Review and confirm" }
  ];
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto py-6">
      <div className="flex min-h-full items-center justify-center p-4">
        <TransitionWrapper delay={100}>
          <Card className="w-full max-w-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
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
                        value={`Rs. ${roomPrice?.toLocaleString() || "9,900"}`} 
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
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkInDate}
                            onSelect={setCheckInDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="checkOut">Check-Out Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
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
                              date < new Date() || 
                              (checkInDate ? date <= checkInDate : false)
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="fullName"
                        placeholder="John Smith"
                        className="pl-10"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+91 9012345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
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
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        required
                      />
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
                      onClick={() => setCurrentStep(1)}
                      disabled={!fullName || !email || !phone || !idNumber}
                    >
                      Next: Payment
                    </Button>
                  </div>
                </form>
              )}
              
              {currentStep === 1 && (
                <div className="space-y-4 overflow-y-auto">
                  <div className="space-y-2">
                    <Label className="text-base font-medium">Select Payment Method</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">
                          <div className="flex items-center">
                            <Landmark className="h-4 w-4 mr-2 text-green-600" />
                            <span>Cash</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="credit">
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
                            <span>Credit Card</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="debit">
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2 text-purple-600" />
                            <span>Debit Card</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="qr">
                          <div className="flex items-center">
                            <QrCode className="h-4 w-4 mr-2 text-gray-600" />
                            <span>QR Code Payment</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="stripe">
                          <div className="flex items-center">
                            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 10C2 6.68629 4.68629 4 8 4H16C19.3137 4 22 6.68629 22 10V14C22 17.3137 19.3137 20 16 20H8C4.68629 20 2 17.3137 2 14V10Z" stroke="currentColor" strokeWidth="2" />
                              <path d="M14 9C14 9.55228 13.5523 10 13 10C12.4477 10 12 9.55228 12 9C12 8.44772 12.4477 8 13 8C13.5523 8 14 8.44772 14 9Z" fill="currentColor" />
                              <path d="M16 13C16 14.1046 15.1046 15 14 15C12.8954 15 12 14.1046 12 13C12 11.8954 12.8954 11 14 11C15.1046 11 16 11.8954 16 13Z" fill="currentColor" />
                              <path d="M10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z" fill="currentColor" />
                              <path d="M9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9C8.55228 9 9 9.44772 9 10Z" fill="currentColor" />
                            </svg>
                            <span>Stripe</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-4 border rounded-md bg-muted/30">
                    <h3 className="font-medium mb-2">Selected: {getMethodName(paymentMethod)}</h3>
                    <p className="text-sm text-muted-foreground">
                      {paymentMethod === 'cash' && "Pay cash at the reception during check-in. A receipt will be provided."}
                      {paymentMethod === 'credit' && "Secure payment using your credit card."}
                      {paymentMethod === 'debit' && "Direct payment using your debit card."}
                      {paymentMethod === 'qr' && "Scan our QR code using your preferred payment app."}
                      {paymentMethod === 'stripe' && "Secure online payment through Stripe gateway."}
                    </p>
                  </div>
                  
                  {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input id="cardName" placeholder="John Smith" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input id="expiryDate" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(0)}>
                      Back
                    </Button>
                    <Button 
                      type="button"
                      onClick={handlePaymentProcess}
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Process Payment"}
                    </Button>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-4 overflow-y-auto">
                  <div className="bg-green-50 p-4 rounded-md border border-green-200 text-green-800 mb-4">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <h3 className="font-semibold">Payment Successful</h3>
                    </div>
                    <p className="text-sm">Your payment has been processed successfully.</p>
                  </div>
                  
                  <div className="border rounded-md divide-y">
                    <div className="p-4">
                      <h3 className="font-medium mb-1">Booking Summary</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <p className="text-gray-500">Room Type:</p>
                        <p>{roomType || "Standard Room"}</p>
                        
                        <p className="text-gray-500">Check-in:</p>
                        <p>{checkInDate ? format(checkInDate, "PPP") : "-"}</p>
                        
                        <p className="text-gray-500">Check-out:</p>
                        <p>{checkOutDate ? format(checkOutDate, "PPP") : "-"}</p>
                        
                        <p className="text-gray-500">Guest:</p>
                        <p>{fullName}</p>
                        
                        <p className="text-gray-500">Payment Method:</p>
                        <p>{getMethodName(paymentMethod)}</p>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Amount:</span>
                        <span className="font-semibold">Rs. {roomPrice?.toLocaleString() || "9,900"}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                      Back
                    </Button>
                    <Button 
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      {isLoading ? "Confirming..." : "Confirm Booking"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TransitionWrapper>
      </div>
    </div>
  );
};

export default BookingForm;
