import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from 'redux';

// 导入API服务
import { apiReducers, apiMiddleware } from '../services/rtk';

// 导入状态切片
import authReducer, { loginSuccess, logout } from '../store/slices/authSlice';
import marketReducer from '../store/slices/marketSlice';
import settingsReducer from '../store/slices/settingsSlice';

// 创建根reducer
const rootReducer = combineReducers({
  ...apiReducers,
  // App state reducers
  auth: authReducer,
  market: marketReducer,
  settings: settingsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // 添加API中间件
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware || []),
  devTools: process.env.NODE_ENV !== 'production',
});

// 设置listeners以支持refetchOnFocus/refetchOnReconnect等功能
setupListeners(store.dispatch);

// 导出action creators
export { loginSuccess, logout };

// RootState和AppDispatch类型定义
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 