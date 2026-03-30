import { apiClient } from './index';
import { RegisterDTO, LoginDTO, AuthResponse, User } from '../types/auth';

export const AuthService = {
  async register(data: RegisterDTO): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async login(data: LoginDTO): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async getMe(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  }
};