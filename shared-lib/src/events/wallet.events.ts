/**
 * 钱包余额更新事件
 */
export interface WalletBalanceUpdatedEvent {
  userId: string;
  walletId: string;
  currency: string;
  previousBalance: number;
  currentBalance: number;
  change: number;
  reason: string;
  timestamp: number;
}

/**
 * 充值事件
 */
export interface DepositEvent {
  userId: string;
  walletId: string;
  currency: string;
  amount: number;
  txHash?: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  timestamp: number;
}

/**
 * 提现事件
 */
export interface WithdrawalEvent {
  userId: string;
  walletId: string;
  currency: string;
  amount: number;
  fee: number;
  address: string;
  txHash?: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  timestamp: number;
}

/**
 * 事件主题常量
 */
export const WALLET_EVENTS = {
  BALANCE_UPDATED: 'wallet.balance_updated',
  DEPOSIT: 'wallet.deposit',
  WITHDRAWAL: 'wallet.withdrawal'
}; 