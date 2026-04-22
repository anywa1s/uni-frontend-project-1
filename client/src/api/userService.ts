import { apiClient } from './index';
import type { User } from '../types/auth';

export const UserService = {
  async updateName(name: string): Promise<User> {
    return await apiClient.patch('/user/name', { name });
  },

  async updateFullProfile(data: Partial<User>): Promise<User> {
    return await apiClient.put('/user/profile', data);
  },

  async deleteAccount() {
    return await apiClient.delete('/user/account');
  }
};