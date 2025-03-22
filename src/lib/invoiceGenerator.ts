
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Booking } from '@/types';

interface GenerateInvoiceOptions {
  includeLogo?: boolean;
  companyDetails?: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
}

export const generateInvoice = (booking: Booking, options: GenerateInvoiceOptions = {}) => {
  const doc = new jsPDF();

  const defaultCompanyDetails = {
    name: 'Satkar Hotel',
    address: '123 Himalayan View, Kathmandu, Nepal',
    email: 'info@satkar.com',
    phone: '+977 1234567890'
  };

  const companyDetails = options.companyDetails || defaultCompanyDetails;
  
  // Add the document title
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text('INVOICE', 105, 20, { align: 'center' });
  
  // Add invoice number and date
  doc.setFontSize(10);
  doc.text(`Invoice #: INV-${booking.id}`, 20, 40);
  doc.text(`Date: ${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`, 20, 45);
  doc.text(`Booking Reference: #${booking.id}`, 20, 50);
  
  // Add company details
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.text(companyDetails.name, 20, 65);
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(companyDetails.address, 20, 70);
  doc.text(`Email: ${companyDetails.email}`, 20, 75);
  doc.text(`Phone: ${companyDetails.phone}`, 20, 80);
  
  // Add customer details
  if (booking.guest) {
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text('Bill To:', 120, 65);
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(booking.guest.name, 120, 70);
    doc.text(`Email: ${booking.guest.email}`, 120, 75);
    doc.text(`Phone: ${booking.guest.phone}`, 120, 80);
    if (booking.guest.address) {
      doc.text(`Address: ${booking.guest.address}`, 120, 85);
    }
  }
  
  // Add booking details
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.text('Booking Details:', 20, 100);
  
  // Table for booking details
  const formattedCheckIn = new Date(booking.checkInDate).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'short', day: 'numeric' 
  });
  
  const formattedCheckOut = new Date(booking.checkOutDate).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'short', day: 'numeric' 
  });
  
  // Calculate the number of nights
  const checkInDate = new Date(booking.checkInDate);
  const checkOutDate = new Date(booking.checkOutDate);
  const nights = Math.floor((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const roomType = booking.room?.type || 'Standard Room';
  const roomNumber = booking.room?.number || 'Not assigned';
  const roomRate = booking.totalAmount / nights;
  
  const tableHeaders = [['Description', 'Nights', 'Rate', 'Amount']];
  const tableData = [[`${roomType} (Room ${roomNumber})`, nights, `$${roomRate.toFixed(2)}`, `$${booking.totalAmount.toFixed(2)}`]];
  
  // @ts-ignore - jspdf-autotable augments the jsPDF prototype
  doc.autoTable({
    startY: 105,
    head: tableHeaders,
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [60, 60, 60],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    styles: {
      fontSize: 9
    }
  });
  
  // Add total
  // @ts-ignore - accessing table object from autoTable
  const finalY = (doc as any).lastAutoTable.finalY || 140;
  
  doc.setFontSize(10);
  doc.text('Subtotal:', 140, finalY + 10);
  doc.text(`$${booking.totalAmount.toFixed(2)}`, 170, finalY + 10, { align: 'right' });
  
  doc.text('Tax (0%):', 140, finalY + 15);
  doc.text('$0.00', 170, finalY + 15, { align: 'right' });
  
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Total:', 140, finalY + 22);
  doc.text(`$${booking.totalAmount.toFixed(2)}`, 170, finalY + 22, { align: 'right' });
  doc.setFont(undefined, 'normal');
  
  // Add payment status
  doc.setFontSize(10);
  doc.text(`Payment Status: ${booking.paymentStatus}`, 20, finalY + 15);
  doc.text(`Payment Date: ${booking.paymentStatus === 'Paid' ? new Date().toLocaleDateString() : 'Pending'}`, 20, finalY + 20);
  
  // Add booking dates
  doc.text(`Check-in: ${formattedCheckIn}`, 20, finalY + 30);
  doc.text(`Check-out: ${formattedCheckOut}`, 20, finalY + 35);
  
  // Add terms and notes
  doc.setFontSize(10);
  doc.text('Terms and Conditions:', 20, finalY + 45);
  doc.setFontSize(8);
  doc.text('1. Check-in time is 2:00 PM, and check-out time is 12:00 PM.', 20, finalY + 50);
  doc.text('2. Cancellations must be made 24 hours before the check-in date for a full refund.', 20, finalY + 55);
  doc.text('3. Any damages to the property will be charged to the guest.', 20, finalY + 60);
  
  // Add footer
  doc.setFontSize(8);
  doc.text('Thank you for choosing Satkar Hotel for your stay!', 105, 280, { align: 'center' });
  doc.text('For any questions regarding this invoice, please contact our customer service.', 105, 285, { align: 'center' });
  
  return doc;
};

export const downloadInvoice = (booking: Booking, options: GenerateInvoiceOptions = {}) => {
  const doc = generateInvoice(booking, options);
  doc.save(`Invoice-${booking.id}.pdf`);
};
