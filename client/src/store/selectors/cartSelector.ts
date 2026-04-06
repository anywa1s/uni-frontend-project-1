import { RootState } from '../store';
import { calculateCartTotal } from '../../utils/cart';

export const selectCartTotal = (state: RootState) =>
  calculateCartTotal(state.cart.items);