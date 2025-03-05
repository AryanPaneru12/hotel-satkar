
export interface Room {
  id: string;
  number: string;
  type: 'Standard' | 'Deluxe' | 'Suite' | 'Executive' | 'Presidential';
  capacity: number;
  price: number;
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';
  amenities: string[];
  images?: string[];
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  nationality?: string;
  idNumber?: string;
  checkInDate?: string;
  checkOutDate?: string;
  roomId?: string;
  image?: string;
}

export interface Booking {
  id: string;
  roomId: string;
  guestId: string;
  checkInDate: string;
  checkOutDate: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Checked In' | 'Checked Out';
  totalAmount: number;
  paymentStatus: 'Pending' | 'Paid' | 'Refunded' | 'Failed';
  createdAt: string;
  guest?: Guest;
  room?: Room;
}

export interface DashboardStats {
  totalBookings: number;
  availableRooms: number;
  occupiedRooms: number;
  todayCheckIns: number;
  todayCheckOuts: number;
  revenueToday: number;
  occupancyRate: number;
}

export interface SidebarItem {
  title: string;
  path: string;
  icon: React.ComponentType<any>;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin' | 'superadmin';
  createdAt: string;
}
