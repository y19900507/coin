# BitLuna 交易所后端

BitLuna 是一个基于微服务架构的加密货币交易所后端系统。

## 项目架构

项目采用微服务架构，由多个独立的服务组成，通过 Kafka 消息队列进行通信。

主要服务包括：

- API 网关 (api-gateway)
- 认证服务 (auth-service)
- 用户服务 (user-service)
- 市场数据服务 (market-service)
- 订单服务 (order-service)
- 撮合引擎 (matching-engine)
- 钱包服务 (wallet-service)
- 仓位服务 (position-service)
- 通知服务 (notification-service)
- 风险控制服务 (risk-service)
- 分析服务 (analytics-service)

## 技术栈

- **框架**：NestJS (TypeScript)
- **数据库**：MySQL
- **缓存**：Redis
- **消息队列**：Kafka
- **API 文档**：Swagger (OpenAPI 3.0)
- **包管理**：pnpm (工作空间模式)
- **容器化**：Docker & Docker Compose

## 本地开发

### 前置条件

- Node.js 16+
- pnpm 7+
- Docker & Docker Compose

### 安装依赖

```bash
pnpm install
```

### 启动基础设施服务

```bash
docker-compose up -d mysql redis zookeeper kafka
```

### 启动开发环境

```bash
pnpm dev
```

### API 文档

启动开发环境后，访问 http://localhost:3000/api/docs 可查看 Swagger API 文档。

## 生产环境部署

### 构建镜像

```bash
docker-compose build
```

### 启动服务

```bash
docker-compose up -d
```

## 项目结构

```
/
├── api-gateway/             # API 网关服务
├── auth-service/            # 认证服务
├── user-service/            # 用户服务
├── market-service/          # 市场数据服务
├── order-service/           # 订单服务
├── matching-engine/         # 撮合引擎
├── wallet-service/          # 钱包服务
├── position-service/        # 仓位服务
├── notification-service/    # 通知服务
├── risk-service/            # 风险控制服务
├── analytics-service/       # 分析服务
├── shared-lib/              # 共享库
├── infrastructure/          # 基础设施配置
├── scripts/                 # 项目脚本
├── .docker/                 # Docker 相关配置
├── .github/                 # GitHub 工作流配置
└── .husky/                  # Git hooks 配置
``` 