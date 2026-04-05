import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../api/authService';
import { User, LoginDTO, RegisterDTO } from '../../types/auth';
import { getErrorMessage } from '../../types/error';
import { setLoading, showError } from './settingsSlice';

interface AuthState {
  user: User | null;
  token: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isInitialized: false,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginDTO, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const data = await AuthService.login(credentials);
      localStorage.setItem('token', data.token);
      return data;
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

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegisterDTO, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await AuthService.register(data);
      localStorage.setItem('token', response.token);
      return response;
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

export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const user = await AuthService.getMe();
      return user;
    } 
    catch (err: unknown) {
      localStorage.removeItem('token');
      const message = getErrorMessage(err); 
      return rejectWithValue(message);
    } 
    finally {
      dispatch(setLoading(false));
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
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isInitialized = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isInitialized = true;
      });
  },
});

export const { logout, setInitialized } = authSlice.actions;
export default authSlice.reducer;