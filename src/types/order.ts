export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'waiting' | 'preauth' | 'confirmed' | 'rejected' | 'refunded' | 'error' | 'input';

export interface Order {
  id: number;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: import('./user').Address | null;
  billingAddress: import('./user').Address | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productSlug: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}
