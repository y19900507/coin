import { Controller, Post, Body, Get, Param, Delete, UseGuards, Inject, Query } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrderDto, OrderResponseDto, CancelOrderDto, PaginationDto } from 'shared-lib';
import { firstValueFrom } from 'rxjs';

@ApiTags('orders')
@Controller('orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientKafka,
  ) {}

  onModuleInit() {
    // 订阅必要的响应主题
    this.orderClient.subscribeToResponseOf('order.create');
    this.orderClient.subscribeToResponseOf('order.findById');
    this.orderClient.subscribeToResponseOf('order.findByUserId');
    this.orderClient.subscribeToResponseOf('order.cancel');
  }

  @Post()
  @ApiOperation({ summary: '创建订单' })
  @ApiResponse({ status: 201, description: '订单创建成功' })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return firstValueFrom(
      this.orderClient.send('order.create', createOrderDto)
    );
  }

  @Get()
  @ApiOperation({ summary: '获取用户订单列表' })
  @ApiResponse({ status: 200, description: '返回订单列表' })
  async getUserOrders(@Query() paginationDto: PaginationDto, @Query('userId') userId: string) {
    return firstValueFrom(
      this.orderClient.send('order.findByUserId', { userId, ...paginationDto })
    );
  }

  @Get(':id')
  @ApiOperation({ summary: '获取订单详情' })
  @ApiResponse({ status: 200, description: '返回订单详情' })
  async getOrderById(@Param('id') id: string) {
    return firstValueFrom(
      this.orderClient.send('order.findById', { id })
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: '取消订单' })
  @ApiResponse({ status: 200, description: '订单取消成功' })
  async cancelOrder(@Param('id') id: string) {
    const cancelOrderDto: CancelOrderDto = { orderId: id };
    return firstValueFrom(
      this.orderClient.send('order.cancel', cancelOrderDto)
    );
  }
} 