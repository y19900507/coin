import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';
import { OrderSide, OrderType } from '../domain/enums';

/**
 * 创建订单DTO
 */
export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  symbol: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsEnum(OrderSide)
  side: OrderSide;

  @IsEnum(OrderType)
  type: OrderType;

  @IsNumber()
  @Min(0)
  price?: number;
}

/**
 * 订单响应DTO
 */
export class OrderResponseDto {
  id: string;
  userId: string;
  symbol: string;
  price: number;
  quantity: number;
  side: OrderSide;
  type: OrderType;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 取消订单DTO
 */
export class CancelOrderDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;
} 