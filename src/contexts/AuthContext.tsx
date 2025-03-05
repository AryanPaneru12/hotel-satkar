
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
    try {
      // Add a short delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));

      const foundUser = getUserByEmail(email);
      
      if (!foundUser) {
        setIsLoading(false);
        return false;
      }
      
      // Check if user is an admin user
      const isAdminUser = foundUser.role === 'admin' || foundUser.role === 'superadmin';
      
      // Admin login check
      if (isAdminUser) {
        const adminPassword = "NaveenSir@2025";
        if (password === adminPassword) {
          setUser(foundUser);
          localStorage.setItem('satkar_user', JSON.stringify(foundUser));
          setIsLoading(false);
          return true;
        } else {
          setIsLoading(false);
          return false;
        }
      } 
      
      // Customer login check (simple validation for demo)
      else if (foundUser.role === 'customer') {
        // Same password for customer logins in this demo
        if (password === "NaveenSir@2025") {
          setUser(foundUser);
          localStorage.setItem('satkar_user', JSON.stringify(foundUser));
          setIsLoading(false);
          return true;
        } else {
          setIsLoading(false);
          return false;
        }
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
