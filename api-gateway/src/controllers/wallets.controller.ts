import { Controller, Get, Post, Body, Param, Inject, UseGuards } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@ApiTags('wallets')
@Controller('wallets')
@ApiBearerAuth()
export class WalletsController {
  constructor(
    @Inject('WALLET_SERVICE') private readonly walletClient: ClientKafka,
  ) {}

  onModuleInit() {
    // 订阅必要的响应主题
    this.walletClient.subscribeToResponseOf('wallet.findByUserId');
    this.walletClient.subscribeToResponseOf('wallet.findByUserIdAndCurrency');
    this.walletClient.subscribeToResponseOf('wallet.deposit');
    this.walletClient.subscribeToResponseOf('wallet.withdraw');
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '获取用户所有钱包' })
  @ApiResponse({ status: 200, description: '返回用户钱包列表' })
  async getUserWallets(@Param('userId') userId: string) {
    return firstValueFrom(
      this.walletClient.send('wallet.findByUserId', { userId })
    );
  }

  @Get('user/:userId/currency/:currency')
  @ApiOperation({ summary: '获取用户指定币种钱包' })
  @ApiResponse({ status: 200, description: '返回用户指定币种钱包' })
  async getUserWalletByCurrency(
    @Param('userId') userId: string,
    @Param('currency') currency: string,
  ) {
    return firstValueFrom(
      this.walletClient.send('wallet.findByUserIdAndCurrency', { userId, currency })
    );
  }

  @Post('deposit')
  @ApiOperation({ summary: '充值' })
  @ApiResponse({ status: 200, description: '充值成功' })
  async deposit(@Body() depositDto: any) { // 这里可以定义专门的DTO
    return firstValueFrom(
      this.walletClient.send('wallet.deposit', depositDto)
    );
  }

  @Post('withdraw')
  @ApiOperation({ summary: '提币' })
  @ApiResponse({ status: 200, description: '提币请求已受理' })
  async withdraw(@Body() withdrawDto: any) { // 这里可以定义专门的DTO
    return firstValueFrom(
      this.walletClient.send('wallet.withdraw', withdrawDto)
    );
  }
} 