import { IsInt, IsOptional, Min } from 'class-validator';

/**
 * 分页查询DTO
 */
export class PaginationDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @IsInt()
  @Min(1)
  @IsOptional()
  limit: number = 10;
}

/**
 * 分页响应DTO
 */
export class PaginatedResponseDto<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * API响应DTO
 */
export class ApiResponseDto<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 