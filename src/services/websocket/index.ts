import { Dispatch } from 'redux';
import { updateKline, addTrade, setDepth } from '../../store/slices/marketSlice';
import { Kline, Depth, Trade } from '../../store/slices/marketSlice';

// WebSocket 连接状态
export enum WebSocketStatus {
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  RECONNECTING = 'reconnecting',
  CLOSING = 'closing',
  CLOSED = 'closed',
  ERROR = 'error'
}

// WebSocket 消息类型
export enum WebSocketMessageType {
  KLINE = 'kline',
  TRADE = 'trade',
  DEPTH = 'depth',
  TICKER = 'ticker',
}

// WebSocket 消息接口
export interface WebSocketMessage {
  type: WebSocketMessageType;
  symbol: string;
  data: any;
}

// WebSocket 配置
interface WebSocketConfig {
  url: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

// 默认配置
const defaultConfig: WebSocketConfig = {
  url: process.env.REACT_APP_WS_URL || 'ws://localhost:8000/ws',
  reconnectInterval: 5000,
  maxReconnectAttempts: 5
};

class WebSocketService {
  private socket: WebSocket | null = null;
  private config: WebSocketConfig;
  private status: WebSocketStatus = WebSocketStatus.CLOSED;
  private reconnectAttempts = 0;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private subscriptions: Set<string> = new Set();
  private dispatch: Dispatch | null = null;

  constructor(config: WebSocketConfig = defaultConfig) {
    this.config = { ...defaultConfig, ...config };
  }

  // 初始化Redux dispatch
  public setDispatch(dispatch: Dispatch) {
    this.dispatch = dispatch;
  }

  // 连接WebSocket
  public connect(): Promise<void> {
    if (this.socket && (this.status === WebSocketStatus.CONNECTED || this.status === WebSocketStatus.CONNECTING)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      try {
        this.status = WebSocketStatus.CONNECTING;
        this.socket = new WebSocket(this.config.url);

        this.socket.onopen = () => {
          this.status = WebSocketStatus.CONNECTED;
          this.reconnectAttempts = 0;
          console.log('WebSocket connected');
          
          // 重新订阅之前的订阅
          this.resubscribe();
          resolve();
        };

        this.socket.onclose = (event) => {
          if (this.status !== WebSocketStatus.CLOSING) {
            this.status = WebSocketStatus.CLOSED;
            this.attemptReconnect();
          } else {
            this.status = WebSocketStatus.CLOSED;
          }
          console.log(`WebSocket closed: ${event.code} ${event.reason}`);
        };

        this.socket.onerror = (error) => {
          this.status = WebSocketStatus.ERROR;
          console.error('WebSocket error:', error);
          reject(error);
        };

        this.socket.onmessage = (event) => {
          this.handleMessage(event);
        };
      } catch (error) {
        this.status = WebSocketStatus.ERROR;
        console.error('WebSocket connection error:', error);
        reject(error);
      }
    });
  }

  // 处理收到的消息
  private handleMessage(event: MessageEvent) {
    try {
      const message: WebSocketMessage = JSON.parse(event.data);
      
      if (!this.dispatch) {
        console.warn('Redux dispatch not set in WebSocketService');
        return;
      }

      switch (message.type) {
        case WebSocketMessageType.KLINE:
          const kline = message.data as Kline;
          this.dispatch(updateKline({ symbol: message.symbol, kline }));
          break;
        
        case WebSocketMessageType.TRADE:
          const trade = message.data as Trade;
          this.dispatch(addTrade({ symbol: message.symbol, trade }));
          break;
        
        case WebSocketMessageType.DEPTH:
          const depth = message.data as Depth;
          this.dispatch(setDepth({ symbol: message.symbol, depth }));
          break;
        
        case WebSocketMessageType.TICKER:
          // 处理ticker消息
          break;
        
        default:
          console.warn('Unknown WebSocket message type:', message.type);
      }
    } catch (error) {
      console.error('Error handling WebSocket message:', error);
    }
  }

  // 尝试重新连接
  private attemptReconnect() {
    if (
      this.reconnectAttempts < (this.config.maxReconnectAttempts || 5) &&
      this.status !== WebSocketStatus.CONNECTING
    ) {
      this.status = WebSocketStatus.RECONNECTING;
      this.reconnectAttempts += 1;
      
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
      }
      
      this.reconnectTimeout = setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.config.maxReconnectAttempts})`);
        this.connect().catch(() => {
          console.error('Reconnection attempt failed');
        });
      }, this.config.reconnectInterval);
    } else {
      this.status = WebSocketStatus.CLOSED;
      console.error('Max reconnection attempts reached');
    }
  }

  // 重新订阅之前的频道
  private resubscribe() {
    if (this.subscriptions.size > 0 && this.status === WebSocketStatus.CONNECTED && this.socket) {
      this.subscriptions.forEach(channel => {
        this.socket?.send(JSON.stringify({ action: 'subscribe', channel }));
      });
    }
  }

  // 订阅频道
  public subscribe(channel: string): boolean {
    if (this.status !== WebSocketStatus.CONNECTED || !this.socket) {
      this.subscriptions.add(channel);
      return false;
    }

    try {
      this.socket.send(JSON.stringify({ action: 'subscribe', channel }));
      this.subscriptions.add(channel);
      return true;
    } catch (error) {
      console.error('Error subscribing to channel:', error);
      return false;
    }
  }

  // 取消订阅频道
  public unsubscribe(channel: string): boolean {
    this.subscriptions.delete(channel);

    if (this.status !== WebSocketStatus.CONNECTED || !this.socket) {
      return false;
    }

    try {
      this.socket.send(JSON.stringify({ action: 'unsubscribe', channel }));
      return true;
    } catch (error) {
      console.error('Error unsubscribing from channel:', error);
      return false;
    }
  }

  // 关闭连接
  public disconnect() {
    if (this.socket && this.status === WebSocketStatus.CONNECTED) {
      this.status = WebSocketStatus.CLOSING;
      this.socket.close();
    }
    
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    
    this.socket = null;
    this.status = WebSocketStatus.CLOSED;
  }

  // 获取当前状态
  public getStatus(): WebSocketStatus {
    return this.status;
  }

  // 发送消息
  public send(message: any): boolean {
    if (this.status === WebSocketStatus.CONNECTED && this.socket) {
      try {
        this.socket.send(typeof message === 'string' ? message : JSON.stringify(message));
        return true;
      } catch (error) {
        console.error('Error sending message:', error);
        return false;
      }
    }
    return false;
  }
}

// 创建单例实例
const webSocketService = new WebSocketService();

export default webSocketService; 