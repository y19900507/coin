/**
 * 领域层基础异常
 */
export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainException';
  }
}

/**
 * 领域规则违反异常
 */
export class DomainRuleViolationException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'DomainRuleViolationException';
  }
}

/**
 * 余额不足异常
 */
export class InsufficientBalanceException extends DomainRuleViolationException {
  constructor(currency: string, required: number, available: number) {
    super(`Insufficient balance for ${currency}: required ${required}, available ${available}`);
    this.name = 'InsufficientBalanceException';
  }
}

/**
 * 订单验证异常
 */
export class OrderValidationException extends DomainRuleViolationException {
  constructor(message: string) {
    super(message);
    this.name = 'OrderValidationException';
  }
} 