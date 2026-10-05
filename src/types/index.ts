export type OrderStatus = 'NEW' | 'ACCEPTED' | 'PREPARING' | 'READY' | 'PICKED_UP' | 'REJECTED';
export type TripStatus =
  'READY' | 'EN_ROUTE' | 'APPROACHING_STATION' | 'AT_STATION' | 'DEPARTED_STATION' | 'ARRIVED';
export type Category = 'FOOD' | 'DRINK' | 'SPECIALTY' | 'CONVENIENCE';
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'traveler' | 'car' | 'truck' | 'coach';
  partnerStatus: 'none' | 'pending' | 'approved';
  company?: string;
  plate?: string;
}
export interface Stop {
  plannedAt?: string;
  distanceKm?: number;
  note?: string;
  id: string;
  name: string;
  stationId?: string;
  arrivalAt: string;
  restMinutes: number;
  checkedInAt?: string;
}
export interface Trip {
  desiredArrivalAt?: string;
  sourceName?: string;
  id: string;
  title: string;
  origin: string;
  destination: string;
  ownerId: string;
  members: string[];
  publicTripCode: string;
  status: TripStatus;
  plate?: string;
  company?: string;
  passengerCount: number;
  partnerTrip: boolean;
  commissionEligible: boolean;
  stops: Stop[];
}
export interface Station {
  id: string;
  name: string;
  address: string;
  description: string;
  facilities: string[];
  partner: boolean;
}
export interface Merchant {
  id: string;
  stationId: string;
  name: string;
  counter: string;
  acceptingOrders: boolean;
  username: string;
  password: string;
}
export interface Product {
  id: string;
  merchantId: string;
  stationId: string;
  name: string;
  description: string;
  category: Category;
  price: number;
  prepMinutes: number;
  available: boolean;
  illustration: string;
}
export interface CartItem {
  productId: string;
  quantity: number;
  note: string;
}
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  note: string;
}
export interface HistoryEvent {
  status: OrderStatus;
  at: string;
}
export interface MerchantOrder {
  id: string;
  orderId: string;
  merchantId: string;
  tripId: string;
  stationId: string;
  tripStopId: string;
  pickupCode: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  prepMinutes: number;
  bufferMinutes: number;
  rejectionReason?: string;
  history: HistoryEvent[];
}
export interface Order {
  pickupToken?: string;
  id: string;
  publicOrderCode: string;
  customerName: string;
  customerUserId?: string;
  guestSessionId?: string;
  tripId: string;
  stationId: string;
  merchantOrderIds: string[];
  total: number;
  paymentMethod: string;
  paymentStatus: 'PAID';
  createdAt: string;
}
export interface KitchenTicket {
  id: string;
  merchantOrderId: string;
  status: 'PRINTING' | 'PRINTED' | 'FAILED';
  arrivalAtSnapshot: string;
  printedAt?: string;
  reprintCount: number;
}
export interface GuestSession {
  id: string;
  name: string;
  phone: string;
}
export interface DemoData {
  users: User[];
  trips: Trip[];
  stations: Station[];
  merchants: Merchant[];
  products: Product[];
  orders: Order[];
  merchantOrders: MerchantOrder[];
  kitchenTickets: KitchenTicket[];
  demoTime: string;
  currentUserId: string;
  merchantSessionId: string | null;
  stationLoggedIn: boolean;
  guest: GuestSession | null;
  cart: CartItem[];
  cartTripId: string | null;
  cartStationId: string | null;
  printError: boolean;
  autoPrint: boolean;
  sound: boolean;
  appInstalled: boolean;
}
