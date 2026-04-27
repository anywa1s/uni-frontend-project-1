import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../api/authService';
import { UserService } from '../../api/userService';
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
      const token = localStorage.getItem('token');

      if (!token) {
        return rejectWithValue('No token');
      }

      dispatch(setLoading(true));
      const user = await AuthService.getMe();
      return user;
    } 
    catch (err: unknown) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      const message = getErrorMessage(err); 
      return rejectWithValue(message);
    } 
    finally {
      dispatch(setLoading(false));
    }
  }
);

export const updateUserData = createAsyncThunk(
  'auth/updateProfile',
  async (data: Partial<User>, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      dispatch(showError(''));
      const updated = await UserService.updateFullProfile(data);
      return updated;
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

export const updateUserName = createAsyncThunk(
  'auth/updateName',
  async (name: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      dispatch(showError(''));
      const updated = await UserService.updateName(name);
      return updated;
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

export const deleteUserAccount = createAsyncThunk(
  'auth/deleteAccount',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      await UserService.deleteAccount();
      localStorage.removeItem('token');
      return null;
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
        state.isInitialized = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isInitialized = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isInitialized = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isInitialized = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isInitialized = true;
      });
  },
});

export const { logout, setInitialized } = authSlice.actions;
export default authSlice.reducer;