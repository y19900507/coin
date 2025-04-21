import { Controller, Get, Param, Inject, Query } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@ApiTags('markets')
@Controller('markets')
export class MarketsController {
  constructor(
    @Inject('MARKET_SERVICE') private readonly marketClient: ClientKafka,
  ) {}

  onModuleInit() {
    // 订阅必要的响应主题
    this.marketClient.subscribeToResponseOf('market.getAllSymbols');
    this.marketClient.subscribeToResponseOf('market.getSymbolInfo');
    this.marketClient.subscribeToResponseOf('market.getKlines');
    this.marketClient.subscribeToResponseOf('market.getTicker');
    this.marketClient.subscribeToResponseOf('market.getOrderBook');
  }

  @Get('symbols')
  @ApiOperation({ summary: '获取所有交易对' })
  @ApiResponse({ status: 200, description: '返回交易对列表' })
  async getAllSymbols() {
    return firstValueFrom(
      this.marketClient.send('market.getAllSymbols', {})
    );
  }

  @Get('symbols/:symbol')
  @ApiOperation({ summary: '获取交易对详情' })
  @ApiResponse({ status: 200, description: '返回交易对详情' })
  async getSymbolInfo(@Param('symbol') symbol: string) {
    return firstValueFrom(
      this.marketClient.send('market.getSymbolInfo', { symbol })
    );
  }

  @Get('klines')
  @ApiOperation({ summary: '获取K线数据' })
  @ApiResponse({ status: 200, description: '返回K线数据' })
  async getKlines(
    @Query('symbol') symbol: string,
    @Query('interval') interval: string,
    @Query('limit') limit: number,
    @Query('startTime') startTime?: number,
    @Query('endTime') endTime?: number,
  ) {
    return firstValueFrom(
      this.marketClient.send('market.getKlines', { symbol, interval, limit, startTime, endTime })
    );
  }

  @Get('ticker/:symbol')
  @ApiOperation({ summary: '获取最新行情' })
  @ApiResponse({ status: 200, description: '返回最新行情' })
  async getTicker(@Param('symbol') symbol: string) {
    return firstValueFrom(
      this.marketClient.send('market.getTicker', { symbol })
    );
  }

  @Get('depth/:symbol')
  @ApiOperation({ summary: '获取订单簿' })
  @ApiResponse({ status: 200, description: '返回订单簿数据' })
  async getOrderBook(
    @Param('symbol') symbol: string,
    @Query('limit') limit: number,
  ) {
    return firstValueFrom(
      this.marketClient.send('market.getOrderBook', { symbol, limit })
    );
  }
} 