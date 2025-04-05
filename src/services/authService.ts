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
  forgotPassword: async (email: string, otp: string) => {
    return axiosInstance.post('/auth/forgot_password', null, {
      params: { email, otp }
    });
  }
};

export default authService;