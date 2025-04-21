# 交易平台前端项目

这是一个基于React、TypeScript和Redux构建的交易平台前端项目。

## 项目结构

```
frontend/                       # 项目根目录
├── public/                     # 静态资源目录
│   ├── index.html              # HTML入口文件
│   ├── favicon.ico             # 网站图标
│   └── ...                     # 其他静态资源
│
├── src/                        # 源代码目录
│   ├── api/                    # API请求相关
│   │   ├── axios.ts            # Axios实例和拦截器配置
│   │   ├── index.ts            # API导出入口
│   │   └── specialRequests.ts  # 特殊的非RTK Query请求
│   │
│   ├── app/                    # 应用核心
│   │   ├── hooks.ts            # Redux hooks
│   │   └── store.ts            # Redux store配置
│   │
│   ├── assets/                 # 静态资源
│   │   ├── images/             # 图片资源
│   │   ├── icons/              # 图标资源
│   │   └── fonts/              # 字体资源
│   │
│   ├── components/             # 可复用组件
│   │   ├── Button/             # 按钮组件
│   │   ├── Form/               # 表单组件
│   │   ├── Chart/              # 图表组件
│   │   ├── Table/              # 表格组件
│   │   ├── Modal/              # 模态框组件
│   │   ├── ErrorBoundary/      # 错误边界组件
│   │   └── ...                 # 其他通用组件
│   │
│   ├── config/                 # 配置文件
│   │   └── app.config.ts       # 应用全局配置
│   │
│   ├── features/               # 功能模块
│   │   ├── auth/               # 认证相关功能
│   │   ├── trading/            # 交易相关功能
│   │   ├── market/             # 市场行情功能
│   │   ├── wallet/             # 钱包相关功能
│   │   └── ...                 # 其他功能模块
│   │
│   ├── hooks/                  # 自定义钩子
│   │   ├── useDebounce.ts      # 防抖钩子
│   │   ├── useThrottle.ts      # 节流钩子
│   │   ├── useWebSocket.ts     # WebSocket钩子
│   │   └── ...                 # 其他通用钩子
│   │
│   ├── layouts/                # 布局组件
│   │   ├── MainLayout/         # 主布局
│   │   ├── DashboardLayout/    # 仪表盘布局
│   │   ├── AuthLayout/         # 认证页面布局
│   │   └── ...                 # 其他布局
│   │
│   ├── pages/                  # 页面组件
│   │   ├── Dashboard/          # 仪表盘页面
│   │   ├── Login/              # 登录页面
│   │   ├── Register/           # 注册页面
│   │   ├── Trade/              # 交易页面
│   │   ├── Market/             # 市场页面
│   │   ├── Wallet/             # 钱包页面
│   │   ├── Settings/           # 设置页面
│   │   └── ...                 # 其他页面
│   │
│   ├── router/                 # 路由配置
│   │   ├── index.tsx           # 主路由配置
│   │   ├── PrivateRoute.tsx    # 私有路由守卫
│   │   └── routes.ts           # 路由定义
│   │
│   ├── services/               # 服务相关
│   │   ├── rtk/                # RTK Query服务
│   │   │   ├── index.ts        # RTK服务导出入口
│   │   │   ├── authApi.ts      # 认证API服务
│   │   │   ├── marketApi.ts    # 市场API服务
│   │   │   ├── orderApi.ts     # 订单API服务
│   │   │   └── ...             # 其他API服务
│   │   │
│   │   └── websocket/          # WebSocket服务
│   │       ├── index.ts        # WebSocket服务入口
│   │       └── clients/        # 不同功能的WebSocket客户端
│   │
│   ├── store/                  # Redux存储
│   │   ├── index.ts            # Store导出入口
│   │   ├── rootReducer.ts      # 根Reducer
│   │   └── slices/             # Redux切片
│   │       ├── authSlice.ts    # 认证状态切片
│   │       ├── marketSlice.ts  # 市场状态切片
│   │       ├── settingsSlice.ts# 设置状态切片
│   │       └── ...             # 其他状态切片
│   │
│   ├── styles/                 # 全局样式
│   │   ├── GlobalStyles.ts     # 全局样式定义
│   │   ├── theme.ts            # 主题定义
│   │   ├── variables.ts        # 样式变量
│   │   └── mixins.ts           # 样式混合器
│   │
│   ├── types/                  # TypeScript类型定义
│   │   ├── index.ts            # 类型导出入口
│   │   ├── api.ts              # API相关类型
│   │   ├── auth.ts             # 认证相关类型
│   │   ├── market.ts           # 市场相关类型
│   │   ├── order.ts            # 订单相关类型
│   │   └── ...                 # 其他类型定义
│   │
│   ├── utils/                  # 工具函数
│   │   ├── index.ts            # 工具函数导出入口
│   │   ├── formatters.ts       # 格式化工具
│   │   ├── validators.ts       # 验证工具
│   │   ├── storage.ts          # 本地存储工具
│   │   └── ...                 # 其他工具函数
│   │
│   ├── App.tsx                 # 应用主组件
│   └── index.tsx               # 应用入口文件
│
├── .env                        # 环境变量
├── package.json                # 项目依赖与脚本
├── tsconfig.json               # TypeScript配置
└── README.md                   # 项目说明文档
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

### 构建生产版本

```bash
npm run build
```

### 运行测试

```bash
npm test
```

## 技术栈

- **React** - 用户界面库
- **TypeScript** - 静态类型检查
- **Redux Toolkit** - 状态管理
- **RTK Query** - API请求和缓存管理
- **React Router** - 路由管理
- **Styled Components** - CSS-in-JS样式解决方案
- **Axios** - HTTP客户端

## 最佳实践

- **状态管理原则**:
  - 遵循单一数据源原则，避免状态重复
  - 局部状态使用useState/useReducer，全局状态使用Redux
  - 使用useSelector的记忆化选择器减少不必要的重渲染

- **性能优化策略**:
  - 使用React.memo避免不必要的组件重渲染
  - 使用useCallback和useMemo缓存函数和计算结果
  - 实现虚拟滚动列表处理大数据集
  - 应用节流(throttle)和防抖(debounce)处理高频事件

- **组件设计准则**:
  - 保持组件职责单一，遵循单一职责原则
  - 组件props使用明确的TypeScript接口定义
  - 优先使用函数组件和Hooks而非类组件

- **API请求处理**:
  - 统一的错误处理机制
  - 请求状态管理(加载、成功、失败)
  - 缓存策略和数据重新验证
  - 取消重复请求或已过时的请求

## 许可证

MIT
