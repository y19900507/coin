import { useState, useEffect, useRef } from 'react';

/**
 * 节流钩子 - 限制函数的调用频率
 * @param value 要节流的值
 * @param delay 节流间隔（毫秒）
 * @returns 节流后的值
 */
function useThrottle<T>(value: T, delay: number = 200): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const elapsed = now - lastExecuted.current;

    if (elapsed >= delay) {
      // 如果已经过了节流间隔，立即更新值
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      // 否则设置一个定时器在剩余时间后更新
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, delay - elapsed);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle; 