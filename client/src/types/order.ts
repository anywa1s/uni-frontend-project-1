import { CartItem } from './cart';

export interface Order {
  id: number;
  userId: string;
  items: CartItem[];
  total: number;

  recipientName: string;
  address: string;
  phone: string;
  email?: string;
  comment?: string;

  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDTO {
  items: CartItem[];
  total: number;
  userId?: number;

  recipientName: string;
  address: string;
  phone: string;
  email?: string;
  comment?: string;
}