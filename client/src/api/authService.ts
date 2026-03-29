import { apiClient } from './index';
import { RegisterDTO, LoginDTO, AuthResponse, User } from '../types/auth';

export const AuthService = {
  /**
   * POST: Регистрация нового пользователя
   */
  async register(data: RegisterDTO): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  /**
   * POST: Вход в аккаунт
   * Отправляем email и пароль, в ответ получаем данные юзера и токен
   */
  async login(data: LoginDTO): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  /**
   * GET: Получение профиля текущего пользователя
   * (Обычно используется при перезагрузке страницы, чтобы "вспомнить" юзера по сохраненному токену)
   */
  async getMe(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  }
};