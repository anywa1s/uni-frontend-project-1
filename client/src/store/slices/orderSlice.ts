import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OrderService } from '../../api/orderService';
import { Order, CreateOrderDTO } from '../../types/order';
import { setLoading, showError } from './settingsSlice';
import { clearCart } from './cartSlice';
import { getErrorMessage } from '../../types/error';
import { RootState } from '../store';
import { CartItem } from '../../types/cart';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
};

// создание заказа
export const createOrder = createAsyncThunk(
  'orders/create',
  async (data: CreateOrderDTO, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      const order = await OrderService.createOrder(data);

      dispatch(clearCart());

      return order;
    } 
    catch (err: unknown) {
      const message = getErrorMessage(err);
      dispatch(showError(message));
      return rejectWithValue(message);
    } 
    finally {
      dispatch(setLoading(false));
    }
  }
);

// получение истории заказов
export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const orders = await OrderService.fetchUserOrders();
      return orders;
    } 
    catch (err: unknown) {
      const message = getErrorMessage(err);
      dispatch(showError(message));
      return rejectWithValue(message);
    } 
    finally {
      dispatch(setLoading(false));
    }
  }
);

// получение заказа по id
export const fetchOrderById = createAsyncThunk(
  'orders/fetchById',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const order = await OrderService.fetchOrderById(id);
      return order;
    } 
    catch (err: unknown) {
      const message = getErrorMessage(err);
      dispatch(showError(message));
      return rejectWithValue(message);
    } 
    finally {
      dispatch(setLoading(false));
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.orders.unshift(action.payload);
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;