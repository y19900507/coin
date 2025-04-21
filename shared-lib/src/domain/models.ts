// 基本领域模型

/**
 * 用户实体基类
 */
export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 订单实体基类
 */
export interface Order {
  id: string;
  userId: string;
  symbol: string;
  price: number;
  quantity: number;
  side: 'BUY' | 'SELL';
  type: 'LIMIT' | 'MARKET';
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 钱包实体基类
 */
export interface Wallet {
  id: string;
  userId: string;
  currency: string;
  balance: number;
  available: number;
  locked: number;
  updatedAt: Date;
}

/**
 * 交易对基类
 */
export interface Symbol {
  id: string;
  baseCurrency: string;
  quoteCurrency: string;
  name: string;
  minOrderSize: number;
  maxOrderSize: number;
  status: 'ACTIVE' | 'INACTIVE';
}

/**
 * 订单状态枚举
 */
export type OrderStatus = 'NEW' | 'PARTIALLY_FILLED' | 'FILLED' | 'CANCELED' | 'REJECTED'; 