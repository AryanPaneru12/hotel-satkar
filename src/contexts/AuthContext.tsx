
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { getUserByEmail } from '@/data/userDatabase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    // In a real app, this would be a call to your backend
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = getUserByEmail(email);
        
        // In this mock implementation, we're just checking if the email exists
        // and using a simple password validation
        if (foundUser && password.length >= 6) {
          setUser(foundUser);
          localStorage.setItem('satkar_user', JSON.stringify(foundUser));
          setIsLoading(false);
          resolve(true);
        } else {
          setUser(null);
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('satkar_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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
