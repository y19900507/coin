import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch } from '../app/hooks';
import webSocketService, { WebSocketStatus } from '../services/websocket';

interface UseWebSocketOptions {
  autoConnect?: boolean;
  channels?: string[];
}

/**
 * 使用WebSocket服务的钩子
 * @param options 选项
 * @returns WebSocket状态和控制方法
 */
export const useWebSocket = (options: UseWebSocketOptions = {}) => {
  const { autoConnect = true, channels = [] } = options;
  const [status, setStatus] = useState<WebSocketStatus>(webSocketService.getStatus());
  const dispatch = useAppDispatch();

  // 连接WebSocket
  const connect = useCallback(async () => {
    try {
      webSocketService.setDispatch(dispatch);
      await webSocketService.connect();
      setStatus(webSocketService.getStatus());
      return true;
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      setStatus(webSocketService.getStatus());
      return false;
    }
  }, [dispatch]);

  // 断开WebSocket连接
  const disconnect = useCallback(() => {
    webSocketService.disconnect();
    setStatus(webSocketService.getStatus());
  }, []);

  // 订阅频道
  const subscribe = useCallback((channel: string) => {
    return webSocketService.subscribe(channel);
  }, []);

  // 取消订阅频道
  const unsubscribe = useCallback((channel: string) => {
    return webSocketService.unsubscribe(channel);
  }, []);

  // 发送消息
  const send = useCallback((message: any) => {
    return webSocketService.send(message);
  }, []);

  // 自动连接并订阅
  useEffect(() => {
    let mounted = true;

    if (autoConnect) {
      (async () => {
        const connected = await connect();
        if (mounted && connected && channels.length > 0) {
          channels.forEach(channel => subscribe(channel));
        }
      })();
    }

    // 创建一个定时器检查WebSocket状态
    const statusInterval = setInterval(() => {
      if (mounted) {
        const currentStatus = webSocketService.getStatus();
        if (status !== currentStatus) {
          setStatus(currentStatus);
        }
      }
    }, 1000);

    return () => {
      mounted = false;
      clearInterval(statusInterval);
      
      // 当组件卸载时，取消所有频道的订阅但不断开连接，因为其他组件可能还在使用
      if (channels.length > 0) {
        channels.forEach(channel => unsubscribe(channel));
      }
    };
  }, [autoConnect, channels, connect, status, subscribe, unsubscribe]);

  return {
    status,
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    send
  };
};

export default useWebSocket; 