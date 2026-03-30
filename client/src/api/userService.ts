import { apiClient } from './index';

export const UserService = {
  async updateFullProfile(data: any) {
    const response = await apiClient.put('/user/profile', data);
    return response.data;
  },

  async updateStatus(isSubscribed: boolean) {
    const response = await apiClient.patch('/user/status', { isSubscribed });
    return response.data;
  },
  
  async deleteAccount() {
    const response = await apiClient.delete('/user/account');
    return response.data;
  }
};