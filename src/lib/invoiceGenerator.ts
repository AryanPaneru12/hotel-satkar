
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Booking } from '@/types';
import { calculatePriceBreakdown, getGSTRate, formatCurrency } from './formatters';
import { findCustomerById } from '@/utils/customerUtils';

/**
 * Generate and download an invoice PDF for a booking
 */
export const downloadInvoice = (booking: Booking) => {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Add hotel logo and header
  doc.setFontSize(22);
  doc.setTextColor(44, 62, 80);
  doc.text('Hotel Satkar', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text('Tax Invoice / Receipt', 105, 30, { align: 'center' });
  
  // Add divider
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 35, 190, 35);
  
  // Get customer details - use the customer utility for more complete profile
  const customerProfile = booking.guest?.id ? 
    findCustomerById(booking.guest.id) : booking.guest;
  
  // Add invoice details
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  
  // Left column - Customer details
  doc.text('BILLED TO:', 20, 45);
  doc.setFont(undefined, 'bold');
  doc.text(customerProfile?.name || booking.guest?.name || 'Guest', 20, 50);
  doc.setFont(undefined, 'normal');
  doc.text(customerProfile?.email || booking.guest?.email || 'N/A', 20, 55);
  doc.text(`Customer ID: ${customerProfile?.id || booking.guest?.id || 'N/A'}`, 20, 60);
  
  // Right column - Invoice details
  doc.text('INVOICE NO:', 150, 45);
  doc.text(`INV-${booking.id}`, 150, 50);
  doc.text('DATE:', 150, 55);
  doc.text(new Date().toLocaleDateString(), 150, 60);
  
  // Add booking details
  doc.text('BOOKING DETAILS:', 20, 70);
  doc.text(`Check-in: ${new Date(booking.checkInDate).toLocaleDateString()}`, 20, 75);
  doc.text(`Check-out: ${new Date(booking.checkOutDate).toLocaleDateString()}`, 20, 80);
  doc.text(`Room: ${booking.room?.type} (${booking.room?.number})`, 20, 85);
  doc.text(`Status: ${booking.status}`, 20, 90);
  
  // Calculate number of nights
  const checkIn = new Date(booking.checkInDate);
  const checkOut = new Date(booking.checkOutDate);
  const nightsDiff = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  
  // Get GST rate based on room type
  const roomType = booking.room?.type || 'Standard';
  const gstRate = getGSTRate(roomType);
  
  // Calculate price breakdown
  const priceBreakdown = calculatePriceBreakdown(booking.totalAmount, roomType);
  
  // Create table for invoice items
  autoTable(doc, {
    startY: 100,
    head: [['Description', 'Rate (₹)', 'Nights', 'Amount (₹)']],
    body: [
      [
        `${booking.room?.type} Room (${booking.room?.number})`, 
        `${(priceBreakdown.baseAmount / nightsDiff).toFixed(2)}`,
        nightsDiff.toString(),
        `${priceBreakdown.baseAmount.toFixed(2)}`
      ],
      [
        `GST (${gstRate}%)`,
        '', 
        '',
        `${priceBreakdown.gstAmount.toFixed(2)}`
      ]
    ],
    foot: [
      ['', '', 'Total', `₹ ${booking.totalAmount.toFixed(2)}`]
    ],
    theme: 'striped',
    headStyles: { fillColor: [44, 62, 80] },
    footStyles: { fillColor: [240, 240, 240], textColor: [44, 62, 80], fontStyle: 'bold' }
  });
  
  // Add payment information
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.text('PAYMENT INFORMATION:', 20, finalY);
  doc.text(`Status: ${booking.paymentStatus}`, 20, finalY + 5);
  doc.text(`Method: ${booking.paymentMethod || 'N/A'}`, 20, finalY + 10);
  
  // Add customer credibility information if available
  if (customerProfile?.credibilityScore) {
    doc.text(`Customer Credibility Score: ${customerProfile.credibilityScore}%`, 20, finalY + 15);
  }
  
  // Add footer
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text('Thank you for choosing Hotel Satkar. We look forward to your next stay!', 105, 280, { align: 'center' });
  doc.text('Hotel Satkar - Established 2025', 105, 285, { align: 'center' });
  
  // Save the PDF
  doc.save(`Invoice-Booking-${booking.id}.pdf`);
};

// Add the missing export that's referenced in bookingUtils.ts
export const generateInvoice = downloadInvoice;
