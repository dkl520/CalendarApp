import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import authService from './authService';

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: '/api/v1',
  timeout: 20000, // 请求超时时间：10秒
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    // 如果是 401 错误（未授权），尝试使用 refresh token 获取新的 access token
    if (error.response?.status === 401 && originalRequest) {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // 调用刷新 token 的接口
        // const response = await axios.post('/api/v1/auth/refresh/token', {
        //   refreshToken
        // });
        const response = await authService.refreshToken();
        
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        // 更新原始请求的 token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        // 重试原始请求
        return axios(originalRequest);
      } catch (refreshError) {
        // 刷新 token 失败，清除所有 token 并跳转到登录页
        // localStorage.removeItem('accessToken');
        // localStorage.removeItem('refreshToken');
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;