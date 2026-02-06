export interface Product {
  id: string;
  name: string;
  nameMarathi?: string;
  category: 'mud-crab' | 'fish';
  description: string;
  price: number;
  unit: string;
  image: string;
  stock: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  area: string;
  pincode: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryCharge: number;
  finalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  deliveryDate?: Date;
  deliverySlot?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'out-for-delivery'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
  todayOrders: number;
  todayRevenue: number;
}
