export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id?: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  grandTotal: number;
  customerId?: string;
  customerName?: string;
  note?: string;
  createdBy: string;
  createdByName: string;
  createdAt: number;
  updatedAt: number;
}
