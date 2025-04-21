/**
 * 消息发布接口
 */
export interface MessagePublisher {
  publish<T>(topic: string, message: T): Promise<void>;
}

/**
 * 消息订阅接口
 */
export interface MessageSubscriber {
  subscribe<T>(topic: string, handler: (message: T) => Promise<void>): void;
}

/**
 * 缓存服务接口
 */
export interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  del(key: string): Promise<void>;
}

/**
 * 认证服务接口
 */
export interface AuthService {
  validateToken(token: string): Promise<any>;
  generateToken(payload: any): Promise<string>;
}

/**
 * 通知服务接口
 */
export interface NotificationService {
  sendNotification(userId: string, type: string, payload: any): Promise<void>;
} 