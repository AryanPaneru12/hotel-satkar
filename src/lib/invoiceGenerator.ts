
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Booking } from '@/types';
import { formatDate } from '@/utils/bookingUtils';

// Generate PDF invoice for a booking
export const generateInvoice = (booking: Booking) => {
  const doc = new jsPDF();
  
  // Add hotel logo/header
  doc.setFontSize(20);
  doc.setTextColor(62, 82, 163);
  doc.text('SATKAR HOTELS', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text('123 Main Street, Kathmandu, Nepal', 105, 30, { align: 'center' });
  doc.text('Phone: +977 1234 5678 | Email: info@satkarhotels.com', 105, 36, { align: 'center' });
  
  // Add invoice title and number
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('INVOICE', 20, 50);
  
  doc.setFontSize(12);
  doc.text(`Invoice #: INV-${booking.id}`, 20, 60);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 66);
  
  // Add customer details
  doc.setFontSize(14);
  doc.text('Bill To:', 20, 80);
  
  doc.setFontSize(12);
  doc.text(booking.guest?.name || 'N/A', 20, 88);
  doc.text(`ID: ${booking.guest?.id || 'N/A'}`, 20, 94);
  doc.text(`Email: ${booking.guest?.email || 'N/A'}`, 20, 100);
  
  // Add booking details
  doc.setFontSize(14);
  doc.text('Booking Details:', 120, 80);
  
  doc.setFontSize(12);
  doc.text(`Booking ID: ${booking.id}`, 120, 88);
  doc.text(`Room: ${booking.room?.number} (${booking.room?.type})`, 120, 94);
  doc.text(`Check-in: ${formatDate(booking.checkInDate)}`, 120, 100);
  doc.text(`Check-out: ${formatDate(booking.checkOutDate)}`, 120, 106);
  
  // Calculate number of nights
  const checkIn = new Date(booking.checkInDate);
  const checkOut = new Date(booking.checkOutDate);
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  
  // Add invoice items table
  const roomRate = booking.totalAmount / nights;
  
  autoTable(doc, {
    startY: 120,
    head: [['Description', 'Nights', 'Rate', 'Amount']],
    body: [
      [
        `${booking.room?.type} Room (${booking.room?.number})`,
        nights.toString(),
        `$${roomRate.toFixed(2)}`,
        `$${booking.totalAmount.toFixed(2)}`
      ],
      ['Additional Services', '', '', '$0.00'],
    ],
    foot: [
      ['', '', 'Subtotal', `$${booking.totalAmount.toFixed(2)}`],
      ['', '', 'Tax (13%)', `$${(booking.totalAmount * 0.13).toFixed(2)}`],
      ['', '', 'Total', `$${(booking.totalAmount * 1.13).toFixed(2)}`]
    ],
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [62, 82, 163], textColor: [255, 255, 255] },
    footStyles: { fillColor: [240, 240, 240] }
  });
  
  // Add payment information
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFontSize(12);
  doc.text('Payment Information:', 20, finalY);
  doc.setFontSize(10);
  doc.text(`Status: ${booking.paymentStatus}`, 20, finalY + 6);
  doc.text(`Method: ${booking.paymentMethod || 'N/A'}`, 20, finalY + 12);
  
  // Add terms and conditions
  doc.setFontSize(10);
  doc.text('Terms & Conditions:', 20, finalY + 25);
  doc.setFontSize(8);
  doc.text('1. Check-in time is 2:00 PM and check-out time is 12:00 PM.', 20, finalY + 32);
  doc.text('2. This invoice is computer-generated and does not require a signature.', 20, finalY + 38);
  doc.text('3. For any queries regarding this invoice, please contact our reception.', 20, finalY + 44);
  
  // Add footer
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('Thank you for choosing Satkar Hotels!', 105, 280, { align: 'center' });
  
  // Save the PDF
  doc.save(`Invoice-${booking.id}.pdf`);
};
