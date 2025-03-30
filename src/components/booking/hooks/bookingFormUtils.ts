
import { Guest } from '@/types';

/**
 * Filter guests based on search term
 */
export const getFilteredGuests = (guests: Guest[], searchTerm: string): Guest[] => {
  if (!Array.isArray(guests)) {
    return [];
  }
  
  return searchTerm.trim() !== '' 
    ? guests.filter(guest => 
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (guest.email && guest.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (guest.phone && guest.phone.includes(searchTerm))
      )
    : [];
};

/**
 * Get the display name for a payment method
 */
export const getMethodName = (value: string): string => {
  switch (value) {
    case 'cash': return 'Cash';
    case 'credit': return 'Credit Card';
    case 'debit': return 'Debit Card';
    case 'qr': return 'QR Code Payment';
    case 'upi': return 'UPI';
    case 'stripe': return 'Stripe';
    default: return 'Unknown Method';
  }
};

/**
 * Parse date string to Date object if provided
 */
export const parseDateIfProvided = (dateString?: string): Date | undefined => {
  if (!dateString) return undefined;
  try {
    return new Date(dateString);
  } catch (error) {
    console.error("Error parsing date:", error);
    return undefined;
  }
};
