import * as crypto from 'crypto';

/**
 * 生成随机字符串
 * @param length 字符串长度
 * @returns 随机字符串
 */
export function generateRandomString(length: number): string {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

/**
 * 对密码进行哈希处理
 * @param password 原始密码
 * @param salt 盐（可选，如果不提供则生成新的）
 * @returns 哈希结果和盐
 */
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const _salt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, _salt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt: _salt };
}

/**
 * 验证密码
 * @param password 待验证的密码
 * @param hash 存储的哈希
 * @param salt 盐
 * @returns 是否匹配
 */
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
} 