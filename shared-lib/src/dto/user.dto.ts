import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * 用户注册DTO
 */
export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

/**
 * 用户登录DTO
 */
export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

/**
 * 用户响应DTO
 */
export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 更新用户信息DTO
 */
export class UpdateUserDto {
  @IsString()
  username?: string;

  @IsEmail()
  email?: string;
} 