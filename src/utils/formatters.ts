/**
 * 格式化数字为指定精度的字符串
 * @param num 要格式化的数字
 * @param precision 精度（小数位数）
 * @returns 格式化后的字符串
 */
export const formatNumber = (num: number, precision: number = 2): string => {
  return num.toFixed(precision);
};

/**
 * 格式化数字为带千位分隔符的字符串
 * @param num 要格式化的数字
 * @param precision 精度（小数位数）
 * @returns 格式化后的字符串
 */
export const formatNumberWithCommas = (num: number, precision: number = 2): string => {
  return num.toLocaleString(undefined, { 
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  });
};

/**
 * 格式化价格（根据精度和大小自动调整显示）
 * @param price 价格
 * @param precision 精度
 * @returns 格式化后的价格字符串
 */
export const formatPrice = (price: number, precision: number = 2): string => {
  if (price < 0.000001) return price.toExponential(precision);
  if (price < 0.001) return price.toFixed(8);
  if (price < 1) return price.toFixed(6);
  if (price < 1000) return price.toFixed(precision);
  if (price < 10000) return price.toFixed(1);
  if (price < 1000000) {
    return `${(price / 1000).toFixed(2)}K`;
  }
  return `${(price / 1000000).toFixed(2)}M`;
};

/**
 * 格式化数量（根据精度自动调整显示）
 * @param quantity 数量
 * @param precision 精度
 * @returns 格式化后的数量字符串
 */
export const formatQuantity = (quantity: number, precision: number = 4): string => {
  if (quantity < 0.000001) return quantity.toExponential(precision);
  if (quantity < 0.001) return quantity.toFixed(8);
  if (quantity < 1) return quantity.toFixed(precision);
  if (quantity < 1000) return quantity.toFixed(2);
  if (quantity < 1000000) {
    return `${(quantity / 1000).toFixed(2)}K`;
  }
  return `${(quantity / 1000000).toFixed(2)}M`;
};

/**
 * 格式化百分比
 * @param percent 百分比（0-100）
 * @param precision 精度
 * @returns 格式化后的百分比字符串
 */
export const formatPercent = (percent: number, precision: number = 2): string => {
  return `${percent.toFixed(precision)}%`;
};

/**
 * 格式化时间戳为日期字符串
 * @param timestamp 时间戳
 * @param format 格式（full, date, time, datetime）
 * @returns 格式化后的日期字符串
 */
export const formatTimestamp = (
  timestamp: number, 
  format: 'full' | 'date' | 'time' | 'datetime' = 'datetime'
): string => {
  const date = new Date(timestamp);
  
  switch (format) {
    case 'full':
      return date.toLocaleString();
    case 'date':
      return date.toLocaleDateString();
    case 'time':
      return date.toLocaleTimeString();
    case 'datetime':
    default:
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }
};

/**
 * 缩写地址（如钱包地址）
 * @param address 地址字符串
 * @param startChars 开始保留的字符数
 * @param endChars 结束保留的字符数
 * @returns 缩写后的地址
 */
export const shortenAddress = (
  address: string, 
  startChars: number = 6, 
  endChars: number = 4
): string => {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}; 