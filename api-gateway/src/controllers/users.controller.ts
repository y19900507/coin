import { Controller, Post, Body, Get, Param, Put, UseGuards, Req, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterUserDto, LoginUserDto, UserResponseDto, UpdateUserDto } from 'shared-lib';
import { firstValueFrom } from 'rxjs';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  onModuleInit() {
    // 订阅必要的响应主题
    this.userClient.subscribeToResponseOf('user.register');
    this.userClient.subscribeToResponseOf('user.findById');
    this.userClient.subscribeToResponseOf('user.update');
    this.authClient.subscribeToResponseOf('auth.login');
  }

  @Post('register')
  @ApiOperation({ summary: '注册新用户' })
  @ApiResponse({ status: 201, description: '用户注册成功' })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return firstValueFrom(
      this.userClient.send('user.register', registerUserDto)
    );
  }

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @ApiResponse({ status: 200, description: '登录成功，返回令牌' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return firstValueFrom(
      this.authClient.send('auth.login', loginUserDto)
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取用户详情' })
  @ApiResponse({ status: 200, description: '返回用户信息' })
  async getUserById(@Param('id') id: string) {
    return firstValueFrom(
      this.userClient.send('user.findById', { id })
    );
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResponse({ status: 200, description: '用户信息更新成功' })
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return firstValueFrom(
      this.userClient.send('user.update', { id, ...updateUserDto })
    );
  }
} 