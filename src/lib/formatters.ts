
/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currency - The currency code (default: 'USD')
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
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
