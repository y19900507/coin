import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { marketApi } from './marketApi';

// 创建认证API
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
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

// 创建订单API
export const orderApi = createApi({
  reducerPath: 'orderApi',
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
    // 创建订单
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '/order',
        method: 'POST',
        body: orderData,
      }),
    }),
  }),
});

// 从marketApi.ts导出API hook
export { 
  useGetSymbolsQuery,
  useGetSymbolQuery,
  useGetKlinesQuery,
  useGetDepthQuery,
  useGetTradesQuery,
  useGet24hStatsQuery,
  useGetLatestPriceQuery,
  useGetBookTickerQuery
} from './marketApi';

// 导出认证API hook
export const { useLoginMutation } = authApi;

// 导出订单API hook
export const { useCreateOrderMutation } = orderApi;

// 为了在其他组件中轻松访问所有API的middleware和reducer
export const apiMiddleware = [
  marketApi.middleware,
  authApi.middleware,
  orderApi.middleware,
];

export const apiReducers = {
  [marketApi.reducerPath]: marketApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
}; 