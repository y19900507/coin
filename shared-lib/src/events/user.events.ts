/**
 * 用户创建事件
 */
export interface UserCreatedEvent {
  id: string;
  username: string;
  email: string;
  timestamp: number;
}

/**
 * 用户更新事件
 */
export interface UserUpdatedEvent {
  id: string;
  username?: string;
  email?: string;
  timestamp: number;
}

/**
 * 用户登录事件
 */
export interface UserLoggedInEvent {
  id: string;
  email: string;
  timestamp: number;
  ip?: string;
  userAgent?: string;
}

/**
 * 事件主题常量
 */
export const USER_EVENTS = {
  CREATED: 'user.created',
  UPDATED: 'user.updated',
  LOGGED_IN: 'user.logged_in'
}; 