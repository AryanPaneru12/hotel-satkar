
import { Booking } from '@/types';
import crypto from 'crypto-js';

/**
 * Generates a unique customer ID using SHA-256 hashing from an email
 */
export const generateCustomerId = (email: string): string => {
  const hashedEmail = crypto.SHA256(email).toString();
  // Return first 8 characters of hash for a shorter, manageable ID
  return hashedEmail.substring(0, 8).toUpperCase();
};

/**
 * Calculate customer credibility score based on their booking history
 * Score ranges from 0 to 100
 */
export const calculateCredibilityScore = (userBookings: Booking[]): number => {
  if (!userBookings || userBookings.length === 0) {
    return 50; // Default score for new customers
  }
  
  // Initialize with base score
  let score = 60;
  
  // Booking frequency (more bookings = higher score)
  score += Math.min(userBookings.length * 5, 20); // Up to +20 points
  
  // Deduct for cancellations
  const cancellations = userBookings.filter(booking => booking.status === 'Cancelled');
  score -= Math.min(cancellations.length * 10, 40); // Up to -40 points
  
  // Deduct for no-shows (assuming they have a noShow field or a status that indicates this)
  const noShows = userBookings.filter(booking => booking.status === 'No Show');
  score -= Math.min(noShows.length * 15, 50); // Up to -50 points
  
  // Completed bookings boost score
  const completed = userBookings.filter(booking => 
    booking.status === 'Checked Out'); // Changed from 'Completed' to 'Checked Out'
  score += Math.min(completed.length * 5, 30); // Up to +30 points
  
  // Make sure score is between 0 and 100
  return Math.max(0, Math.min(100, score));
};

/**
 * Determine if a customer can pay with cash based on credibility score
 */
export const canPayWithCash = (credibilityScore: number | null): boolean => {
  if (credibilityScore === null) return false;
  return credibilityScore >= 80; // Threshold is 80%
};
