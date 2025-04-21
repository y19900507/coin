import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 交易对类型
export interface Symbol {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  pricePrecision: number;
  quantityPrecision: number;
  minOrderSize: number;
  status: 'TRADING' | 'HALT' | 'BREAK';
}

// K线数据点
export interface Kline {
  time: number;
  open: number;
  high: number;
  close: number;
  low: number;
  volume: number;
}

// 行情深度
export interface Depth {
  bids: [number, number][]; // [价格, 数量]
  asks: [number, number][]; // [价格, 数量]
}

// 最新成交
export interface Trade {
  id: string;
  price: number;
  quantity: number;
  time: number;
  isBuyerMaker: boolean;
}

// 市场状态
interface MarketState {
  activeSymbol: string;
  symbols: Symbol[];
  klines: Record<string, Kline[]>; // 按交易对存储K线
  depths: Record<string, Depth>;   // 按交易对存储深度
  trades: Record<string, Trade[]>; // 按交易对存储成交
  lastPrices: Record<string, number>; // 最新价格
  favoriteSymbols: string[];      // 收藏的交易对
  timeframe: '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d' | '1w';
  loading: {
    symbols: boolean;
    klines: boolean;
    depth: boolean;
    trades: boolean;
  };
  error: string | null;
}

// 初始状态
const initialState: MarketState = {
  activeSymbol: 'BTCUSDT',
  symbols: [],
  klines: {},
  depths: {},
  trades: {},
  lastPrices: {},
  favoriteSymbols: [],
  timeframe: '15m',
  loading: {
    symbols: false,
    klines: false,
    depth: false,
    trades: false
  },
  error: null
};

// 创建切片
const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    // 设置活跃交易对
    setActiveSymbol: (state, action: PayloadAction<string>) => {
      state.activeSymbol = action.payload;
    },
    
    // 设置交易对列表
    setSymbols: (state, action: PayloadAction<Symbol[]>) => {
      state.symbols = action.payload;
      state.loading.symbols = false;
    },
    
    // 设置K线数据
    setKlines: (state, action: PayloadAction<{symbol: string, klines: Kline[]}>) => {
      const { symbol, klines } = action.payload;
      state.klines[symbol] = klines;
      state.loading.klines = false;
    },
    
    // 更新K线数据（添加新K线或更新最后一条）
    updateKline: (state, action: PayloadAction<{symbol: string, kline: Kline}>) => {
      const { symbol, kline } = action.payload;
      if (!state.klines[symbol]) {
        state.klines[symbol] = [];
      }
      
      const klines = state.klines[symbol];
      const lastKline = klines[klines.length - 1];
      
      // 如果时间戳相同，则更新最后一条K线，否则添加新K线
      if (lastKline && lastKline.time === kline.time) {
        klines[klines.length - 1] = kline;
      } else {
        klines.push(kline);
        // 保持K线数量适中，避免内存占用过大
        if (klines.length > 1000) {
          klines.shift();
        }
      }
    },
    
    // 设置深度数据
    setDepth: (state, action: PayloadAction<{symbol: string, depth: Depth}>) => {
      const { symbol, depth } = action.payload;
      state.depths[symbol] = depth;
      state.loading.depth = false;
    },
    
    // 设置成交数据
    setTrades: (state, action: PayloadAction<{symbol: string, trades: Trade[]}>) => {
      const { symbol, trades } = action.payload;
      state.trades[symbol] = trades;
      state.loading.trades = false;
    },
    
    // 添加新成交
    addTrade: (state, action: PayloadAction<{symbol: string, trade: Trade}>) => {
      const { symbol, trade } = action.payload;
      if (!state.trades[symbol]) {
        state.trades[symbol] = [];
      }
      
      state.trades[symbol].unshift(trade);
      // 保持成交列表不会过长
      if (state.trades[symbol].length > 100) {
        state.trades[symbol].pop();
      }
      
      // 更新最新价格
      state.lastPrices[symbol] = trade.price;
    },
    
    // 设置最新价格
    setLastPrice: (state, action: PayloadAction<{symbol: string, price: number}>) => {
      const { symbol, price } = action.payload;
      state.lastPrices[symbol] = price;
    },
    
    // 添加收藏交易对
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favoriteSymbols.includes(action.payload)) {
        state.favoriteSymbols.push(action.payload);
      }
    },
    
    // 移除收藏交易对
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteSymbols = state.favoriteSymbols.filter(s => s !== action.payload);
    },
    
    // 设置K线时间周期
    setTimeframe: (state, action: PayloadAction<MarketState['timeframe']>) => {
      state.timeframe = action.payload;
    },
    
    // 设置加载状态
    setLoading: (state, action: PayloadAction<{key: keyof MarketState['loading'], value: boolean}>) => {
      const { key, value } = action.payload;
      state.loading[key] = value;
    },
    
    // 设置错误
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

// 导出actions
export const {
  setActiveSymbol,
  setSymbols,
  setKlines,
  updateKline,
  setDepth,
  setTrades,
  addTrade,
  setLastPrice,
  addFavorite,
  removeFavorite,
  setTimeframe,
  setLoading,
  setError
} = marketSlice.actions;

// 导出reducer
export default marketSlice.reducer; 