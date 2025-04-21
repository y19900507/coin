import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Symbol, Kline, Depth, Trade } from '../../store/slices/marketSlice';

// 模拟市场数据
const mockMarketData = [
  {
    symbol: 'BTCUSDT',
    priceChange: 1250.50,
    priceChangePercent: 3.25,
    weightedAvgPrice: 39750.42,
    prevClosePrice: 38500.30,
    lastPrice: 39750.80,
    lastQty: 0.05,
    bidPrice: 39749.50,
    askPrice: 39751.20,
    openPrice: 38500.30,
    highPrice: 40100.00,
    lowPrice: 38450.10,
    volume: 12500.35,
    quoteVolume: 498753210.25,
    openTime: Date.now() - 86400000,
    closeTime: Date.now(),
    count: 253789
  },
  {
    symbol: 'ETHUSDT',
    priceChange: 75.20,
    priceChangePercent: 2.80,
    weightedAvgPrice: 2750.30,
    prevClosePrice: 2680.10,
    lastPrice: 2755.30,
    lastQty: 0.35,
    bidPrice: 2755.00,
    askPrice: 2755.50,
    openPrice: 2680.10,
    highPrice: 2780.00,
    lowPrice: 2670.50,
    volume: 45678.25,
    quoteVolume: 125678950.50,
    openTime: Date.now() - 86400000,
    closeTime: Date.now(),
    count: 184567
  },
  {
    symbol: 'BNBUSDT',
    priceChange: 12.50,
    priceChangePercent: 3.10,
    weightedAvgPrice: 415.30,
    prevClosePrice: 403.80,
    lastPrice: 416.30,
    lastQty: 1.25,
    bidPrice: 416.20,
    askPrice: 416.40,
    openPrice: 403.80,
    highPrice: 420.10,
    lowPrice: 402.50,
    volume: 25430.80,
    quoteVolume: 10548796.35,
    openTime: Date.now() - 86400000,
    closeTime: Date.now(),
    count: 87654
  },
  {
    symbol: 'XRPUSDT',
    priceChange: -0.05,
    priceChangePercent: -2.50,
    weightedAvgPrice: 1.95,
    prevClosePrice: 2.00,
    lastPrice: 1.95,
    lastQty: 1200.50,
    bidPrice: 1.94,
    askPrice: 1.96,
    openPrice: 2.00,
    highPrice: 2.05,
    lowPrice: 1.92,
    volume: 34567890.50,
    quoteVolume: 67458910.25,
    openTime: Date.now() - 86400000,
    closeTime: Date.now(),
    count: 54321
  },
  {
    symbol: 'ADAUSDT',
    priceChange: -0.02,
    priceChangePercent: -1.85,
    weightedAvgPrice: 1.07,
    prevClosePrice: 1.08,
    lastPrice: 1.06,
    lastQty: 3500.75,
    bidPrice: 1.05,
    askPrice: 1.07,
    openPrice: 1.08,
    highPrice: 1.10,
    lowPrice: 1.04,
    volume: 45678901.25,
    quoteVolume: 48796245.80,
    openTime: Date.now() - 86400000,
    closeTime: Date.now(),
    count: 65432
  },
  {
    symbol: 'DOGEUSDT',
    priceChange: 0.008,
    priceChangePercent: 7.25,
    weightedAvgPrice: 0.118,
    prevClosePrice: 0.110,
    lastPrice: 0.118,
    lastQty: 25000.50,
    bidPrice: 0.117,
    askPrice: 0.119,
    openPrice: 0.110,
    highPrice: 0.120,
    lowPrice: 0.109,
    volume: 567890123.50,
    quoteVolume: 67012345.80,
    openTime: Date.now() - 86400000,
    closeTime: Date.now(),
    count: 43210
  }
];

