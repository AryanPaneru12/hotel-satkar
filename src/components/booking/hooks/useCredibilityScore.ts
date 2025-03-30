
import { useState, useEffect } from 'react';
import { calculateCredibilityScore } from '@/lib/formatters';
import { useAuth } from '@/contexts/AuthContext';
import { guests } from '@/data/guests';

export const useCredibilityScore = (selectedCustomerId: string) => {
  const { user } = useAuth();
  const [customerCredibilityScore, setCustomerCredibilityScore] = useState(0);

  // Update credibility score based on user or selected customer
  useEffect(() => {
    if (selectedCustomerId) {
      const selectedGuest = guests.find(g => g.id === selectedCustomerId);
      if (selectedGuest && selectedGuest.credibilityScore) {
        setCustomerCredibilityScore(selectedGuest.credibilityScore);
      } else if (selectedGuest && selectedGuest.bookingHistory) {
        const score = calculateCredibilityScore(
          selectedGuest.bookingHistory.totalBookings,
          selectedGuest.bookingHistory.completedStays,
          selectedGuest.bookingHistory.cancellations,
          selectedGuest.bookingHistory.noShows
        );
        setCustomerCredibilityScore(score);
      }
    } else if (user) {
      const mockHistory = {
        totalBookings: 5,
        completedStays: 4,
        cancellations: 1,
        noShows: 0
      };
      
      const score = calculateCredibilityScore(
        mockHistory.totalBookings,
        mockHistory.completedStays,
        mockHistory.cancellations,
        mockHistory.noShows
      );
      
      setCustomerCredibilityScore(score);
    }
  }, [user, selectedCustomerId]);

  return { customerCredibilityScore };
};
