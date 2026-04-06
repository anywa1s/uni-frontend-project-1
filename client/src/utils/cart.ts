import { CartItem } from '../types/cart';

export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
};