
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from '@/lib/formatters';
import { CheckCircle, XCircle, AlertCircle, CreditCard } from 'lucide-react';

interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  date: Date | string;
  status: string;
  method: string;
  guest?: {
    id: string;
    name: string;
    email: string;
  };
  roomNumber: string | number;
  roomType: string;
  checkInDate: string | Date;
  checkOutDate: string | Date;
}

interface PaymentsTableProps {
  filteredPayments: Payment[];
  isAdmin: boolean;
  onViewDetails: (payment: Payment) => void;
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ 
  filteredPayments,
  isAdmin,
  onViewDetails
}) => {
  
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

  return (
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
                      onClick={() => onViewDetails(payment)}
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
  );
};

export default PaymentsTable;
