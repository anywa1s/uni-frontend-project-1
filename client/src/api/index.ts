import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
  
//   isRefreshing = false;
//   failedQueue = [];
// };

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log(
    `[API Request] ${config.method?.toUpperCase() ?? 'UNKNOWN'}: ${config.url}`,
    config.data
  );

  if (config.method === 'get') {
    config.params = { ...config.params, _t: Date.now() };
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log('[API Response]', response.data);
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // // Обработка 401 Unauthorized
    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   if (originalRequest.url?.includes('/auth/login') || 
    //       originalRequest.url?.includes('/auth/register')) {
    //     console.error('Authentication failed');
    //     return Promise.reject(error);
    //   }

    //   if (isRefreshing) {
    //     return new Promise((resolve, reject) => {
    //       failedQueue.push({ resolve, reject });
    //     }).then(token => {
    //       originalRequest.headers.Authorization = `Bearer ${token}`;
    //       return apiClient(originalRequest);
    //     });
    //   }

    //   originalRequest._retry = true;
    //   isRefreshing = true;

    //   try {
    //     const refreshToken = localStorage.getItem('refreshToken');
        
    //     if (!refreshToken) {
    //       throw new Error('No refresh token');
    //     }

    //     const { data } = await axios.post(
    //       'http://localhost:3001/api/auth/refresh',
    //       { refreshToken }
    //     );

    //     localStorage.setItem('token', data.token);
    //     localStorage.setItem('refreshToken', data.refreshToken);

    //     originalRequest.headers.Authorization = `Bearer ${data.token}`;
        
    //     processQueue(null, data.token);
    //     return apiClient(originalRequest);
    //   } 
    //   catch (refreshError) {
    //     processQueue(refreshError, null);

    //     localStorage.clear();
    //     window.location.href = '/login';
        
    //     return Promise.reject(refreshError);
    //   }
    // }

    // Обработка 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes('/auth/login') || 
          originalRequest.url?.includes('/auth/register')) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      try { 
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post('http://localhost:3001/api/auth/refresh', { refreshToken });

        localStorage.setItem('token', data.token);
        originalRequest.headers.Authorization = `Bearer ${data.token}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      }
    }

    // Обработка 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access denied');
    }

    // 404 Not Found
    if (error.response?.status === 404) {
      console.error('Resource not found');
    }

    // 500 Server Error
    if (error.response?.status === 500) {
      console.error('Server error. Please try later');
    }

    // Обработка отсутствия интернета
    if (!error.response) {
      console.error('Network error. Check your connection');
    }

    return Promise.reject(error);
  }
);