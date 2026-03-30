import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../api/authService';
import { User, LoginDTO, RegisterDTO } from '../../types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  isInitialized: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginDTO, { rejectWithValue }) => {
    try {
      const data = await AuthService.login(credentials);
      localStorage.setItem('token', data.token);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка входа');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegisterDTO, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(data);
      localStorage.setItem('token', response.token);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка при регистрации');
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const user = await AuthService.getMe();
      return user; 
    } catch (err: any) {
      localStorage.removeItem('token');
      return rejectWithValue('Сессия истекла');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isInitialized = true; // Проверка завершена успешно
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isInitialized = true; // Проверка завершена (даже если токен плохой)
      });
  },
});

export const { logout, setInitialized } = authSlice.actions;
export default authSlice.reducer;