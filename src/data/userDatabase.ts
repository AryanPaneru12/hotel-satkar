
import { User } from '../types';

// Admin users database
export const adminUsers: User[] = [
  {
    id: '1',
    email: 'aryan@satkar.com',
    name: 'Aryan Paneru',
    role: 'superadmin',
    createdAt: '2025-01-01T10:00:00Z'
  },
  {
    id: '2',
    email: 'john@satkar.com',
    name: 'John',
    role: 'admin',
    createdAt: '2025-01-15T10:00:00Z'
  }
];

// Customer users database
export const customerUsers: User[] = [
  {
    id: '3',
    email: 'nikit@satkar.com',
    name: 'Nikit Ban',
    role: 'customer',
    createdAt: '2025-02-15T10:00:00Z'
  },
  {
    id: '4',
    email: 'binod@example.com',
    name: 'Binod Thapa',
    role: 'customer',
    createdAt: '2025-02-10T10:00:00Z'
  },
  {
    id: '5',
    email: 'priya@example.com',
    name: 'Priya Gurung',
    role: 'customer',
    createdAt: '2025-02-15T10:00:00Z'
  },
  {
    id: '6',
    email: 'ramesh@example.com',
    name: 'Ramesh Adhikari',
    role: 'customer',
    createdAt: '2025-03-01T10:00:00Z'
  },
  {
    id: '7',
    email: 'sunita@example.com',
    name: 'Sunita Sharma',
    role: 'customer',
    createdAt: '2025-03-10T10:00:00Z'
  },
  {
    id: '8',
    email: 'arun@example.com',
    name: 'Arun Patel',
    role: 'customer',
    createdAt: '2025-03-15T10:00:00Z'
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
