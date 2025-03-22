
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
import { Star, AlertTriangle, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
            <TableHead>Credibility</TableHead>
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
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentBookings;
