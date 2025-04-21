import { useState, useEffect } from 'react';

/**
 * 防抖钩子 - 防止函数在短时间内连续多次触发
 * @param value 要防抖的值
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的值
 */
function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 当value变化时设置一个定时器
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 当value再次变化时，清除之前的定时器
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce; 