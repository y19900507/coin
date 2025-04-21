import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 用户登录参数
interface LoginRequest {
  username: string;
  password: string;
}

// 用户注册参数
interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

// 验证码请求参数
interface VerifyCodeRequest {
  email: string;
}

// 登录响应
interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    avatar?: string;
  }
}

// 认证API
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    // 登录
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // 注册
    register: builder.mutation<{ message: string }, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    
    // 发送验证码
    sendVerifyCode: builder.mutation<{ message: string }, VerifyCodeRequest>({
      query: (data) => ({
        url: '/auth/send-verify-code',
        method: 'POST',
        body: data,
      }),
    }),
    
    // 忘记密码请求
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    
    // 重置密码
    resetPassword: builder.mutation<
      { message: string }, 
      { token: string; password: string; confirmPassword: string }
    >({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    
    // 获取当前用户信息
    getCurrentUser: builder.query<LoginResponse['user'], void>({
      query: () => '/auth/me',
    }),
    
    // 更新用户信息
    updateProfile: builder.mutation<
      { user: LoginResponse['user']; message: string }, 
      Partial<Omit<LoginResponse['user'], 'id' | 'role'>>
    >({
      query: (data) => ({
        url: '/auth/profile',
        method: 'PATCH',
        body: data,
      }),
    }),
    
    // 更改密码
    changePassword: builder.mutation<
      { message: string }, 
      { currentPassword: string; newPassword: string; confirmPassword: string }
    >({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
    }),
    
    // 退出登录
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

// 导出生成的hooks
export const {
  useLoginMutation,
  useRegisterMutation,
  useSendVerifyCodeMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useLogoutMutation,
} = authApi; 