/**
 * 本地存储工具，提供了对localStorage和sessionStorage的封装，
 * 支持对象存储和过期时间设置。
 */

/**
 * 存储项接口
 */
interface StorageItem<T> {
  value: T;
  timestamp: number;
  expiry?: number; // 过期时间（毫秒）
}

/**
 * 获取存储项
 * @param key 存储键
 * @param storage 存储对象(localStorage或sessionStorage)
 * @returns 存储的值或undefined（如果不存在或已过期）
 */
function getItem<T>(key: string, storage: Storage = localStorage): T | undefined {
  try {
    const item = storage.getItem(key);
    if (!item) return undefined;

    const parsedItem: StorageItem<T> = JSON.parse(item);
    
    // 检查是否过期
    if (parsedItem.expiry && Date.now() - parsedItem.timestamp > parsedItem.expiry) {
      storage.removeItem(key);
      return undefined;
    }

    return parsedItem.value;
  } catch (error) {
    console.error(`Error reading from storage: ${error}`);
    return undefined;
  }
}

/**
 * 设置存储项
 * @param key 存储键
 * @param value 存储值
 * @param expiry 过期时间（毫秒），不设置则永不过期
 * @param storage 存储对象(localStorage或sessionStorage)
 */
function setItem<T>(
  key: string, 
  value: T, 
  expiry?: number, 
  storage: Storage = localStorage
): void {
  try {
    const item: StorageItem<T> = {
      value,
      timestamp: Date.now(),
      expiry
    };

    storage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error(`Error writing to storage: ${error}`);
  }
}

/**
 * 移除存储项
 * @param key 存储键
 * @param storage 存储对象
 */
function removeItem(key: string, storage: Storage = localStorage): void {
  try {
    storage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from storage: ${error}`);
  }
}

/**
 * 清空存储
 * @param storage 存储对象
 */
function clearStorage(storage: Storage = localStorage): void {
  try {
    storage.clear();
  } catch (error) {
    console.error(`Error clearing storage: ${error}`);
  }
}

/**
 * 获取所有存储键
 * @param storage 存储对象
 * @returns 所有键的数组
 */
function getKeys(storage: Storage = localStorage): string[] {
  try {
    return Object.keys(storage);
  } catch (error) {
    console.error(`Error getting storage keys: ${error}`);
    return [];
  }
}

// 导出localStorage相关方法
export const localStorageUtil = {
  getItem: <T>(key: string) => getItem<T>(key, localStorage),
  setItem: <T>(key: string, value: T, expiry?: number) => 
    setItem<T>(key, value, expiry, localStorage),
  removeItem: (key: string) => removeItem(key, localStorage),
  clear: () => clearStorage(localStorage),
  getKeys: () => getKeys(localStorage)
};

// 导出sessionStorage相关方法
export const sessionStorageUtil = {
  getItem: <T>(key: string) => getItem<T>(key, sessionStorage),
  setItem: <T>(key: string, value: T, expiry?: number) => 
    setItem<T>(key, value, expiry, sessionStorage),
  removeItem: (key: string) => removeItem(key, sessionStorage),
  clear: () => clearStorage(sessionStorage),
  getKeys: () => getKeys(sessionStorage)
}; 