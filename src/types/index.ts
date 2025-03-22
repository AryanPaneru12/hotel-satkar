
// Add or update these types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'superadmin';
  createdAt: string;
  updatedAt?: string;
  credibilityScore?: number;
  bookingHistory?: BookingHistory;
}

export interface BookingHistory {
  totalBookings: number;
  cancellations: number;
  noShows: number;
  completedStays: number;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  nationality: string;
  idNumber: string;
  checkInDate: string;
  checkOutDate: string;
  roomId?: string;
  credibilityScore?: number;
  bookingHistory?: BookingHistory;
}

export interface Room {
  id: string;
  number: string;
  type: string;
  capacity: number;
  pricePerNight: number;
  price: number; // Added to make it compatible with existing code
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
  guestId?: string;
  room?: Room;
  roomId?: string;
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

export interface DashboardStats {
  totalBookings: number;
  availableRooms: number;
  occupiedRooms: number;
  todayCheckIns: number;
  todayCheckOuts: number;
  revenueToday: number;
  occupancyRate: number;
}

export interface CredibilityScoreCardProps {
  score: number;
  history?: BookingHistory;
}

export interface SidebarItem {
  title: string;
  path: string;
  icon: React.ElementType;
  adminOnly?: boolean;
  superAdminOnly?: boolean;
}

export interface BookingDetailsModalProps {
  booking: Booking | null;
  open: boolean;
  onClose: () => void;
  onMarkCheckIn: (bookingId: string) => void;
  onCancelBooking: (bookingId: string) => void;
  onGenerateInvoice: (booking: Booking) => void;
}
