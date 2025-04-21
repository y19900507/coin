/**
 * 订单类型枚举
 */
export enum OrderType {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET'
}

/**
 * 订单方向枚举
 */
export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL'
}

/**
 * 订单状态枚举
 */
export enum OrderStatus {
  NEW = 'NEW',
  PARTIALLY_FILLED = 'PARTIALLY_FILLED',
  FILLED = 'FILLED',
  CANCELED = 'CANCELED',
  REJECTED = 'REJECTED'
}

/**
 * 交易对状态枚举
 */
export enum SymbolStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

/**
 * 通知类型枚举
 */
export enum NotificationType {
  ORDER_CREATED = 'ORDER_CREATED',
  ORDER_FILLED = 'ORDER_FILLED',
  ORDER_CANCELED = 'ORDER_CANCELED',
  DEPOSIT_RECEIVED = 'DEPOSIT_RECEIVED',
  WITHDRAWAL_COMPLETED = 'WITHDRAWAL_COMPLETED'
} 