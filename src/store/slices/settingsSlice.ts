import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 设置主题类型
export type ThemeMode = 'light' | 'dark' | 'system';

// 设置语言类型
export type Language = 'zh_CN' | 'en_US';

// 图表风格
export type ChartStyle = 'candles' | 'heikinashi' | 'line' | 'area';

// 设置状态
interface SettingsState {
  themeMode: ThemeMode;
  language: Language;
  chartStyle: ChartStyle;
  showOrderbook: boolean;
  showTrades: boolean;
  notifications: {
    enabled: boolean;
    sound: boolean;
    orderFilled: boolean;
    priceAlert: boolean;
    systemMessages: boolean;
  };
  orderConfirmation: boolean;
  autoLogout: number; // 自动登出时间（分钟），0表示禁用
}

// 初始状态
const initialState: SettingsState = {
  themeMode: 'system',
  language: 'zh_CN',
  chartStyle: 'candles',
  showOrderbook: true,
  showTrades: true,
  notifications: {
    enabled: true,
    sound: true,
    orderFilled: true,
    priceAlert: true,
    systemMessages: true,
  },
  orderConfirmation: true,
  autoLogout: 30,
};

// 创建切片
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // 设置主题
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
    
    // 设置语言
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    
    // 设置图表风格
    setChartStyle: (state, action: PayloadAction<ChartStyle>) => {
      state.chartStyle = action.payload;
    },
    
    // 切换订单簿显示
    toggleOrderbook: (state) => {
      state.showOrderbook = !state.showOrderbook;
    },
    
    // 切换成交显示
    toggleTrades: (state) => {
      state.showTrades = !state.showTrades;
    },
    
    // 设置通知选项
    setNotifications: (state, action: PayloadAction<Partial<typeof state.notifications>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    
    // 设置订单确认
    setOrderConfirmation: (state, action: PayloadAction<boolean>) => {
      state.orderConfirmation = action.payload;
    },
    
    // 设置自动登出时间
    setAutoLogout: (state, action: PayloadAction<number>) => {
      state.autoLogout = action.payload;
    },
    
    // 重置所有设置到默认值
    resetSettings: () => initialState,
  },
});

// 导出actions
export const {
  setThemeMode,
  setLanguage,
  setChartStyle,
  toggleOrderbook,
  toggleTrades,
  setNotifications,
  setOrderConfirmation,
  setAutoLogout,
  resetSettings,
} = settingsSlice.actions;

// 导出reducer
export default settingsSlice.reducer; 