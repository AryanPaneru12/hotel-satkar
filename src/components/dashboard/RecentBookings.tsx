
import { useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Booking } from '@/types';
import { cn } from '@/lib/utils';

interface RecentBookingsProps {
  bookings: Booking[];
}

const RecentBookings = ({ bookings }: RecentBookingsProps) => {
  const statusColorMap = useMemo(() => ({
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Confirmed': 'bg-blue-100 text-blue-800 border-blue-200',
    'Cancelled': 'bg-red-100 text-red-800 border-red-200',
    'Checked In': 'bg-green-100 text-green-800 border-green-200',
    'Checked Out': 'bg-gray-100 text-gray-800 border-gray-200',
  }), []);

  const paymentStatusColorMap = useMemo(() => ({
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Paid': 'bg-green-100 text-green-800 border-green-200',
    'Refunded': 'bg-purple-100 text-purple-800 border-purple-200',
    'Failed': 'bg-red-100 text-red-800 border-red-200',
  }), []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Guest</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{booking.guest?.name}</TableCell>
              <TableCell>{booking.room?.number} ({booking.room?.type})</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentBookings;
