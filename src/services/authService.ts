import axiosInstance from './axiosConfig';
import axios from 'axios';
interface RegisterData {
  otp: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}

interface LoginData {
  user_email: string;
  user_password: string;
}

interface LoginResponse {
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
  refreshExpiresIn: string;
}

interface UserProfile {
  id: number;
  role: string;
  enabled: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  username: string;
}



const authService = {
  // 注册
  register: async (data: RegisterData) => {
    return axios.post(`/api/v1/auth/register`, data);
  },


  // 登录
  login: async (data: LoginData) => {
    return axios.post<LoginResponse>('/api/v1/auth/login', data);
  },

  // 检查用户是否存在
  checkUserExist: async (param: string) => {
    return axiosInstance.post<boolean>('/auth/user_exist', null, {
      params: { param }
    });
  },

  // 重新发送确认邮件
  resendConfirmEmail: async (email: string) => {
    return axiosInstance.post<string>('/auth/resend/confirm_email', null, {
      params: { email }
    });
  },

  // 刷新 token
  refreshToken: async () => {
    return axiosInstance.post('/auth/refresh/token');
  },

  // 忘记密码
  forgotPassword: async (email: string) => {
    return axiosInstance.post('/auth/forgot_password', null, {
      params: { email }
    });
  },
  getAllUsers: async () => {
    return axios.get<UserProfile[]>('/api/v1/users');
  },

  // 更新用户信息
  updateUser: async (userData: Partial<UserProfile>) => {
    return axiosInstance.patch<UserProfile>('/users', userData);
  },

  // 获取指定用户信息
  getUserById: async (userId: number) => {
    return axiosInstance.get<UserProfile>(`/users/${userId}`);
  },

  // 删除用户
  deleteUser: async (userId: number) => {
    return axiosInstance.delete(`/users/${userId}`);
  },

  // 通过邮箱获取用户
  getUserByEmail: async (email: string) => {
    return axiosInstance.get<UserProfile>(`/users/${email}`);
  },

  // 获取当前用户档案
  getUserProfile: async () => {
    return axiosInstance.get<UserProfile>('/users/profile');
  }
};

export default authService;