import { apiClient } from './index';

export const UserService = {
  async updateName(name: string) {
    const response = await apiClient.patch('/user/name', { name });
    return response.data;
  },

  async updateFullProfile(data: any) {
    const response = await apiClient.put('/user/profile', data);
    return response.data;
  },

  async deleteAccount() {
    const response = await apiClient.delete('/user/account');
    return response.data;
  }
};