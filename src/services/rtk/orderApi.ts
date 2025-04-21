import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 订单类型
export type OrderType = 'LIMIT' | 'MARKET' | 'STOP_LIMIT' | 'STOP_MARKET';

// 订单方向
export type OrderSide = 'BUY' | 'SELL';

// 有效期类型
export type TimeInForce = 'GTC' | 'IOC' | 'FOK';

// 订单状态
export type OrderStatus = 
  | 'NEW'          // 新建订单
  | 'PARTIALLY_FILLED' // 部分成交
  | 'FILLED'       // 全部成交
  | 'CANCELED'     // 已取消
  | 'REJECTED'     // 已拒绝
  | 'EXPIRED';     // 已过期

// 订单模型
export interface Order {
  id: string;
  symbol: string;
  clientOrderId?: string;
  price: number;
  origQty: number;
  executedQty: number;
  status: OrderStatus;
  timeInForce: TimeInForce;
  type: OrderType;
  side: OrderSide;
  stopPrice?: number;
  time: number;
  updateTime: number;
  isWorking: boolean;
  origQuoteOrderQty: number;
}

// 创建订单请求
export interface CreateOrderRequest {
  symbol: string;
  side: OrderSide;
  type: OrderType;
  timeInForce?: TimeInForce;
  quantity: number;
  price?: number;
  newClientOrderId?: string;
  stopPrice?: number;
  quoteOrderQty?: number;
}

// 订单API
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
  tagTypes: ['Order', 'OpenOrder'],
  endpoints: (builder) => ({
    // 创建订单
    createOrder: builder.mutation<Order, CreateOrderRequest>({
      query: (orderData) => ({
        url: '/order',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order', 'OpenOrder'],
    }),
    
    // 测试下单（不实际提交）
    testOrder: builder.mutation<{ msg: string }, CreateOrderRequest>({
      query: (orderData) => ({
        url: '/order/test',
        method: 'POST',
        body: orderData,
      }),
    }),
    
    // 查询订单
    getOrder: builder.query<Order, { symbol: string; orderId?: string; clientOrderId?: string }>({
      query: ({symbol, orderId, clientOrderId}) => {
        let url = `/order?symbol=${symbol}`;
        if (orderId) url += `&orderId=${orderId}`;
        if (clientOrderId) url += `&clientOrderId=${clientOrderId}`;
        return url;
      },
      providesTags: ['Order'],
    }),
    
    // 取消订单
    cancelOrder: builder.mutation<Order, { symbol: string; orderId?: string; clientOrderId?: string }>({
      query: ({symbol, orderId, clientOrderId}) => {
        let url = `/order?symbol=${symbol}`;
        if (orderId) url += `&orderId=${orderId}`;
        if (clientOrderId) url += `&clientOrderId=${clientOrderId}`;
        return {
          url,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Order', 'OpenOrder'],
    }),
    
    // 查询当前挂单
    getOpenOrders: builder.query<Order[], {symbol?: string}>({
      query: ({symbol}) => symbol ? `/order/open?symbol=${symbol}` : '/order/open',
      providesTags: ['OpenOrder'],
    }),
    
    // 取消所有挂单
    cancelAllOpenOrders: builder.mutation<{msg: string; count: number}, {symbol: string}>({
      query: ({symbol}) => ({
        url: `/order/open?symbol=${symbol}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order', 'OpenOrder'],
    }),
    
    // 查询所有订单（历史订单）
    getAllOrders: builder.query<
      Order[], 
      {symbol: string; orderId?: string; startTime?: number; endTime?: number; limit?: number}
    >({
      query: ({symbol, orderId, startTime, endTime, limit}) => {
        let url = `/order/history?symbol=${symbol}`;
        if (orderId) url += `&orderId=${orderId}`;
        if (startTime) url += `&startTime=${startTime}`;
        if (endTime) url += `&endTime=${endTime}`;
        if (limit) url += `&limit=${limit}`;
        return url;
      },
    }),
  }),
});

// 导出生成的hooks
export const {
  useCreateOrderMutation,
  useTestOrderMutation,
  useGetOrderQuery,
  useCancelOrderMutation,
  useGetOpenOrdersQuery,
  useCancelAllOpenOrdersMutation,
  useGetAllOrdersQuery,
} = orderApi; 