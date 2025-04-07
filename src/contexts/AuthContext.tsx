
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { getUserByEmail } from '@/data/userDatabase';
import { bookings } from '@/data/bookings';
import { generateCustomerId, calculateCredibilityScore } from '@/utils/customerUtils';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean; // Added this property
  customerId: string | null;
  credibilityScore: number | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  canPayWithCash: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [credibilityScore, setCredibilityScore] = useState<number | null>(null);
  const [canPayWithCash, setCanPayWithCash] = useState(false);

  // Update customer ID and credibility score when user changes
  useEffect(() => {
    if (user) {
      const id = generateCustomerId(user.email);
      setCustomerId(id);
      
      // Calculate credibility score
      const userBookings = bookings.filter(booking => booking.guest?.id === user.id);
      const score = calculateCredibilityScore(userBookings);
      setCredibilityScore(score);
      setCanPayWithCash(score >= 80);
    } else {
      setCustomerId(null);
      setCredibilityScore(null);
      setCanPayWithCash(false);
    }
  }, [user]);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('satkar_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('satkar_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simple mock authentication
    try {
      // Add a short delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));

      const foundUser = getUserByEmail(email);
      
      if (!foundUser) {
        setIsLoading(false);
        return false;
      }
      
      // For this demo, we're using the same password for all users
      const mockPassword = "xxyy0011?";
      
      if (password === mockPassword) {
        setUser(foundUser);
        localStorage.setItem('satkar_user', JSON.stringify(foundUser));
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('satkar_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user, // Add this computed property
      customerId, 
      credibilityScore, 
      canPayWithCash,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
