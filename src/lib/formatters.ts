
/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currency - The currency code (default: 'INR' for Indian Rupees)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  // Use Intl.NumberFormat but ensure we don't add the ₹ symbol twice
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Generate a unique customer ID based on email
 * @param email - Customer email address
 * @returns A unique customer ID
 */
export const generateCustomerID = (email: string): string => {
  // Simple hash function
  const hashCode = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };
  
  const hash = hashCode(email);
  const timestamp = Date.now().toString().slice(-6);
  return `CUS-${hash.toString(16).slice(0, 6).toUpperCase()}-${timestamp}`;
};

/**
 * Calculate credibility score based on booking history
 * 
 * @param bookingHistory - Customer's booking history
 * @returns A number between 0 and 100 representing credibility score
 */
export const calculateCredibilityScore = (
  totalBookings: number,
  completedStays: number,
  cancellations: number,
  noShows: number
): number => {
  // Base score
  let score = 50;
  
  // Add points for completed stays (each completed stay adds 10 points)
  score += completedStays * 10;
  
  // Subtract points for cancellations (each cancellation reduces by 10 points)
  score -= cancellations * 10;
  
  // Subtract points for no-shows (each no-show reduces by 20 points)
  score -= noShows * 20;
  
  // Ensure score stays between 0 and 100
  score = Math.min(100, Math.max(0, score));
  
  return score;
};

/**
 * Calculate GST based on room type
 * @param amount - Base amount before tax
 * @param roomType - Type of room (Standard, Deluxe, Suite, Presidential)
 * @returns GST amount
 */
export const calculateGST = (amount: number, roomType: string): number => {
  // Premium rooms (Deluxe, Suite, Presidential) have 28% GST
  // Standard rooms have 18% GST
  const gstRate = ['Deluxe', 'Suite', 'Presidential'].includes(roomType) ? 0.28 : 0.18;
  return amount * gstRate;
};

/**
 * Get the GST rate based on room type
 * @param roomType - Type of room
 * @returns GST rate as a percentage (18 or 28)
 */
export const getGSTRate = (roomType: string): number => {
  return ['Deluxe', 'Suite', 'Presidential'].includes(roomType) ? 28 : 18;
};

/**
 * Calculate the breakdown of a room price with GST
 * @param totalAmount - Total amount including GST
 * @param roomType - Type of room
 * @returns Object with baseAmount, gstAmount, and gstRate
 */
export const calculatePriceBreakdown = (totalAmount: number, roomType: string): {
  baseAmount: number;
  gstAmount: number;
  gstRate: number;
} => {
  const gstRate = getGSTRate(roomType);
  const gstMultiplier = gstRate / 100;
  
  // Calculate base amount (before GST) from total amount
  const baseAmount = totalAmount / (1 + gstMultiplier);
  const gstAmount = totalAmount - baseAmount;
  
  return {
    baseAmount,
    gstAmount,
    gstRate
  };
};
