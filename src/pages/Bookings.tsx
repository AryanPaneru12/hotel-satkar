
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
import { bookings } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Plus, Search, MoreHorizontal, Calendar, FileText, CheckCircle, X } from 'lucide-react';

const bookingStatuses = ['All Statuses', 'Pending', 'Confirmed', 'Cancelled', 'Checked In', 'Checked Out'];
const paymentStatuses = ['All Payments', 'Pending', 'Paid', 'Refunded', 'Failed'];

const Bookings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedPayment, setSelectedPayment] = useState('All Payments');

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

  // Filter bookings based on search query and selected filters
  const filteredBookings = bookings.filter(booking => {
    const guestName = booking.guest?.name?.toLowerCase() || '';
    const roomNumber = booking.room?.number?.toLowerCase() || '';
    
    const matchesSearch = 
      guestName.includes(searchQuery.toLowerCase()) || 
      roomNumber.includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'All Statuses' || booking.status === selectedStatus;
    const matchesPayment = selectedPayment === 'All Payments' || booking.paymentStatus === selectedPayment;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <PageContainer title="Bookings">
      {/* Filters and Actions */}
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
          
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>New Booking</span>
          </Button>
        </div>
      </div>
      
      {/* Bookings Table */}
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
                  <TableCell className="text-right">${booking.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Generate Invoice</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          <span>Mark as Checked In</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center text-red-600">
                          <X className="mr-2 h-4 w-4" />
                          <span>Cancel Booking</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredBookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <h3 className="text-lg font-medium mb-2">No bookings found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filters</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </PageContainer>
  );
};

export default Bookings;
