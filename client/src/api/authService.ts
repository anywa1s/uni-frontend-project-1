import { apiClient } from './index';
import { RegisterDTO, LoginDTO, AuthResponse, User } from '../types/auth';

export const AuthService = {
  async register(data: RegisterDTO): Promise<AuthResponse> {
    return await apiClient.post('/auth/register', data);
  },

  async login(data: LoginDTO): Promise<AuthResponse> {
    return await apiClient.post('/auth/login', data);
  },

  async getMe(): Promise<User> {
    return await apiClient.get('/auth/me');
  }
};