import { OrderSide, OrderStatus, OrderType } from '../domain/enums';

/**
 * 订单创建事件
 */
export interface OrderCreatedEvent {
  id: string;
  userId: string;
  symbol: string;
  price: number;
  quantity: number;
  side: OrderSide;
  type: OrderType;
  timestamp: number;
}

/**
 * 订单执行事件
 */
export interface OrderExecutedEvent {
  id: string;
  userId: string;
  symbol: string;
  price: number;
  quantity: number;
  executedQuantity: number;
  side: OrderSide;
  status: OrderStatus;
  timestamp: number;
}

/**
 * 订单取消事件
 */
export interface OrderCanceledEvent {
  id: string;
  userId: string;
  symbol: string;
  reason: string;
  timestamp: number;
}

/**
 * 事件主题常量
 */
export const ORDER_EVENTS = {
  CREATED: 'order.created',
  EXECUTED: 'order.executed',
  CANCELED: 'order.canceled'
}; 