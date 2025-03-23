
import React, { useState, useMemo } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Search, Download, Filter, CreditCard, CheckCircle, XCircle, AlertCircle, IndianRupee, Receipt } from 'lucide-react';
import { bookings } from '@/data/bookings';
import { formatCurrency, calculatePriceBreakdown, getGSTRate } from '@/lib/formatters';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { rooms } from '@/data/rooms';

const Payments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const { user, customerId } = useAuth();
  
  // Convert bookings to payments data
  // For admin/superadmin: show all payment history
  // For regular customers: only show their payments
  const payments = useMemo(() => {
    if (!user) return [];
    
    const isAdmin = user.role === 'admin' || user.role === 'superadmin';
    
    return bookings
      .filter(booking => isAdmin || booking.guest?.id === user.id)
      .map(booking => {
        // Generate a random payment ID for demonstration purposes
        const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
        
        // Find room details to get room type for GST calculation
        const roomDetail = rooms.find(room => room.id === booking.roomId || (booking.room && room.id === booking.room.id));
        const roomType = roomDetail?.type || 'Standard';
        
        return {
          id: `PAY-${randomId}`,
          bookingId: booking.id,
          amount: booking.totalAmount,
          date: booking.createdAt || new Date(),
          status: booking.paymentStatus,
          method: booking.paymentMethod || 'card',
          guest: booking.guest,
          roomNumber: booking.room.number,
          roomType: roomType,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate
        };
      });
  }, [user]);
  
  // Filter payments based on search and status
  const filteredPayments = useMemo(() => {
    return payments.filter(payment => {
      const matchesSearch = 
        payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (payment.guest?.name && payment.guest.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || payment.status.toLowerCase() === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [payments, searchQuery, statusFilter]);

  // Calculate totals for different payment statuses
  const totals = useMemo(() => {
    return {
      total: payments.reduce((sum, payment) => sum + payment.amount, 0),
      paid: payments.filter(p => p.status.toLowerCase() === 'paid').reduce((sum, payment) => sum + payment.amount, 0),
      pending: payments.filter(p => p.status.toLowerCase() === 'pending').reduce((sum, payment) => sum + payment.amount, 0),
      refunded: payments.filter(p => p.status.toLowerCase() === 'refunded').reduce((sum, payment) => sum + payment.amount, 0)
    };
  }, [payments]);

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'refunded': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'paid': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'refunded': return <CreditCard className="h-4 w-4 text-blue-600" />;
      default: return null;
    }
  };

  // Handle view payment details
  const handleViewPaymentDetails = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentDetails(true);
  };

  // Check if user is admin or superadmin
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  if (!user) {
    return (
      <PageContainer title="Payments Management">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">You need to log in</h2>
            <p className="text-muted-foreground">Please log in to view your payment history</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  // Calculate price breakdown for selected payment
  const priceBreakdown = useMemo(() => {
    if (!selectedPayment) return null;
    
    return calculatePriceBreakdown(selectedPayment.amount, selectedPayment.roomType);
  }, [selectedPayment]);

  return (
    <PageContainer title={isAdmin ? "Payments Management" : "Payment History"}>
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totals.total)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totals.paid)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {formatCurrency(totals.pending)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Refunded</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(totals.refunded)}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Customer ID display (only for regular users) */}
        {!isAdmin && (
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Customer ID:</span>
              <span className="font-medium">{customerId || 'Not available'}</span>
            </div>
          </div>
        )}
        
        {/* Admin section banner */}
        {isAdmin && (
          <div className="bg-amber-100 border border-amber-300 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <span className="font-medium text-amber-800">
                Admin View: Showing all payment records
              </span>
            </div>
          </div>
        )}
        
        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={isAdmin ? "Search by payment ID, booking ID or guest name..." : "Search by payment ID or booking ID..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-background w-full"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Payments Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Room</TableHead>
                  {isAdmin && <TableHead>Guest</TableHead>}
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                      <TableCell>Room {payment.roomNumber}</TableCell>
                      {isAdmin && (
                        <TableCell>
                          {payment.guest?.name || 'Unknown'}
                        </TableCell>
                      )}
                      <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                      <TableCell className="capitalize">{payment.method}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(payment.status)}
                          <Badge variant="outline" className={getStatusBadgeColor(payment.status)}>
                            {payment.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewPaymentDetails(payment)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={isAdmin ? 8 : 7} className="text-center py-6 text-muted-foreground">
                      No payment history found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Payment Details Dialog */}
      <Dialog open={showPaymentDetails} onOpenChange={setShowPaymentDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              Details for payment {selectedPayment?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Payment ID:</span>
                <span className="font-medium">{selectedPayment.id}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Booking ID:</span>
                <span className="font-medium">{selectedPayment.bookingId}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{new Date(selectedPayment.date).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Room:</span>
                <span className="font-medium">{selectedPayment.roomType} Room {selectedPayment.roomNumber}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Check-in Date:</span>
                <span className="font-medium">{new Date(selectedPayment.checkInDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Check-out Date:</span>
                <span className="font-medium">{new Date(selectedPayment.checkOutDate).toLocaleDateString()}</span>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Receipt className="h-4 w-4 mr-2" />
                  Price Breakdown
                </h3>
                <div className="bg-muted p-4 rounded-md space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Base Amount:</span>
                    <span className="font-medium">{formatCurrency(priceBreakdown.baseAmount)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      GST ({priceBreakdown.gstRate}%):
                    </span>
                    <span className="font-medium">{formatCurrency(priceBreakdown.gstAmount)}</span>
                  </div>
                  
                  <Separator className="my-1" />
                  
                  <div className="flex items-center justify-between font-bold">
                    <span>Total Amount:</span>
                    <div className="flex items-center">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      <span>{formatCurrency(selectedPayment.amount)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-medium capitalize">{selectedPayment.method}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge 
                  variant="outline" 
                  className={getStatusBadgeColor(selectedPayment.status)}
                >
                  {selectedPayment.status}
                </Badge>
              </div>
              
              {isAdmin && selectedPayment.guest && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Guest Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{selectedPayment.guest.name}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{selectedPayment.guest.email}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default Payments;
