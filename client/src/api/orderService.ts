import { apiClient } from './index';
import { Order, CreateOrderDTO } from '../types/order';

export const OrderService = {
  async createOrder(orderData: CreateOrderDTO): Promise<Order> {
    const response = await apiClient.post<Order>('/orders', orderData);
    return response.data;
  },

  async fetchUserOrders(): Promise<Order[]> {
    const response = await apiClient.get<Order[]>('/orders/my');
    return response.data;
  },

  async fetchOrderById(id: string): Promise<Order> {
    const response = await apiClient.get<Order>(`/orders/${id}`);
    return response.data;
  },
};