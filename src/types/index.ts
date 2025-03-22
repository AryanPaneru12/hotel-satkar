// Add or update these types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'superadmin';
  createdAt: string;
  updatedAt?: string;
  credibilityScore?: number;
}

export interface Room {
  id: string;
  number: string;
  type: string;
  capacity: number;
  pricePerNight: number;
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';
  floor: number;
  amenities: string[];
  description: string;
  images: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface Booking {
  id: string;
  guest?: User;
  room?: Room;
  checkInDate: string;
  checkOutDate: string;
  status: 'Pending' | 'Confirmed' | 'Checked In' | 'Checked Out' | 'Cancelled' | 'No Show';
  paymentStatus: 'Pending' | 'Paid' | 'Refunded' | 'Failed';
  paymentMethod?: 'Cash' | 'Credit Card' | 'Debit Card' | 'Online' | 'Bank Transfer';
  totalAmount: number;
  specialRequests?: string;
  createdAt: string;
  updatedAt?: string;
}
