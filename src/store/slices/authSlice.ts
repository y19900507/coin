import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义用户类型
interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
}

// 定义认证状态
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// 初始状态
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

// 创建切片
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 登录开始
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // 登录成功
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    // 登录失败
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    // 退出登录
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    // 更新用户信息
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    // 清除错误
    clearError: (state) => {
      state.error = null;
    }
  }
});

// 导出actions
export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updateUser, 
  clearError 
} = authSlice.actions;

// 导出reducer
export default authSlice.reducer; 