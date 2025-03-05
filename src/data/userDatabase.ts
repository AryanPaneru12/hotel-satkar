
import { User } from '../types';

// Admin users database
export const adminUsers: User[] = [
  {
    id: '1',
    email: 'ankit@satkar.com',
    name: 'Ankit Sharma',
    role: 'superadmin',
    createdAt: '2023-01-01T10:00:00Z'
  },
  {
    id: '2',
    email: 'raj@satkar.com',
    name: 'Raj Poudel',
    role: 'admin',
    createdAt: '2023-01-15T10:00:00Z'
  }
];

// Customer users database
export const customerUsers: User[] = [
  {
    id: '3',
    email: 'binod@example.com',
    name: 'Binod Thapa',
    role: 'customer',
    createdAt: '2023-02-10T10:00:00Z'
  },
  {
    id: '4',
    email: 'priya@example.com',
    name: 'Priya Gurung',
    role: 'customer',
    createdAt: '2023-02-15T10:00:00Z'
  },
  {
    id: '5',
    email: 'ramesh@example.com',
    name: 'Ramesh Adhikari',
    role: 'customer',
    createdAt: '2023-03-01T10:00:00Z'
  }
];

// Function to check user role from email
export const getUserByEmail = (email: string): User | undefined => {
  // First check admin database
  const adminUser = adminUsers.find(user => user.email === email);
  if (adminUser) {
    return adminUser;
  }
  
  // Then check customer database
  return customerUsers.find(user => user.email === email);
};