// 市场API
export const marketApi = createApi({
  reducerPath: 'marketApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  }),
  endpoints: (builder) => ({
    // 获取所有交易对
    getSymbols: builder.query<Symbol[], void>({
      query: () => '/market/symbols',
      // 添加模拟数据
      transformResponse: () => {
        return mockMarketData.map(item => ({
          symbol: item.symbol,
          baseAsset: item.symbol.replace('USDT', ''),
          quoteAsset: 'USDT',
          pricePrecision: 2,
          quantityPrecision: 4,
          minOrderSize: 10,
          status: 'TRADING' as 'TRADING'
        }));
      }
    }),
    
    // 获取交易对信息
    getSymbol: builder.query<Symbol, string>({
      query: (symbol) => `/market/symbols/${symbol}`,
    }),
    
    // 获取K线数据
    getKlines: builder.query<Kline[], {symbol: string; interval: string; limit?: number}>({
      query: ({symbol, interval, limit = 500}) => 
        `/market/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`,
    }),
    
    // 获取深度数据
    getDepth: builder.query<Depth, {symbol: string; limit?: number}>({
      query: ({symbol, limit = 100}) => 
        `/market/depth?symbol=${symbol}&limit=${limit}`,
    }),
    
    // 获取最新成交
    getTrades: builder.query<Trade[], {symbol: string; limit?: number}>({
      query: ({symbol, limit = 50}) => 
        `/market/trades?symbol=${symbol}&limit=${limit}`,
    }),
    
    // 获取24小时行情统计
    get24hStats: builder.query<
      {
        symbol: string;
        priceChange: number;
        priceChangePercent: number;
        weightedAvgPrice: number;
        prevClosePrice: number;
        lastPrice: number;
        lastQty: number;
        bidPrice: number;
        askPrice: number;
        openPrice: number;
        highPrice: number;
        lowPrice: number;
        volume: number;
        quoteVolume: number;
        openTime: number;
        closeTime: number;
        count: number;
      }[],
      string | void
    >({
      query: (symbol) => symbol ? `/market/ticker/24hr?symbol=${symbol}` : '/market/ticker/24hr',
      // 添加模拟数据
      transformResponse: (_, meta, arg) => {
        if (arg && typeof arg === 'string') {
          return [mockMarketData.find(item => item.symbol === arg) || mockMarketData[0]];
        }
        return mockMarketData;
      }
    }),
    
    // 获取最新价格
    getLatestPrice: builder.query<{symbol: string; price: number}[], string | void>({
      query: (symbol) => symbol ? `/market/ticker/price?symbol=${symbol}` : '/market/ticker/price',
      // 添加模拟数据
      transformResponse: (_, meta, arg) => {
        if (arg && typeof arg === 'string') {
          const item = mockMarketData.find(item => item.symbol === arg);
          return item ? [{ symbol: item.symbol, price: item.lastPrice }] : [];
        }
        return mockMarketData.map(item => ({ symbol: item.symbol, price: item.lastPrice }));
      }
    }),
    
    // 获取最佳买卖价格
    getBookTicker: builder.query<
      {symbol: string; bidPrice: number; bidQty: number; askPrice: number; askQty: number}[],
      string | void
    >({
      query: (symbol) => symbol ? `/market/ticker/bookTicker?symbol=${symbol}` : '/market/ticker/bookTicker',
      // 添加模拟数据
      transformResponse: (_, meta, arg) => {
        if (arg && typeof arg === 'string') {
          const item = mockMarketData.find(item => item.symbol === arg);
          return item ? [{ 
            symbol: item.symbol, 
            bidPrice: item.bidPrice, 
            bidQty: 10, 
            askPrice: item.askPrice, 
            askQty: 10 
          }] : [];
        }
        return mockMarketData.map(item => ({ 
          symbol: item.symbol, 
          bidPrice: item.bidPrice, 
          bidQty: 10, 
          askPrice: item.askPrice, 
          askQty: 10 
        }));
      }
    }),
  }),
});

// 导出生成的hooks
export const {
  useGetSymbolsQuery,
  useGetSymbolQuery,
  useGetKlinesQuery,
  useGetDepthQuery,
  useGetTradesQuery,
  useGet24hStatsQuery,
  useGetLatestPriceQuery,
  useGetBookTickerQuery,
} = marketApi; 