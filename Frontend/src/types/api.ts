export type OrderStatus = "PENDING" | "PREPARING" | "READY" | "COMPLETED" | "CANCELED";
export type DietType = "VEG" | "NON_VEG" | "BEVERAGE";
export type MealType = "BREAKFAST" | "LUNCH" | "DINNER";

export interface Admin {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  admin: Admin;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  price: number;
  prepTimeMins: number;
  type: MealType;
  category: string;
  diet: DietType;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  menuItem: MenuItem;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  tableNumber: string;
  guestCount: number;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discountText: string;
  imageUrl: string | null;
  isActive: boolean;
  validUntil: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardSummary {
  todaysOrders: number;
  todaysRevenue: number;
  pendingOrders: number;
  totalCustomers: number;
}
