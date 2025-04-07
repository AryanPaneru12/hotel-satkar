import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { bookings } from '@/data/bookings';
import { cn } from '@/lib/utils';
import { Plus, Search, MoreHorizontal, Calendar, FileText, CheckCircle, X, Star, AlertTriangle, Info } from 'lucide-react';
import BookingForm from '@/components/booking/BookingForm';
import CredibilityScore from '@/components/credibility/CredibilityScore';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Booking, BookingHistory } from '@/types';
import BookingDetailsModal from '@/components/booking/BookingDetailsModal';
import { downloadInvoice } from '@/lib/invoiceGenerator';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const bookingStatuses = ['All Statuses', 'Pending', 'Confirmed', 'Cancelled', 'Checked In', 'Checked Out'];
const paymentStatuses = ['All Payments', 'Pending', 'Paid', 'Refunded', 'Failed'];
const credibilityFilters = ['All Scores', 'Excellent (90-100)', 'Good (75-89)', 'Fair (60-74)', 'Needs Improvement (40-59)', 'Poor (0-39)'];

const Bookings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedPayment, setSelectedPayment] = useState('All Payments');
  const [selectedCredibility, setSelectedCredibility] = useState('All Scores');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const statusColorMap = {
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Confirmed': 'bg-blue-100 text-blue-800 border-blue-200',
    'Cancelled': 'bg-red-100 text-red-800 border-red-200',
    'Checked In': 'bg-green-100 text-green-800 border-green-200',
    'Checked Out': 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const paymentStatusColorMap = {
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Paid': 'bg-green-100 text-green-800 border-green-200',
    'Refunded': 'bg-purple-100 text-purple-800 border-purple-200',
    'Failed': 'bg-red-100 text-red-800 border-red-200',
  };

  const getCredibilityScoreRange = (filter: string) => {
    switch (filter) {
      case 'Excellent (90-100)': return { min: 90, max: 100 };
      case 'Good (75-89)': return { min: 75, max: 89 };
      case 'Fair (60-74)': return { min: 60, max: 74 };
      case 'Needs Improvement (40-59)': return { min: 40, max: 59 };
      case 'Poor (0-39)': return { min: 0, max: 39 };
      default: return { min: 0, max: 100 };
    }
  };

  const userFilteredBookings = user?.role === 'customer' 
    ? bookings.filter(booking => booking.guest?.email === user.email)
    : bookings;

  const filteredBookings = userFilteredBookings.filter(booking => {
    const guestName = booking.guest?.name?.toLowerCase() || '';
    const roomNumber = booking.room?.number?.toLowerCase() || '';
    
    const matchesSearch = 
      guestName.includes(searchQuery.toLowerCase()) || 
      roomNumber.includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'All Statuses' || booking.status === selectedStatus;
    const matchesPayment = selectedPayment === 'All Payments' || booking.paymentStatus === selectedPayment;
    
    let matchesCredibility = true;
    if (selectedCredibility !== 'All Scores') {
      const range = getCredibilityScoreRange(selectedCredibility);
      const score = booking.guest?.credibilityScore;
      matchesCredibility = score !== undefined && score >= range.min && score <= range.max;
    }
    
    return matchesSearch && matchesStatus && matchesPayment && matchesCredibility;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCredibilityColor = (score?: number) => {
    if (!score) return "text-gray-400";
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-emerald-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-amber-600";
    return "text-red-600";
  };

  const getStatusText = (score?: number) => {
    if (!score) return "Unknown";
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Fair";
    if (score >= 40) return "Needs Improvement";
    return "Poor";
  };

  const getTurnupLikelihood = (score?: number) => {
    if (!score) return "Unknown";
    if (score >= 90) return "Very High";
    if (score >= 75) return "High";
    if (score >= 60) return "Moderate";
    if (score >= 40) return "Low";
    return "Very Low";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleGenerateInvoice = (booking: Booking) => {
    toast({
      title: "Generating Invoice",
      description: "Your invoice PDF is being generated and will download shortly.",
    });
    
    setTimeout(() => {
      try {
        downloadInvoice(booking);
        toast({
          title: "Invoice Generated",
          description: "Your invoice has been successfully downloaded.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "There was a problem generating your invoice. Please try again.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  const handleMarkCheckIn = (bookingId: string) => {
    toast({
      title: "Status Updated",
      description: `Booking #${bookingId} has been marked as Checked In.`,
    });
    
    // In a real app, this would update the booking in the database
  };

  const handleCancelBooking = (bookingId: string) => {
    toast({
      title: "Booking Cancelled",
      description: `Booking #${bookingId} has been cancelled.`,
      variant: "destructive",
    });
    
    // In a real app, this would update the booking in the database
  };

  return (
    <>
      <PageContainer title="Bookings">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-background w-full"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-40">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  {bookingStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-40">
              <Select value={selectedPayment} onValueChange={setSelectedPayment}>
                <SelectTrigger>
                  <SelectValue placeholder="All Payments" />
                </SelectTrigger>
                <SelectContent>
                  {paymentStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-52">
              <Select value={selectedCredibility} onValueChange={setSelectedCredibility}>
                <SelectTrigger>
                  <SelectValue placeholder="All Credibility Scores" />
                </SelectTrigger>
                <SelectContent>
                  {credibilityFilters.map((filter) => (
                    <SelectItem key={filter} value={filter}>
                      {filter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="flex items-center gap-1"
              onClick={() => {
                setSelectedBooking(null);
                setShowBookingForm(true);
              }}
            >
              <Plus className="h-4 w-4" />
              <span>New Booking</span>
            </Button>
          </div>
        </div>
        
        <div className="bg-card rounded-lg shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Credibility</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">#{booking.id}</TableCell>
                    <TableCell>{booking.guest?.name}</TableCell>
                    <TableCell>{booking.room?.number}</TableCell>
                    <TableCell>{formatDate(booking.checkInDate)}</TableCell>
                    <TableCell>{formatDate(booking.checkOutDate)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("border", statusColorMap[booking.status])}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("border", paymentStatusColorMap[booking.paymentStatus])}>
                        {booking.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(booking.totalAmount)}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center">
                              <span className={cn(
                                "font-medium mr-1", 
                                getCredibilityColor(booking.guest?.credibilityScore)
                              )}>
                                {booking.guest?.credibilityScore || '-'}%
                              </span>
                              {booking.guest?.credibilityScore ? (
                                <Star 
                                  className={cn("h-4 w-4", getCredibilityColor(booking.guest?.credibilityScore))} 
                                  fill="currentColor" 
                                />
                              ) : (
                                <Info className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="space-y-1 p-1">
                              <p className="text-sm font-medium">{getStatusText(booking.guest?.credibilityScore)}</p>
                              <div className="flex items-center text-xs">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                <span>Turn-up Likelihood: {getTurnupLikelihood(booking.guest?.credibilityScore)}</span>
                              </div>
                              {booking.guest?.bookingHistory && (
                                <div className="text-xs mt-1">
                                  Total Bookings: {booking.guest.bookingHistory.totalBookings}, 
                                  Cancellations: {booking.guest.bookingHistory.cancellations}
                                </div>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            className="flex items-center"
                            onClick={() => handleViewDetails(booking)}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center"
                            onClick={() => handleGenerateInvoice(booking)}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Generate Invoice</span>
                          </DropdownMenuItem>
                          {booking.status === 'Confirmed' && (
                            <DropdownMenuItem 
                              className="flex items-center"
                              onClick={() => handleMarkCheckIn(booking.id)}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              <span>Mark as Checked In</span>
                            </DropdownMenuItem>
                          )}
                          {(booking.status === 'Pending' || booking.status === 'Confirmed') && (
                            <DropdownMenuItem 
                              className="flex items-center text-red-600"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              <X className="mr-2 h-4 w-4" />
                              <span>Cancel Booking</span>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredBookings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-green-800">Booking Confirmed - Room 102</h3>
                        <div className="flex items-center justify-center gap-2 text-gray-700">
                          <span className="font-medium">Payment Method:</span>
                          <span className="flex items-center gap-1">
                            <span className="font-bold">Cash Payment</span>
                            <span className="text-green-600">✓</span>
                          </span>
                        </div>
                        <p className="text-gray-700">Amount: ₹4,999</p>
                        <p className="text-gray-700">Check out: June 16th 2025</p>
                        <p className="text-gray-700 font-medium">Guest Name: <span className="font-bold">Nikit Ban</span></p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {bookings.slice(0, 3).map((booking) => (
            booking.guest?.credibilityScore && booking.guest?.bookingHistory && (
              <CredibilityScore 
                key={booking.guest.id}
                score={booking.guest.credibilityScore} 
                history={booking.guest.bookingHistory}
              />
            )
          ))}
        </div>
      </PageContainer>
      
      <BookingForm 
        isOpen={showBookingForm} 
        onClose={() => setShowBookingForm(false)} 
        roomId={selectedBooking?.room?.id}
        roomType={selectedBooking?.room?.type}
        roomPrice={selectedBooking?.room?.price}
      />
      
      <BookingDetailsModal
        booking={selectedBooking}
        open={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        onMarkCheckIn={handleMarkCheckIn}
        onCancelBooking={handleCancelBooking}
        onGenerateInvoice={handleGenerateInvoice}
      />
    </>
  );
};

export default Bookings;
