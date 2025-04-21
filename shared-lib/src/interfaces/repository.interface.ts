/**
 * 通用仓储接口
 */
export interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: Omit<T, 'id'>): Promise<T>;
  update(id: string, entity: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

/**
 * 用户仓储接口
 */
export interface UserRepository<T> extends Repository<T> {
  findByEmail(email: string): Promise<T | null>;
  findByUsername(username: string): Promise<T | null>;
}

/**
 * 订单仓储接口
 */
export interface OrderRepository<T> extends Repository<T> {
  findByUserId(userId: string): Promise<T[]>;
  findByStatus(status: string): Promise<T[]>;
}

/**
 * 钱包仓储接口
 */
export interface WalletRepository<T> extends Repository<T> {
  findByUserIdAndCurrency(userId: string, currency: string): Promise<T | null>;
  updateBalance(id: string, amount: number): Promise<T>;
} 