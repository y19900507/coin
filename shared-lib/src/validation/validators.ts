import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * 验证字符串是否是有效的加密货币地址
 */
export function IsCryptoAddress(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCryptoAddress',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // 这里可以实现针对不同加密货币的地址验证逻辑
          // 简单示例，检查是否是以0x开头的以太坊地址
          return typeof value === 'string' && /^0x[a-fA-F0-9]{40}$/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid cryptocurrency address`;
        }
      }
    });
  };
}

/**
 * 验证交易对格式是否正确
 */
export function IsValidSymbol(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidSymbol',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // 验证交易对格式，如 BTC/USDT、ETH/BTC 等
          return typeof value === 'string' && /^[A-Z0-9]{2,10}\/[A-Z0-9]{2,10}$/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid trading symbol format (e.g. BTC/USDT)`;
        }
      }
    });
  };
} 