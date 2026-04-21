import { apiClient } from './index';
import type { User } from '../types/auth';

export const UserService = {
  async updateName(name: string): Promise<User> {
    const response = await apiClient.patch<User>('/user/name', name);
    return response.data;
  },

  async updateFullProfile(data: Partial<User>): Promise<User> {
    const response = await apiClient.put<User>('/user/profile', data);
    return response.data;
  },

  async deleteAccount() {
    const response = await apiClient.delete('/user/account');
    return response.data;
  }
};