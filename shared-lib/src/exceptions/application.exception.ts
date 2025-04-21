/**
 * 应用层基础异常
 */
export class ApplicationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApplicationException';
  }
}

/**
 * 资源不存在异常
 */
export class NotFoundException extends ApplicationException {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`);
    this.name = 'NotFoundException';
  }
}

/**
 * 权限不足异常
 */
export class UnauthorizedException extends ApplicationException {
  constructor(message = 'Unauthorized access') {
    super(message);
    this.name = 'UnauthorizedException';
  }
}

/**
 * 验证失败异常
 */
export class ValidationException extends ApplicationException {
  constructor(errors: Record<string, string[]>) {
    super('Validation failed');
    this.name = 'ValidationException';
    this.errors = errors;
  }

  errors: Record<string, string[]>;
}