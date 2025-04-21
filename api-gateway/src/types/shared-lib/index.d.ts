declare module 'shared-lib' {
  // 用户相关DTO
  export interface RegisterUserDto {
    username: string;
    email: string;
    password: string;
  }
  
  export interface LoginUserDto {
    email: string;
    password: string;
  }
  
  export interface UserResponseDto {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface UpdateUserDto {
    username?: string;
    email?: string;
  }
  
  // 订单相关DTO
  export interface CreateOrderDto {
    symbol: string;
    quantity: number;
    side: 'BUY' | 'SELL';
    type: 'LIMIT' | 'MARKET';
    price?: number;
  }
  
  export interface OrderResponseDto {
    id: string;
    userId: string;
    symbol: string;
    price: number;
    quantity: number;
    side: 'BUY' | 'SELL';
    type: 'LIMIT' | 'MARKET';
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface CancelOrderDto {
    orderId: string;
  }
  
  // 分页相关DTO
  export interface PaginationDto {
    page: number;
    limit: number;
  }
} 